/*
* @Author: woolson
* @Date:   2017-06-24 12:57:20
* @Email:   woolson.lee@gmail.com
 * @Last Modified by: woolson
 * @Last Modified time: 2018-04-15 19:45:01
*/

import "./style"
import axios from "axios"
import React from "react"
import { Link } from 'react-router-dom'
import Banner from "Static/images/banner.jpg"
import Update from "Static/faker/update"

export default class Home extends React.Component {
  state = {
    update: [],
    tags: [
      { name: "前端", path: "frontend" },
      { name: "笔记", path: "note" },
      { name: "BUG", path: "bug" },
    ],
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

  renderTags() {
    return this.state.tags.map(o => {
      const path = `/study/${o.path}`
      return <Link to={path}>{o.name}</Link>
    })
  }

  render() {
    return (
      <div className="home">
        <div className="home-block">
          { this.renderTags() }
          {/* <div className="home-block__title">最近更新</div> */}

          {/* <div className="home-block__content">
            { this.renderItems() }
          </div> */}
        </div>
      </div>
    )
  }
}
