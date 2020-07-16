import React, { useState } from 'react';
import './App.css';

export default function App() {

  const errorMessage = {
    full_name: 'Error: at least two words',
    email: 'Error: Incorrect address',
    password: 'Error: Between 6 and 18 chars',
    confirmPassowrd: 'Error: Password doesnt`t match'
  }
  const[submitState, setState] = useState(false);
  const [data, setData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassowrd: ""
  })
  const [error, setError] = useState({
    full_name: false,
    email: false,
    password: false,
    confirmPassowrd: false
  })

  function handleSubmit() {
    let count = 0;
    let validate = {full_name: false, email: false, password: false, confirmPassowrd: false};
    for (const [key, value] of Object.entries(data)) {
      if (value === "") {
        validate[key] = errorMessage[key];
      }
    }
    setError({...validate});
    console.log(validate);
    for (const [key, value] of Object.entries(validate)) {
      if (value.toString().includes('Error:')) {
        count++;
      }
    }
    if (count === 0) {
      setState(true);
      setTimeout(function () {
        setState(false);
      }, 3000);
      // console.log("load");
    } else {
      console.log("not load");
    }
  }

  const handleValidation = (  value, type ) => {
    let emailRegexValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(type === 'full_name') {
      if (value.split(' ').length < 2) {
        setData({...data, [type]: ""});
        setError({...error, full_name: errorMessage.full_name});
      } else {
        setError({...error, full_name: false});
        setData({...data, full_name: value});
      }
    } else if (type === 'email') {
      if (emailRegexValidation.test(value)) {
        setError({...error, email: false});
        setData({...data, email: value});
      } else {
        setData({...data, [type]: ""});
        setError({...error, email: errorMessage.email});
      }
    } else if (type === 'password') {
      if (value.length >= 6 && value.length <= 18) {
        setError({...error, password: false});
        setData({...data, password: value});
      } else {
        setData({...data, [type]: ""});
        setError({...error, password: errorMessage.password});
      }
    } else if (type === 'confirmPassword') {
      if (data.password === value) {
        setError({...error, confirmPassowrd: false});
        setData({...data, confirmPassowrd: value});
      } else {
        setData({...data, confirmPassowrd: ""});
        setError({...error, confirmPassowrd: errorMessage.confirmPassowrd});
      }
    }
  }
  return (
    <div className="App">
        <div className="container">
          <div className="wrapper">
            <div className="title">
              Form
            </div>
            <form>
                <input class={`form__full-name ${error.full_name ? 'form-error' : null}`} type="text" placeholder="Full name" onBlur={(e) => handleValidation(e.target.value, 'full_name')}/>
                <div className="error">{error.full_name ? error.full_name : null}</div>

                <input class={`form__email ${error.email ? 'form-error' : null}`} type="email" placeholder="Email" onBlur={(e) => handleValidation(e.target.value, 'email')}/>
                <div className="error">{error.email ? error.email : null}</div>

                <input class={`form__password ${error.password ? 'form-error' : null}`} type="password" placeholder="Password" onBlur={(e) => handleValidation(e.target.value, 'password')}/>
                <div className="error">{error.password ? error.password : null}</div>

                <input class={`form__confirm-password ${error.confirmPassowrd ? 'form-error' : null}`} type="password" placeholder="Confirm password" onBlur={(e) => handleValidation(e.target.value, 'confirmPassword')}/>
                <div className="error">{error.confirmPassowrd ? error.confirmPassowrd : null}</div>
                {submitState ? <div className="loader"></div> : null}
                <button className="submit" type="button" onClick={handleSubmit}>Create</button>
            </form>
          </div>
        </div>
    </div>
  );
}
