import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../containers/Home'
import Project from '../containers/Project'
import Post from '../containers/Post'
import LogIn from '../containers/login'
import LogOut from '../containers/logout'
import Dashboard from '../containers/dashBoard'
import About from '../containers/About'

import PrivateRoute from '../utils/privateRoute'
import PublicRoute from '../utils/publicRoute'

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/projects" component={Project} />
    <Route exact path="/posts" component={Post} />
    <PublicRoute path="/login" component={LogIn} />
    <PrivateRoute path="/logout" component={LogOut} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
  </Switch>
)