import React from "react";
import { useParams} from "react-router";

function UserProfile() {
    const { id } = useParams();
    //compare id to FindById in database 
    return (
        <>

        </>
    )
}

export default UserProfile;