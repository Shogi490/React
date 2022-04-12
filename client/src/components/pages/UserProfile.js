import React, { useState ,useEffect } from "react";
import { useParams } from "react-router";
const axios = require("axios");

function UserProfile() {
    let { id } = useParams();
    const [isPerson, setIsPerson] = useState(false);
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
    //check if current user's logged in as decoded URI, then show edit profile options
    return (
        <>
            <h1>{id}'s Profile</h1>
            <h2>You are {(isPerson === true) ? id : "not " + id}</h2>
        </>
    )
}

export default UserProfile;