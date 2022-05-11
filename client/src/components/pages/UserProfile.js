import React, { useState ,useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {IconButton, ListItem } from '@mui/material';

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
            setGameHistory(res.data);
       }).catch((error) => {
           console.log(error);
       });
    }, [id])
    //check if current user's logged in as decoded URI, then show edit profile options
    return (
        <>
            <h1>{id}'s Profile</h1>
            <h2>You are {(isPerson === true) ? id : "not " + id}</h2>
            <div className="game-history">
                {(gameHistory === undefined) ? <h2>No games found</h2> : gameHistory.map(item => {
                    return <List sx={{width: "100%", maxWidth: 355}} justify = "center">
                        <ListItem>
                            <ListItemText sx={{textAlign: "center"}} key={item.id}>{item._id}</ListItemText>
                            <ListItemButton sx={{maxWidth: 50}}> 
                                <ListItemIcon>
                                    <ArrowCircleRightIcon></ArrowCircleRightIcon>
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    </List>
                })}
            </div>
        </>
    )
}

export default UserProfile;