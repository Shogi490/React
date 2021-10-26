import React from 'react';
import './Cards.css';
import CardItem from './CardObjs';

function Cards() {
  return (
    <div className='cards'>
      <h1>LearnShogi Resources</h1>
      <div className='cardscontainer'>
        <div className='cardswrapper'>
          <ul className='cardsitems'>
            <CardItem src='Images/king.png' text='The king: The most important piece' label ="placeholderimg" path='/'/>
            <CardItem src='Images/goldgeneral.png'text='The Gold General: Moves in any direction except diagonally back' label ="placeholderimg" path='/'/>
            <CardItem src="Images/silvergeneral.png" text="The Silver General: Moves either forward or diagonally back" label ="placeholderimg"  path="/"></CardItem>
            <CardItem src="Images/knight.png" text="The Knight: Moves in an L shape, but only forward" label ="placeholderimg"  path="/"></CardItem>
          </ul>
          <ul className='cardsitems'>
            <CardItem src='Images/lance.png' text='The Lance: Moves forward' label ="placeholderimg"  path='/'/>
            <CardItem src='Images/bishop.png' text='The Bishop: Moves Diagonally' label ="placeholderimg"  path='/'/>
            <CardItem src='Images/rook.png' text='The Rook: Moves in straight lines' label ="placeholderimg" path='/'/>
            <CardItem src='Images/pawn.png' text='The Pawn: Moves a single space forward' label ="placeholderimg" path='/'/>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;