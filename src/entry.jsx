/*
* @Author: woolson
* @Date:   2017-06-10 21:06:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2017-06-11 21:06:19
*/

import React from "react"
import { render } from "react-dom"
import AppRouter from "./router"

import "normalize.css/normalize"
import "font-awesome/css/font-awesome"
import "github-markdown-css/github-markdown.css"
// import "Static/css/marxico.css"
import "highlight.js/styles/monokai.css"

render(
  <AppRouter />,
  document.getElementById("application")
)

if(module.hot) {
  module.hot.accept()
}
