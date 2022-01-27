import React from 'react'
import { Redirect } from 'react-router';
import learnpages from "./learnpages.json"
import "./LearnInfo.css"
import Board from '../Board';


var piecesInfo = learnpages; 

const LearnInfo = ({match: {params: {piece} } } ) => {
    const currentPiece = piece;
    if(piecesInfo[currentPiece] === undefined) {
        return (
        <Redirect to="/404"></Redirect>
        );
    }
    return (
        <>
        <div className="fullPage">
            <div className="left-hand">
                <h1>{piecesInfo[currentPiece].title}</h1>
                <h3 className="text-separator">Moveset</h3>
                <p className="text-section">{piecesInfo[currentPiece].desc}</p>
                <h3 className="text-separator">Promotion</h3>
                <p className="text-section">{piecesInfo[currentPiece].promotion}</p>
            </div>
            <Board></Board>
            </div>

        </>
    );
}


export default LearnInfo;