import React from 'react'
import Board from '../Board';
import { useNavigate } from 'react-router-dom'
//import unity-react?

function Play () {
    return (
      <div className = "board-background">
        <>
            <Board></Board>
        </>
            <button className="play--button" >Play With Friend</button>
            <button className="play--button" > Ranked Match</button>
            <button className="play--button" > Casual Match</button>
      </div>
    )
    
}
export default Play;