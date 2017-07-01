/*
* @Author: woolson
* @Date:   2017-06-24 12:57:20
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2017-07-01 11:39:19
*/

import "./style"
import React from "react"
import Banner from "Static/images/banner.jpg"

export default class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div
          className="home__banner"
          style={{backgroundImage: `url(${Banner})`}}
        />
      </div>
    )
  }
}
