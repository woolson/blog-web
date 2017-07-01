/*
* @Author: woolson
* @Date:   2017-07-01 13:26:21
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2017-07-01 13:26:32
*/

import "./style"
import React from "react"

export default class Aboute extends React.Component {
  render() {
    return (
      <div className="about">
        <div className="about-logo">
          <img src={ require("../assets/images/logo.png") } />
        </div>
      </div>
    )
  }
}
