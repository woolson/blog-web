/**
* @Author: woolson
* @Date:   2016-06-16 16:06:00
* @Email:  woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-06-11 23:06:53
*/

import "./style"
import React from "react"
import moment from "moment"
import Tab from "_tab"
import Empty from "_block-with-empty"
import { Link, browserHistory } from "react-router"
import axios from "axios"
import _ from "lodash"
import articles from "Faker/article"

const TabList = [
  {
    name: "全部",
    tag: ""
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
      tabIndex: 0,
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

  filterList() {
    const {list, tabIndex} = this.state

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

  showArticle(data) {
    browserHistory.push({
      pathname: "article",
      state: data,
      query: {
        is: data.article,
      },
    })
  }

  renderList() {
    return this.filterList().map((item, index) => {
      return (
        <Link
          key={ index }
          to={ `/study/article/${item.article}` }
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
    const {pathname} = browserHistory.getCurrentLocation()
    if(pathname.indexOf("article") !== -1) {
      browserHistory.push("/study")
    }

    this.setState({tabIndex})
  }

  render() {
    const {list, tabIndex} = this.state
    const children = this.props.children

    return (
      <div className="study-list">
        <Tab
          ref="tabList"
          list={ TabList.map(o => o.name) }
          index={ tabIndex }
          onChange={ this.onTabChanged }
        />

        {
          children ?
            children
            :
            <Empty
              loading={ list === null }
              empty={ _.isEmpty(this.filterList()) }
            >
              <div className="study-list__content">
                { this.renderList() }
              </div>
            </Empty>
        }
      </div>
    )
  }
}

export default Study
