import React, { useEffect, useState } from 'react'
import './GameOptions.css';
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
const axios = require("axios");


function GameOptions({callOnFinish}) {
  const [isPvP, setisPvP] = useState(false);
  const [timeControl, setTimeControl] = useState("Real Time");
  const [minutesPerSide, setMinutesPerSide] = useState(5);
  const [byoyomiInSeconds, setByoyomiInSeconds] = useState(10);
  const [daysPerTurn, setDaysPerTurn] = useState(2);
  const [cpuStrength, setCpuStrenth] = useState(1);
  const [startingSide, setStartingSide] = useState("Random");
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault(); // dunno what this does
    // store game options as a new game in the game db.
    // if the game is a PvP game we have to wait until both players are ready before doing the above.
    // otherwise it's a CPU game, in which case it's OK to throw the game into the db and start.
    // for now the second options is always the case.
    let username;
    const token = (localStorage.getItem('token'));
    if(token) {
      const decoded = jwt_decode(token);
      username = decoded.username;
    } else {
      username = localStorage.getItem('anonID');
    }
    if(timeControl === "Real Time" && minutesPerSide === 0 && byoyomiInSeconds === 0){
      alert("Invalid Time Control!");
      return;
    }
    setisPvP(false);
    // send to db
    let isStartingBlack = (startingSide === "Black");
    if(startingSide === "Random"){
      isStartingBlack = Math.random() < 0.5 ? true : false;
    }
    let gameOptions = {
      isComputerGame : true,
      creatorID : username,
      creatorIsBlack : isStartingBlack,
      moveHistory : [],
      currentSFEN : "lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1",
      timeMade : Date.now(),
      timeControl : timeControl,
      minutesPerSide : minutesPerSide,
      byoyomiInSeconds : byoyomiInSeconds,
      daysPerTurn : daysPerTurn,
      dateSinceLastCorrespondence : Date.now(),
      creatorTimeLeft : timeControl === "Real Time" ? minutesPerSide * 60 + byoyomiInSeconds : daysPerTurn * 86400,
      opponentTimeLeft : timeControl === "Real Time" ? minutesPerSide * 60 + byoyomiInSeconds : daysPerTurn * 86400,
    }
    axios.post("http://localhost:5000/create/game", gameOptions).then((res) => {
      navigate("/game/" + res.data._id);
      console.log(res);
    })
  }

  return (
    <div className="game-options-overlay">
      <div className="game-options-wrapper" onClick={()=>{}}>
        <h1>Setup Game</h1>
        <form className="game-options-form" onSubmit = {handleSubmit}>
          <label className = "selector">
            Against
          <select value={isPvP} onChange={setisPvP}>
            <option value="true">Players</option>
            <option value="false">Computer</option>
          </select>
          </label>
          <div className = "time-control">
            <div className="game-option">
              <label className="option-selector">
                Time control
                <select value={timeControl} onChange={(e)=>setTimeControl(e.target.value)}>
                  <option value="Real Time">Real Time</option>
                  <option value="Correspondence">Correspondence</option>
                </select>
              </label>
            </div>
            {timeControl === "Real Time" && 
              <div className="game-option">
                <label className="range-selector>">
                  Minutes per side: {minutesPerSide} <br/>
                  <input type="range" min="1" max="180" value={minutesPerSide} onChange={(e)=>setMinutesPerSide(e.target.value)}/>
                </label>
              </div>
            }
            {timeControl === "Real Time" && 
              <div className="game-option">
                <label className="range-selector>">
                  Byoyomi In Seconds: {byoyomiInSeconds} <br/>
                  <input type="range" min="1" max="180" value={byoyomiInSeconds} onChange={(e)=>setByoyomiInSeconds(e.target.value)}/>
                </label>
              </div>
            }
            {timeControl === "Correspondence" && 
              <div className="game-option">
                <label className="range-selector>">
                  Days per turn: {daysPerTurn}
                  <input type="range" min="1" max="14" value={daysPerTurn} onChange={(e)=>setDaysPerTurn(e.target.value)}/>
                </label>
              </div>
            }
          </div>
          {isPvP === false && 
            <div className="game-option">
              <label className="range-selector>">
                Strength: {cpuStrength} <br/>
                <input type="range" min="1" max="8" value={cpuStrength} onChange={(e)=>setCpuStrenth(e.target.value)}/>
              </label>
            </div>
          }
          <label className="option-selector">
            Starting Side
            <select value={startingSide} onChange={(e)=>setStartingSide(e.target.value)}>
              <option value="Black">Black</option>
              <option value="Random">Random</option>
              <option value="White">White</option>
            </select>
          </label>
          <button className="submit-button" type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}
export default GameOptions;