import React, { useState, useEffect } from 'react'
import "./Board.css"
import Unity, { UnityContext } from "react-unity-webgl";
import { makeSfen } from "shogiops/sfen";
import { parseUsi } from 'shogiops/util';
import { Shogi } from 'shogiops/shogi';

const unityContext = new UnityContext({
    loaderUrl: "build/Build/build.loader.js",
    dataUrl: "build/Build/build.data",
    frameworkUrl: "build/Build/build.framework.js",
    codeUrl: "build/Build/build.wasm",
});

function Board({ gameInitSettings }) {

    const [progression, setProgression] = useState(0);
    const [game, setGame] = useState(Shogi.default());
    // const [moves, setMoves] = useState(game.moveHistory);

    useEffect(function () {
        // if game has a different starting sfen/moveset. This is where we would overwrite game.
        const move = parseUsi('7g7f');
        game.play(move);
        console.log(makeSfen(game.toSetup()));
    }, [])

    useEffect(function () {
        // the board component can only exist if a game is currently ongoing.
        // we should expect some kind of gameID and find the movehistory of that game.
        // mayhaps whomever is creating the board should send that to us.
    })

    useEffect(function () {
        unityContext.on("progress", function (progression) {
            // even if progression is 100%, this does NOT mean we're done initializing. We still need to send Unity some initilization values.
            setProgression(progression);
        });
        unityContext.on("Move", function (usiMove) {
            // const move = parseUsi(usiMove);
            // game.play(move);
            // sendMoveToEnemy?
        })
    }, []);

    useEffect(function () {
        unityContext.on("loaded", function () {
            // before this, hide Unity or show some kind of loading thing.
            console.log("Unity has finished loading!");
            // Initialize Unity.
            // display Unity.
        });
    }, []);

    return (
        <>
            <div className="gameWrapper">
                <div className="shogiBoard">
                    <Unity
                        unityContext={unityContext}
                        style={{
                            width: "100%"
                        }}
                    />
                </div>
                <div className="moveTracker"></div>
            </div>
        </>
    )
}

export default Board;