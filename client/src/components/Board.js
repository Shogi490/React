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

function Board({ gameInitSettings }) {
    console.log("meow");

    const [isLoaded, setIsLoaded] = useState(false);
    const [game, setGame] = useState(Shogi.default());
    // const [moves, setMoves] = useState(game.moveHistory);

    // Obtain game info? Rush was supposed to help w/ this.
    useEffect(function () {
        // setGameRecord(gameRecord); or some shit
        // the board component can only exist if a game is currently ongoing.
        // we should expect some kind of gameID and find the movehistory of that game.
        // mayhaps whomever is creating the board should send that to us.
    }, [])

    // Unity Event Responses
    useEffect(function () {
        // When Unity finishes loading. Initialize Shogiops.
        unityContext.on("loaded", function () {
            // before this, hide Unity or show some kind of loading thing.
            console.log("Unity has finished loading!");
            // Initialize Unity.
            // setGame(Shogi.default);
            // for(let move of dbGameRecord.moves){
            //     game.move(parseUsi(move));
            // }
            // display Unity.
            setIsLoaded(true);
        });
        // When player clicked on their piece and wants to know where it can move
        unityContext.on("WantsToMove", function (square) {
            let arr = SquareSetToArray(game.dests(square));
            DisplayArray(arr);
            unityContext.send("GameController", "HighlightMoves", arr);
        });
        // When player clicked on a valid destination for the piece they wanted to MOVE
        unityContext.on("Move", function (usiMove) {
            const move = parseUsi(usiMove);
            game.play(move);
            // sendMoveToEnemy?
        });
        // When player clicked in a valid destination for a piece they wanted to DROP
        unityContext.on("Drop", function (usiMove) {
            const move = parseUsi(usiMove);
            game.play(move);
            // sendMoveToEnemy?
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