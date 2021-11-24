import React from 'react'
import "./Board.css"

function Board() {
    return (
        <>
        <div className="gameWrapper">
            <div className="shogiBoard"></div>
            <div className="moveTracker"></div>
        </div>
        </>
    )
}

export default Board;