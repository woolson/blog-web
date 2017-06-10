/**
* @Author: woolson
* @Date:   2016-06-16 16:06:00
* @Email:  woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-05-25 12:05:23
*/

import "./style"
import React from "react"
import moment from "moment"
import Tab from "_tab"
import Empty from "_block-with-empty"
import { isEmpty } from "utils"
import { browserHistory } from "react-router"
import $ from "jquery"
import moment from "moment"

const TabList = [
  "All",
  "New",
  "JS",
  "CSS",
  "Note",
  "Bug",
]
let ArticalData = null

export default React.createClass({
  getInitialState() {
    return {
        list: null,
        index: 0,
        tabIndex: 0,
      }
  },

  componentWillMount() {
    this.updateData()
  },

  updateData() {
    $.get(__HOST__ + "/fetchAllArticle")
      .then(d => {
        const data = d.articles.reverse()
        this.setState({list: data})
      })
  },

  filterList() {
    if(!this.state.list) return []

    let text = this.state.tabIndex
      ? TabList[this.state.tabIndex].toLowerCase()
      : ""

    if(this.state.tabIndex == 1) {
      return this.state.list.filter(item => moment().diff(moment(item.date), "days") < 3)
    }else {
      return this.state.list.filter(item => item.tags.has(text))
    }
  },

  redirect(page) {
    location.href = page
  },

  showArticle(data) {
    browserHistory.push({
      pathname: "article",
      state: data,
      query: {
        is: data.article,
      },
    })
  },

  renderList() {
    return this.filterList().map(item => {
      return <div id={ item.id }
        key={ item.id }
        className="study-item"
        onClick={ this.showArticle.bind(this, item) }
      >
        <a>{item.title}</a>

        <div className="study-tag">
          <span>
            <i className="fa fa-bookmark-o u-mr5"/>
            { item.tags }
          </span>

          <span className="u-ml10">
            <i className="fa fa-calendar u-mr5"/>
            { item.date }
          </span>
        </div>

        <p className="study-content">{item.content}</p>

        <span className="study-more">
          <i className="fa fa-angle-double-right u-mr5"/>
          more
        </span>
      </div>
    })
  },

  render() {
    return <div className="study-list">
      <Tab
        ref="tabList"
        tabList={TabList}
        onChange={ (index) => {
            this.setState({tabIndex: index})
          }}
      />

      <Empty
        loading={ this.state.list == null }
        empty={ isEmpty(this.filterList()) }
      >
        <div className="artical-list">
          { this.renderList() }
        </div>
      </Empty>

      { this.props.children }
    </div>
  },
})
