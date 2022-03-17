import React, { useState } from 'react'
import axios from "axios";
import { AuthContext } from '../../App';
import "./Signup.css"


const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    username: "",
    password: "",
    errorMessage: null
  };

  const [data, setData] = React.useState(initialState);

  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };


  const handleSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      errorMessage: null
    });
    axios.post("http://localhost:5000/login", JSON.stringify({username: data.username, password: data.password})).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res;
    })
    .then(resJson => {
      dispatch({
          type: "LOGIN",
          payload: resJson
      })
    })
    .catch(error => {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message || error.statusText
      });
    });
};
  return(
    <>
    <div className="login-wrapper">
      <h1>Login</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          <p>Username *</p>
          <input type="text" placeholder="Username" name="username" value={data.username} onChange={e => onChange(handleInputChange)} required />
        </label>
        <label>
          <p>Password *</p>
          <input type="password" placeholder="Password" name="password" value={data.password} onChange={e => onChange(handleInputChange)} required />
        </label>
        <div>
          <button className="submitbutton" type="submit">Login</button>
        </div>
          {data.errorMessage && (
            <span className="form-error">{data.errorMessage}</span>
          )}
      </form>
      </div>
    </>

    )
}

export default Login;