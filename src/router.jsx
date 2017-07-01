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
  Router,
  Route,
  IndexRoute,
  hashHistory,
} from "react-router"
import Header from "./app/header"
import Home from "./app/home"
import Study from "./app/study"
import Article from "./app/article"
import Share from "./app/share"

const App = (props) =>
  <div className="application">
    <Header />

    { props.children }
  </div>

export default (props) =>
  <Router history={ hashHistory }>
    <Route
      path="/"
      component={ App }
    >
      <IndexRoute
        component={ Home }
      />

      <Route
        path="/study"
        component={ Study }
        onChange={ () => document.body.scrollTop = 0 }
      >
        <Route
          path="article/:name"
          component={ Article }
        />
      </Route>

      <Route
        path="/share"
        component={ Share }
      />
    </Route>
  </Router>

