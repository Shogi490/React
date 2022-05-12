import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import Board from '../Board';
const axios = require("axios");

//grab params for game id, check if user is verified and if they are a part of the game stored in db
function GamePage(props) {
    let { id } = useParams();
    const [gameData, setGameData] = useState();

    useEffect(() => {
        axios.get("http://localhost:5000/game/" + encodeURI(id)).then((res) => {
            console.log(`/game/id came back with:`);
            console.log(res.data);
            setGameData(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [id])

    console.log("entered Game Page!");
    console.log(`Given ID is ${id}`);
    return (
        <>
            <Board gameInitSettings={gameData}></Board>
        </>
    )
}



export default GamePage;