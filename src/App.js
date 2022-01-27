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
  var links = [encodeURI('https://www.youtube.com/watch?v=Pkz0LVBg0W4&list=PL587865CAE59EB84A'),encodeURI('https://www.youtube.com/watch?v=Ly06LC7H0go&list=PL5CD9EDBA4FC444A8&index=1'),encodeURI('https://www.youtube.com/watch?v=FAWYQlElI4Q&list=PLB3D925021814AD0A&index=1')];
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
          <Route path="/how-to-play" component= {() => { window.location.href =  links[0]; return null;}} />
          <Route path="/openings" component= {() => { window.location.href =  links[1]; return null;}} />
          <Route path="/famous-games" component= {() => { window.location.href =  links[2]; return null;}} />
          <Route exact path="/404" component={PageNotFound}/>
          <Route exact path="/login" component={login}/>
        </Switch>
      </Router>

    </>
  );
}

export default App;
