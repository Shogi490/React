import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Home.css'

//home page
function Home() {
  const history = useNavigate();
  return (
  
	<>
		<h1> Welcome to Shogi Online </h1>
    <div className="landing-container">
      <div className="block--display">
      <button className="home--button" onClick={() => {history('Play')}}>Play Shogi</button>
      <button className="home--button" onClick={() => {history('Learn')}}>Learn Shogi</button>
      <button className="home--button" onClick={() => {history('sign-up')}}>Sign up</button>
      </div>
    </div>

   </>
  );
}

export default Home;