class Lobby {

	constructor(username, socket, game) {
		this.game = game;
		this.connections[username] = socket;
		this.setupUserEvents(username);
	}

	addUser(username, socket) {
		this.connections[username] = socket;
		this.setupUserEvents(username);
	}

	setupUserEvents(username) {
		let socket = this.participants[username];
		socket.on("disconnect", this._onDisconnect);
		socket.on("OnMove", this._onMove);
	}

	_onDisconnect() {
		// potentially unsubscribe from events?
		console.log(`Websocket connection to User ${user.username} has been disconnected!`);
		// remove participant from participants
		delete participants[user.username];
	}

	_onMove(moveInfo) {

	}

	_userIsParticipant(username) {
		// is creator

	}
}

const uuidv4 = require('uuid').v4;


const messages = new Set();
const users = new Map();

const defaultUser = {
	id: 'anon',
	name: 'Anonymous',
};

const messageExpirationTimeMS = 5 * 60 * 1000;

class Connection {
	constructor(io, socket, game, user) {
		this.socket = socket;
		this.io = io;
		this.game = game;
		this.user = user;

		socket.on("move", (info) => this.onMove(info));
		// socket.on('getMessages', () => this.getMessages());
		// socket.on('message', (value) => this.handleMessage(value));
		socket.on('disconnect', () => this.disconnect());
		socket.on('connect_error', (err) => {
			console.log(`connect_error due to ${err.message}`);
		});
	}

	sendMessage(message) {
		this.io.sockets.emit('message', message);
	}

	getMessages() {
		messages.forEach((message) => this.sendMessage(message));
	}

	handleMessage(value) {
		const message = {
			id: uuidv4(),
			user: users.get(this.socket) || defaultUser,
			value,
			time: Date.now()
		};

		messages.add(message);
		this.sendMessage(message);

		setTimeout(
			() => {
				messages.delete(message);
				this.io.sockets.emit('deleteMessage', message.id);
			},
			messageExpirationTimeMS,
		);
	}

	disconnect() {
		users.delete(this.socket);
	}
}

function chat(io) {
	io.on('connection', (socket) => {
		new Connection(io, socket);
	});
};

module.exports = Lobby;