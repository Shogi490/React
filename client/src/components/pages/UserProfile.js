import React, { useState ,useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {IconButton, ListItem } from '@mui/material';
import { textAlign } from "@mui/system";

const axios = require("axios");



function UserProfile() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [isPerson, setIsPerson] = useState(false);
    const [gameHistory, setGameHistory] = useState();
    useEffect(() => {
        axios.get("http://localhost:5000/user/" + encodeURI(id), {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((res)=> {
            console.log(res.data.isPerson);    
            setIsPerson(res.data.isPerson);
        }).catch((error) => {
            console.log(error);
        })
    }, [id])
    useEffect(() => {
       axios.get("http://localhost:5000/game/history/" + encodeURI(id))
       .then((res) => {
            console.log(res.data);
            res.data.dateSinceLastCorrespondence = new Date(res.data.dateSinceLastCorrespondence);
            setGameHistory(res.data);
       }).catch((error) => {
           console.log(error);
       });
    }, [id])
    function handleClick(itemid) {
        navigate('/game/'+ itemid);
    }
    //check if current user's logged in as decoded URI, then show edit profile options
    return (
        <>
            <h1>{id}'s Game History</h1>
            <div className="game-history">
                {(gameHistory === undefined) ? <h2>No games found</h2> : gameHistory.map(item => {
                    return <List sx={{width: "100%", maxWidth: 1450, margin: "auto", textAlign: "center"}}>
                        <ListItem sx={{textAlign: "center"}}>
                            {(item.isComputerGame) ? <ListItemText key={item.isComputerGame}>Versus: AI</ListItemText> : <ListItemText>Versus: Player</ListItemText>}
                            <ListItemText>Date Created: {new Date(item.timeMade).toDateString()}</ListItemText>
                            <ListItemText >Last Move: {new Date(item.dateSinceLastCorrespondence).toDateString()}</ListItemText>
                            {(item.winnerID === undefined || item.winningReason === undefined) ? <ListItemText>Active</ListItemText> : <ListItemText>Completed</ListItemText>}
                            <IconButton onClick={handleClick.bind(this, item._id)}> 
                                <ArrowCircleRightIcon></ArrowCircleRightIcon>
                            </IconButton>
                        </ListItem>
                    </List>
                })}
            </div>
        </>
    )
}

export default UserProfile;