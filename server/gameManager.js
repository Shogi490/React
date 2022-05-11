class Lobby {

	constructor(username, socket, game) {
		this.gameDocument = game;
		this.black = game.creatorIsBlack ? game.creatorID : game.opponentUsername;
		this.white = game.creatorIsBlack ? game.opponentUsername : game.creatorID;
		this.AddUser(username, socket);
	}

	// "public"
	AddUser(username, socket) {
		this.connections[username] = socket;
		this._setupUserEvents(username);
	}

	RemoveUser(username) {
		delete this.connections[username];
	}

	HasListeners() {
		return Object.keys(this.connections).length != 0;
	}

	// "private"
	_setupUserEvents(username) {
		let socket = this.connections[username];

		const OnDisconnect = () => {
			// server.js should be calling RemoveUser, but we'll just double check that here.
			if (this.connections[username] != undefined) {
				this.RemoveUser(username);
			}
		}
		socket.on("disconnect", OnDisconnect);

		// only listen to Move events if user is a player of the game.
		if (username == this.white || username == this.black) {
			const OnMove = (usiString, resultingSFEN) => {
				console.log(`"Move" was called by ${username}`);
				if (this._isUsersTurn(username)) {
					// check if they ran out of time
					if (this._userRanOutOfTime(username)) {
						// current user lost on time!
						const winner = username == this.white ? this.black : this.white;
						this._emitGameOver(winner, "Time Out");
					}
					// they didn't, so perform the move!
					this._performMove(usiString, resultingSFEN);
					this._emitMove(usiString);
				}
			}
			socket.on("Move", OnMove);
			// dunno if I HAVE to unsubscribe when disconnecting, but we're gonna anyway.
			socket.on("disconnect", () => {
				socket.off("Move", OnMove);
			})
		}
	}

	_userRanOutOfTime(username) {
		// check if their Time has been reduced to 0.
		// assumes that the given user is authorized to move and it was their turn.
		let WasTimedOut = false;
		const turnDuration = this.gameDocument.dateSinceLastCorrespondence - Date.now();
		let timeLeft = this.gameDocument.creatorID == username ? this.gameDocument.creatorTimeLeft : this.gameDocument.opponentTimeLeft;
		timeLeft -= turnDuration;

		if (this.gameDocument.timeControl == "Real Time") {
			// Real Time game!
			if (timeLeft > 0) {
				// user did not run out of time
				WasTimedOut = false;
			} else {
				// user has utilized all of their alloted time!
				// byoyomi activates!
				timeLeft += this.gameDocument.byoyomiInSeconds * 1000;
				if (timeLeft <= 0) {
					// user ran out of time even with byoyomi
					WasTimedOut = true;
					timeLeft = 0;
				} else {
					// user did not run out of time becuase of byoyomi
					WasTimedOut = false;
					timeLeft = 0;
				}
			}
		} else {
			// Correspondence game!
			// Correspondence games do not use byoyomi.
			WasTimedOut = timeLeft <= 0;
			timeLeft = this.gameDocument.daysPerTurn * 86400 * 1000;
		}

		if (this.gameDocument.creatorID == username) {
			this.gameDocument.creatorTimeLeft = timeLeft;
		} else {
			this.gameDocument.opponentTimeLeft = timeLeft;
		}
		this.gameDocument.save();

		return WasTimedOut;
	}

	_isUsersTurn(username) {
		if (username == this.black) { // player is black (started first)
			return moveHistory.length % 2 == 0;
		} else if (username == this.white) { // player is white (started second)
			return moveHistory.length % 2 == 0;
		} else {
			return false;
		}
	}

	_performMove(usiString, SFEN) {
		this.game.moveHistory.push(usiString);
		this.game.currentSFEN = SFEN;
		this.game.save();
	}

	_emitMove(usiString) {
		Object.values.forEach((socket) => {
			socket.emit("Moved", this.game);
		});
	}

	_emitGameOver(winnerID, reason = "CheckMate!") {
		this.game.winnerID = winnerID;
		this.game.save();
		Object.values().forEach((socket) => {
			socket.emit("GameOver", reason);
		});
	}
}

module.exports = Lobby;