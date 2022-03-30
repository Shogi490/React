import React from "react";
import { useParams} from "react-router";

function UserProfile( {username} ) {
    let { id } = useParams();
    id = decodeURI(id);
    //check if current user's logged in as decoded URI, then show edit profile options
    return (
        <>
            <h1>{id}'s Profile</h1>
        </>
    )
}

export default UserProfile;