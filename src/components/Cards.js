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
          <h1>Useful playlists</h1>
          <ul className="cardsitems">
            <CardItem src='' text='Learn to play'  path="how-to-play"/>
            <CardItem src='' text='Openings'  path='/openings'/>
            <CardItem src='' text='Famous Games' path='/famous-games' />
            <CardItem src='' text='More strategy'  path='/LearnInfo/Lance'/>
          </ul>
          <p>We have no rights to the videos and playlists linked here, this is just recommended for useful information</p>
        </div>
      </div>
    </div>
  );
}

export default Cards;