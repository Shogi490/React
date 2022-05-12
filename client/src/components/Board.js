import React, { useState, useEffect } from 'react'
import "./Board.css"
import Unity, { UnityContext } from "react-unity-webgl";
import Attacks from "shogiops/attacks"
import { makeSfen } from "shogiops/sfen";
import { parseUsi } from 'shogiops/util';
import { Shogi } from 'shogiops/shogi';

const unityContext = new UnityContext({
    loaderUrl: "/build/Build/build.loader.js",
    dataUrl: "/build/Build/build.data",
    frameworkUrl: "/build/Build/build.framework.js",
    codeUrl: "/build/Build/build.wasm",
});

function Board({ gameInitSettings, socket }) {
    const [dbRecord, setDbRecord] = useState(gameInitSettings ? gameInitSettings : undefined);
    const [moves, setMoves] = useState(gameInitSettings ? gameInitSettings.moveHistory : []);
    const [isLoaded, setIsLoaded] = useState(false);
    const [game, setGame] = useState(Shogi.default());

    // Websocket Event Responses
    useEffect(() => {
        // const eventListener = (message) => {};
        const onConnection = (socket) => {
            console.log("websocket has successfully connected!");
        }
        const onMoved = (gameDocument) => {
            setDbRecord(gameDocument);
            setMoves(gameDocument.moveHistory);
            const usiString = gameDocument.moveHistory[gameDocument.moveHistory.length - 1];
            // server has made sure that the right player performed this move on their turn.
            game.play(usiString);

        }
        const onGameOver = (socket) => {

        }
        // onProposeDraw
        // onProposeExtraTime
        // onProposeTakeback

        // socket.on('eventName', eventListener);
        socket.on("connection", onConnection);
        socket.on("Moved", onMoved);
        socket.on("GameOver", onGameOver);

        return () => {
            // socket.off('eventName', eventListener);
            socket.off("connection", onConnection)
            socket.off("Moved", onMoved);
            socket.off("GameOver", onGameOver);
        }
    }, [socket])

    // Unity Event Responses
    useEffect(function () {
        // When Unity finishes loading. Initialize Unity.
        unityContext.on("loaded", function () {
            console.log("Unity has finished loading!");
            for (let move in moves) {
                game.play(move);
            }
            console.log(`attempting to set player`);
            unityContext.send("GameController", "SetPlayerIsWhite", !dbRecord.creatorIsBlack);
            console.log(`attempting to set board`);
            console.log(`sending ${makeSfen(game.toSetup())}`);
            unityContext.send("GameController", "boardFromSfen", makeSfen(game.toSetup()));
            setIsLoaded(true); // shows Unity.
        });
        // When player clicked on their piece and wants to know where it can move
        unityContext.on("WantsToMove", function (square) {
            console.log(`RECEIVED "WantsToMove" FROM UNITY: ${square}`);
            let arr = SquareSetToArray(game.dests(square + 0));
            DisplayArray(arr);
            // socket.emit('test', "test");
            arr.forEach((square) => {
                unityContext.send("GameController", "HighlightMove", square);
            })
            // unityContext.send("GameController", "HighlightMoves", arr);
        });
        // When player clicked on a valid destination for the piece they wanted to MOVE
        unityContext.on("Move", function (usiMove) {
            console.log(`RECIEVED "Move" FROM UNITY: ${usiMove}`);
            const move = parseUsi(usiMove);
            if (game.isLegal(move)) {
                // game.play(move);
                socket.emit("Move", usiMove, makeSfen(game.toSetup()));
            } else {
                alert("You have played an illegal move!");
            }

        });
        // When player clicked on their piece and wants to know where it can move
        unityContext.on("WantsToDrop", function (pieceName) {
            console.log(`RECEIVED "WantsToDrop" FROM UNITY: ${pieceName}`);
            let arr = SquareSetToArray(game.dropDests(pieceName));
            DisplayArray(arr);
            // socket.emit('test', "test");
            arr.forEach((square) => {
                unityContext.send("GameController", "HighlightDrop", square);
            });
        });
        // When player clicked in a valid destination for a piece they wanted to DROP
        unityContext.on("Drop", function (usiMove) {
            const move = parseUsi(usiMove);
            if (game.isLegal(move)) {
                // game.play(move);
                socket.emit("Move", usiMove, makeSfen(game.toSetup()));
            } else {
                alert("You have played an illegal move!");
            }
        });
    }, []);

    function HighlightDropDests(roleName) {
        let arr = SquareSetToArray(game.dropDests(roleName));
        DisplayArray(arr);
        unityContext.send("GameController", "HighlightDrops", arr);
    }

    return (
        <>
            <div className="gameWrapper">
                <div className="shogiBoard" style={{ visibility: isLoaded ? "visible" : "hidden" }}>
                    <Unity
                        unityContext={unityContext}
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    />
                </div>
                <div className="moveTracker"></div>
            </div>
        </>
    )

    function SquareSetToArray(squareSet) {
        let arr = new Array();
        let i = 0;
        for (let square of squareSet) {
            arr[i] = square;
            i++;
        }
        return arr;
    }

    function DisplayArray(arr) {
        for (let victim of arr) {
            console.log(victim);
        }
    }
}

export default Board;