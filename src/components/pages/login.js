import React from 'react'
import "./Signup.css"

function login() {
    return(
    <>
    <div className="login-wrapper">
      <h1>Login</h1>
      <form className="signup-form">
        <label>
          <p>Username *</p>
          <input type="text" placeholder="Username" required />
        </label>
        <label>
          <p>Password *</p>
          <input type="password" placeholder="Password" required />
        </label>
        <div>
          <button className="submitbutton" type="submit">Login</button>
        </div>
      </form>
      </div>
    </>

    )
}

export default login;