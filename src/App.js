import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Learn from './components/pages/Learn';
import Signup from './components/pages/Signup';
import Play from './components/pages/Play';
import LearnInfo from './components/pages/LearnInfo';
import PageNotFound from './components/pages/PageNotFound';
import Login from './components/pages/login';
//test
/*
          <Route path="/how-to-play" element={() => window.location.href = links[0]}/>
          <Route path="/openings" element={() => window.location.href = links[1]}/>
          <Route path="/famous-games" element={() => window.location.href = links[2]}/>

*/
function App() {  
  var links = [encodeURI('https://www.youtube.com/watch?v=Pkz0LVBg0W4&list=PL587865CAE59EB84A'),encodeURI('https://www.youtube.com/watch?v=Ly06LC7H0go&list=PL5CD9EDBA4FC444A8&index=1'),encodeURI('https://www.youtube.com/watch?v=FAWYQlElI4Q&list=PLB3D925021814AD0A&index=1')];
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/"  element={<Home/>}/> 
          <Route  path="/learn" element={<Learn/>}/>
          <Route  path="/sign-up" element={<Signup/>}/>
          <Route  path="/play" element={<Play/>}/>
          <Route path="/LearnInfo/:piece" element={<LearnInfo/>}/>

          <Route  path="/404" element={<PageNotFound/>}/>
          <Route  path="/login" element={<Login/>}/>
        </Routes>
      </Router>

    </>
  );
}

export default App;
