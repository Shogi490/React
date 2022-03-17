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
import UserProfile from "./components/pages/UserProfile.js"

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state;
  }
}


function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || null)
    const token = JSON.parse(localStorage.getItem('token') || null)
    if(user && token){
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token
        }
      })
    }
  }, [])

  return (
    <>
      <AuthContext.Provider value={{state, dispatch}}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/"  element={<Home/>}/> 
          <Route  path="/learn" element={<Learn/>}/>
          <Route  path="/sign-up" element={<Signup/>}/>
          <Route  path="/play" element={<Play/>}/>
          <Route path="/LearnInfo/:piece" element={<LearnInfo/>}/>
          <Route path="/how-to-play" element={<LearnInfo/>}/>
          <Route path="/openings" element={<LearnInfo/>}/>
          <Route path="/famous-games" element={<LearnInfo/>}/>
          <Route  path="/404" element={<PageNotFound/>}/>
          <Route  path="/login" element={<Login/>}/>
          <Route path='/user/:id' element={<UserProfile/>}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
