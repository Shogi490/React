import React, { useState ,useEffect } from "react";
import { useParams } from "react-router";
const axios = require("axios");

function UserProfile() {
    let { id } = useParams();
    const [isPerson, setIsPerson] = useState(false);
    const [Skin, setSkin] = useState("skin-selector");
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
            <form>
                <label className="skin-selector">
                    Skin Options
                    <select value={Skin} onChange={(e)=>setSkin(e.target.value)}>
                        <option value="chess">chess</option>
                        <option value="navy">navy</option>
                        <option value="fantasy">fantasy</option>
                        <option value="shogi">shogi</option>
                    </select>
                </label>

                if(document.getElementByValue('chess').selected) {Skin = "chess"}
                if(document.getElementByValue('navy').selected) {Skin = "navy"}
                if(document.getElementByValue('fantasy').selected) {Skin = "fantasy"}
                if(document.getElementByValue('shogi').selected) {Skin = "shogi"}
                

                localStorage.setItem("Skin", SKINVARIABLE);
                
                  
            </form>
                    
                
         
            

        </>
    )
}

export default UserProfile;