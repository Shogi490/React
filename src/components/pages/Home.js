import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom'

//home page
function Home() {
  return (
  
	<>
		
    <div className="landing-container">
      <h1> Welcome to Shogi Online </h1>
      <Link to="/play"><button>Play Shogi</button></Link>
      <Link to="/learn"><button>Learn Shogi</button></Link>
      <Link to="/sign-up"><button>Sign up</button></Link>
    </div>

   </>
  );
}

export default Home;