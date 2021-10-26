import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Learn from './components/pages/Learn';
import Signup from './components/pages/Signup';

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/> 
          <Route path="/learn" component={Learn}/>
          <Route path="/sign-up" component={Signup}/>
        </Switch>
      </Router>

    </>
  );
}

export default App;
