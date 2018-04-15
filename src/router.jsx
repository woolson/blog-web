/*
 * @Author: woolson
 * @Date:   2017-06-11 15:06:00
 * @Email:  woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-06-11 22:06:39
 */

// import "./style"
import React from "react"
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'
import Header from "./app/header"
import Home from "./app/home"
import Study from "./app/study"
import Article from "./app/article"
import Share from "./app/share"

// const baseUrl = process.env.NODE_ENV === 'production' ? '/blog' : '/'
// const baseUrl = '/blog'

// const App = (props) =>
  

export default (props) =>
  <BrowserRouter basename="/blog">
    <div className="application">
      <Header />

      <Switch>
        <Route
          path="/"
          exact={true}
          component={Home}
        />

        <Route
          path="/study/:type"
          exact={true}
          component={Study}
          onChange={() => document.body.scrollTop = 0}
        />

        <Route
          path="/article/:name"
          component={Article}
        />

        <Route
          path="/share"
          component={Share}
        />
      </Switch>
    </div>
  </BrowserRouter>

