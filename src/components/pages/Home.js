import React from 'react';
import { useHistory } from 'react-router-dom'
import './Home.css'

//home page
function Home() {
  const history = useHistory();
  return (
  
	<>
		<h1> Welcome to Shogi Online </h1>
    <div className="landing-container">
      <div className="block--display">
      <button className="home--button" onClick={() => {history.push('Play')}}>Play Shogi</button>
      <button className="home--button" onClick={() => {history.push('Learn')}}>Learn Shogi</button>
      <button className="home--button" onClick={() => {history.push('sign-up')}}>Sign up</button>
      </div>
    </div>

   </>
  );
}

export default Home;