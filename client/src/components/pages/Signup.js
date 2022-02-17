import React from 'react';
import { useNavigate } from 'react-router-dom'
import '../../App.css';
import './Signup.css';
//sign up page
function Signup() {
  const history = useNavigate();
  return (
    <>
      <div className="login-wrapper">
      <h1>Sign up</h1>
      <form className="signup-form">
        <label>
          <p>First Name *</p>
          <input type="text" placeholder="First Name" required/>
        </label>
        <label>
          <p>Last Name *</p>
          <input type="text" placeholder="Last Name" required/>
        </label>
        <label>
          <p>Email *</p>
          <input type="text" placeholder="Email" required/>
        </label>
        <label>
          <p>Username *</p>
          <input type="text" placeholder="Username" required />
        </label>
        <label>
          <p>Password *</p>
          <input type="password" placeholder="Password" required />
        </label>
        <div>
          <button className="submitbutton" type="submit">Submit</button>
  
        </div>
      </form>
      <button className="submitbutton" onClick={() => {history('/login')}}>Already Have an account? Login!</button>
      </div>
    </>
  );
}

export default Signup;