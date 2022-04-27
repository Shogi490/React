import React from 'react'
import Board from '../Board';
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import GameOptions from '../GameOptions';

function Play () {
  //on /play show game settings, send settings to server/store in db/redirect to page with game id
    return (
      <div className = "board-background">
            <Board></Board>
            <GameOptions></GameOptions>
            <button className="play--button">Play With Friend</button>
            <button className="play--button"> Ranked Match</button>
            <button className="play--button"> Casual Match</button>
      </div>
    )
    
}
export default Play;