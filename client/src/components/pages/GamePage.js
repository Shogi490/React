import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import Board from '../Board';
import { io } from 'socket.io-client';
const axios = require("axios");

//grab params for game id, check if user is verified and if they are a part of the game stored in db
function GamePage(props) {
    let { id } = useParams();
    const [gameData, setGameData] = useState();
    const [socket, setSocket] = useState(io(null));

    // Websocket Setup
    useEffect(() => {
        // setup Websocket
        console.log("TRYING TO SET UP WEBSOCKET");
        const newSocket = io(`http://${window.location.hostname}:5000`);
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    // Retrieve game record for the given ID
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
            {socket ? (
                <Board gameInitSettings={gameData} socket={socket}></Board>
            ) : (
                <div> Not Connected </div>
            )}
        </>
    )
}



export default GamePage;