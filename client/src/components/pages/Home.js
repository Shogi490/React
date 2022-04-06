import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Home.css'

//home page
function Home() {
  const history = useNavigate();
  return (
  
    <div className="section">
        <h1> Shogi </h1>
        <div className = "video-container">
          <div className = "color-overlay"> 
        </div>
        <iframe title="Background-video" width="1920" height="1080" src="https://www.youtube-nocookie.com/embed/ga_ivdZ7es0?controls=0&mute=1&start=1&autoplay=1&loop=1&playlist=ga_ivdZ7es0" frameborder="0" allow="autoplay;"></iframe>
        </div>

          <button className="home--button" onClick={() => {history('Play')}}>Play Shogi</button>
          <button className="home--button" onClick={() => {history('Learn')}}>Learn Shogi</button>
          <button className="home--button" onClick={() => {history('sign-up')}}>Sign up</button>

      </div>
  );
}

export default Home;