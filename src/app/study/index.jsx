/**
* @Author: woolson
* @Date:   2016-06-16 16:06:00
* @Email:  woolson.lee@gmail.com
* @Last modified by:   woolson
* @Last modified time: 2017-07-22 17:07:29
*/

import "./style"
import React from "react"
import moment from "moment"
import Tab from "_tab"
import Empty from "_block-with-empty"
import { Link, hashHistory } from "react-router-dom"
import axios from "axios"
import _ from "lodash"
import articles from "Static/faker/article"

const TabList = [
  {
    name: "全部",
    tag: "all"
  },
  {
    name: "最新",
    tag: "new",
  },
  {
    name: "前端",
    tag: "frontend",
  },
  {
    name: "笔记",
    tag: "note",
  },
  {
    name: "Bug",
    tag: "bug",
  },
]
let ArticalData = null

class Study extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      list: null,
      index: 0,
    }

    this.onTabChanged = this.onTabChanged.bind(this)
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    axios.get(articles).then(({data}) => {
      const list = data.articles
      this.setState({list})
    })
  }

  tabIndex() {
    const { type } = this.props.match.params
    return TabList.findIndex(o => o.tag === type)
  }

  filterList() {
    const {list} = this.state
    const tabIndex = this.tabIndex()

    if(_.isEmpty(list)) return []

    const text = tabIndex ?
      TabList[tabIndex].tag
      :
      ""

    if(tabIndex === 1) {
      return list.filter(item => {
        return moment().diff(moment(item.date), "days") < 3
      })
    }else {
      return list.filter(item => item.tags.indexOf(text) !== -1)
    }
  }

  renderList() {
    return this.filterList().map((item, index) => {
      return (
        <Link
          key={ index }
          to={ `/article/${item.article}` }
          className="study-list__content__item"
        >
          <h3>{ item.title }</h3>

          <div className="study-list__content__item__tag">
            <span>
              <i className="fa fa-bookmark-o u-mr5"/>
              { item.tags }
            </span>

            <span className="u-ml10">
              <i className="fa fa-calendar u-mr5"/>
              { item.date }
            </span>
          </div>

          <p className="study-list__content__item__content">
            { item.describe }
          </p>
        </Link>
      )
    })
  }

  onTabChanged(tabIndex) {
    const {pathname} = window.location

    this.props.history.replace(`/study/${TabList[tabIndex].tag}`)
  }

  render() {
    

    return (
      <div className="study-list">
        <div className="study-list__nav">
          <Tab
            ref="tabList"
            list={ TabList.map(o => o.name) }
            index={ this.tabIndex() }
            onChange={ this.onTabChanged }
          />
        </div>

        <Empty
          loading={ this.state.list === null }
          empty={ _.isEmpty(this.filterList()) }
        >
          <div className="study-list__content">
            { this.renderList() }
          </div>
        </Empty>
      </div>
    )
  }
}

export default Study
