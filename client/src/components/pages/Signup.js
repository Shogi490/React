import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import '../../App.css';
import './Signup.css';
//sign up page


function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = event => {
    event.preventDefault();
    axios.post("http://localhost:5000/sign-up", {email, username, password}).then(res => {console.log(res); console.log(res.data)});
  }
  return (
    <>
    <div className="background-login">
      <div className="login-wrapper">
      <h1>Sign up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          <p>Email *</p>
          <input type="text" placeholder="Email" name="email" onChange={e => setEmail(e.target.value)} value={email} required/>
        </label>
        <label>
          <p>Username *</p>
          <input type="text" placeholder="Username" name="username" onChange={e => setUsername(e.target.value)} value={username}  required />
        </label>
        <label>
          <p>Password *</p>
          <input type="password" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} value={password} required />
        </label>
        <div>
          <button className="submitbutton" type="submit">Submit</button>
  
        </div>
      </form>
      <button className="submitbutton" onClick={() => {history('/login')}}>Already Have an account? Login!</button>
      </div>
      </div>
    </>
  );
}

export default Signup;