/**
 * @Author: woolson
 * @Date:   2017-06-11 18:06:00
 * @Email:  woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-06-12 00:06:48
 */

import "./style"
import React from "react"
import { withRouter } from "react-router"
import { Link } from "react-router-dom"
import Banner from "Static/images/banner.jpg"
import cx from "classnames"

class Header extends React.Component {
  constructor(props) {
    super(props)
    
    this.sections = [
      {
        name: "主页",
        icon: "home",
        active: ["/"],
        path: "/",
      },
      {
        name: "文章",
        icon: "graduation-cap",
        active: ["/study", "/article"],
        path: "/study/all",
      },
      {
        name: "分享",
        icon: "database",
        active: ["/share"],
        path: "/share",
      }
    ]
  }

  renderSections() {
    // const {pathname} = browserHistory.getCurrentLocation()
    const { history } = this.props
    const { pathname } = history.location

    return this.sections.map(item => {
      const icon = item.icon
      const isActive = item.active.some(o => {
        return pathname.indexOf(o) !== -1
      })
      const isHome = item.path === "/"

      const klass = cx("header__nav__item", {
        "header__nav__item--active": isHome ? pathname === "/" : isActive,
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
        <div className="header__bg"/>

        <div className="header__nav">
          { this.renderSections() }
        </div>
      </div>
    )
  }
}

export default withRouter(Header)