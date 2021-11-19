import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Learn from './components/pages/Learn';
import Signup from './components/pages/Signup';
import Play from './components/pages/Play';
import LearnInfo from './components/pages/LearnInfo';
import PageNotFound from './components/pages/PageNotFound';
import login from './components/pages/login';


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/> 
          <Route exact path="/learn" component={Learn}/>
          <Route exact path="/sign-up" component={Signup}/>
          <Route exact path="/play" component={Play}/>
          <Route exact path="/LearnInfo/:piece" render={props => <LearnInfo{...props}/> } />
          <Route exact path="/404" component={PageNotFound}/>
          <Route exact path="/login" component={login}/>
        </Switch>
      </Router>

    </>
  );
}

export default App;
