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
            <CardItem src='Images/king.png' text='The king' path='/LearnInfo/King'/>
            <CardItem src='Images/goldgeneral.png'text='The Gold General'  path='/LearnInfo/GGeneral'/>
            <CardItem src="Images/silvergeneral.png" text="The Silver General"   path='/LearnInfo/SGeneral'></CardItem>
            <CardItem src="Images/knight.png" text="The Knight"  path='/LearnInfo/Knight'></CardItem>
          </ul>
          <ul className='cardsitems'>
            <CardItem src='Images/lance.png' text='The Lance'  path='/LearnInfo/Lance'/>
            <CardItem src='Images/bishop.png' text='The Bishop'   path='/LearnInfo/Bishop'/>
            <CardItem src='Images/rook.png' text='The Rook'  path='/LearnInfo/Rook'/>
            <CardItem src='Images/pawn.png' text='The Pawn'  path='/LearnInfo/Pawn'/>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;