/*
* @Author: woolson
* @Date:   2016-12-03 20:53:13
* @Email:   woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-05-25 12:05:23
*/

import "./style"
import React from "react"
import { browserHistory } from "react-router"

export default class Article extends React.Component {
  constructor(props) {
    super(props)

    const {name} = props.routeParams
    const content = require(`Static/articles/${name}.md`)

    this.state = {
      content,
    }
  }

  render() {
    const content = this.state.content

    return (
      <div
        className="article-detail markdown-body"
        dangerouslySetInnerHTML={{__html: content}}
      />
    )
  }
}
