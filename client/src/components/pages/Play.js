import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import GameOptions from '../GameOptions';

function Play() {
  //on /play show game settings, send settings to server/store in db/redirect to page with game id
  return (
    <div className="board-background">
      <GameOptions></GameOptions>
    </div>
  )

}
export default Play;