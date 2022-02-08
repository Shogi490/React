import React from 'react'
import { Navigate, useParams } from 'react-router';
import learnpages from "./learnpages.json"
import "./LearnInfo.css"
import Board from '../Board';

var piecesInfo = learnpages; 

const LearnInfo = ( ) => {
    const { piece } = useParams();
    if(piecesInfo[piece] === undefined) {
        return (
        <Navigate to="/404"></Navigate>
        );
    }
    return (
        <>
        <div className="fullPage">
            <div className="left-hand">
                <h1>{piecesInfo[piece].title}</h1>
                <h3 className="text-separator">Moveset</h3>
                <p className="text-section">{piecesInfo[piece].desc}</p>
                <h3 className="text-separator">Promotion</h3>
                <p className="text-section">{piecesInfo[piece].promotion}</p>
            </div>
            <Board></Board>
            </div>

        </>
    );
}


export default LearnInfo;