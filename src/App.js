import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Learn from './components/pages/Learn';
import Signup from './components/pages/Signup';
import Play from './components/pages/Play';
import bishop from './components/pages/LearnPages/bishop';
import king from './components/pages/LearnPages/king';
import ggeneral from './components/pages/LearnPages/ggeneral';
import kinght from './components/pages/LearnPages/knight';
import lance from './components/pages/LearnPages/lance';
import pawn from './components/pages/LearnPages/pawn';
import rook from './components/pages/LearnPages/rook';
import sgeneral from './components/pages/LearnPages/sgeneral';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/> 
          <Route path="/learn" component={Learn}/>
          <Route path="/sign-up" component={Signup}/>
          <Route path="/play" component={Play}/>
          <Route path="/learn-king" component={king}/>
          <Route path="/learn-ggeneral" component={ggeneral}/>
          <Route path="/learn-bishop" component={bishop}/>
          <Route path="/learn-knight" component={kinght}/>
          <Route path="/learn-lance" component={lance}/>
          <Route path="/learn-pawn" component={pawn}/>
          <Route path="/learn-rook" component={rook}/>
          <Route path="/learn-sgeneral" component={sgeneral}/>

        </Switch>
      </Router>

    </>
  );
}

export default App;
