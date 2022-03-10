import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Home.css'

//home page
function Home() {
  const history = useNavigate();
  return (
  
    <div className="section">
        <h1> Shogi </h1>
        <div class = "video-container">
          <div class = "color-overlay"> 
        </div>
        <iframe src="https://www.youtube.com/embed/ga_ivdZ7es0?vq=hd1080&autoplay=1&loop=1&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&theme=light&fs=0&controls=0&disablekb=1&mute=1&loop=1" width="1920" height="1080" frameborder="0"></iframe>
        </div>

          <button className="home--button" onClick={() => {history('Play')}}>Play Shogi</button>
          <button className="home--button" onClick={() => {history('Learn')}}>Learn Shogi</button>
          <button className="home--button" onClick={() => {history('sign-up')}}>Sign up</button>

      </div>
  );
}

export default Home;