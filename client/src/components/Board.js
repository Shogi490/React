import React from 'react'
import "./Board.css"
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
    loaderUrl: "build/Build/build.loader.js",
    dataUrl: "build/Build/build.data",
    frameworkUrl: "build/Build/build.framework.js",
    codeUrl: "build/Build/build.wasm",
});

function Board() {
    return (
        <>
        <div className="gameWrapper">
            <div className="shogiBoard">
                <Unity unityContext={unityContext} />
            </div>
            <div className="moveTracker"></div>
        </div>
        </>
    )
}

export default Board;