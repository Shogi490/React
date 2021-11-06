import React from 'react';
import { Link } from 'react-router-dom';

function CardObjs(props) {
  return (
    <>
      <li className='cardsitem'>
        <Link className='cardsitemlink' to={props.path}>
          <figure className='cardsitempic-wrap'>
            <img className='cardsitemimg' alt='Yes' src={props.src}/>
          </figure>
          <div className='cardsiteminfo'>
            <h5 className='cardsitemtext'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardObjs;