/**
 * @Author: woolson
 * @Date:   2017-06-11 18:06:00
 * @Email:  woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-06-12 00:06:48
 */

import "./style"
import React from "react"
import { Link, browserHistory } from "react-router"
import Banner from "Static/images/banner.jpg"
import cx from "classnames"

export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.sections = [
      {
        name: "主页",
        icon: "home",
        path: "/",
      },
      {
        name: "文章",
        icon: "graduation-cap",
        path: "/study",
      },
      {
        name: "分享",
        icon: "database",
        path: "/share"
      }
    ]
  }

  renderSections() {
    const {pathname} = browserHistory.getCurrentLocation()

    return this.sections.map(item => {
      const icon = item.icon
      const isActive = pathname.indexOf(item.path) !== -1
      const isHome = item.path === "/"

      const klass = cx("header_item", {
        "header_item--active": isHome ? pathname === "/" : isActive,
      })

      return (
        <div
          key={ item.name }
          className={ klass }
        >
          <Link to={ item.path }>
            <i className={ `fa fa-${icon}` } />

            { item.name }
          </Link>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="header">
        { this.renderSections() }
      </div>
    )
  }
}
