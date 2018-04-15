/*
* @Author: woolson
* @Date:   2017-06-24 12:57:20
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2017-07-01 11:39:19
*/

import "./style"
import axios from "axios"
import React from "react"
import Banner from "Static/images/banner.jpg"
import Update from "Static/faker/update"

export default class Home extends React.Component {
  state = {
    update: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    axios.get(Update).then(res => this.setState({update: res.data}))
  }

  renderItems() {
    return this.state.update.map((item, index) => {
      return (
        <div
          key={ index }
          className="home-block__content__item"
        >
        </div>
      )
    })
  }

  render() {
    return (
      <div className="home">
        <div className="home-block">
          <div className="home-block__title">最近更新</div>

          <div className="home-block__content">
            { this.renderItems() }
          </div>
        </div>
      </div>
    )
  }
}
