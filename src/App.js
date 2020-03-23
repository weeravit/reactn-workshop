import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';


import Routing from './core/routes'
import { setGlobal } from 'reactn'

import { getToken, getUser, removeUserSession, setUserSession } from './utils/common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(getUser())
  console.log("App -> user", user)
  

  // const user = getUser();

  useEffect(() => {
    setUser(getUser())
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/v1/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  const handleLogout = () => {
    // removeUserSession();
    setUser(null)
    // console.log('user after', user)
    // props.history.push('/login');
    // return <Link to="/login" />
  }

  console.log("user", user)
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            {user ? <NavLink activeClassName="active" to="/logout" onClick={handleLogout}>Log Out</NavLink> : <NavLink activeClassName="active" to="/login">Log In</NavLink>}
            {/* <NavLink activeClassName="active" to="/login">Sign Up</NavLink> */}
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
          </div>
          <div className="content">
          <Routing />
          </div>
        </div>
      </BrowserRouter>


    </div>
  );
}

export default App;