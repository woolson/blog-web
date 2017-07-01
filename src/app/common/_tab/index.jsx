/*
* @Author: woolson
* @Date:   2017-06-11 17:17:31
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2017-07-01 14:57:42
*/

import "./style"
import React from "react"
import PropTypes from "prop-types"

export default class Tab extends React.Component {
  static propTypes = {
    list: PropTypes.array,
    index: PropTypes.number,
    onChange: PropTypes.func,
  }

  onChange(index, e) {
    this.props.onChange && this.props.onChange(index)
  }

  renderItems() {
    const {list, index} = this.props

    return list.map((o, i) => {
      const className = i === index ? "active" : ""

      return (
        <li
          key={ i }
          className={ className }
          onClick={ this.onChange.bind(this, i) }
        >
          { o }
        </li>
      )
    })
  }

  render() {
    return (
      <ul className="_tab" ref="filter">
        { this.renderItems() }
      </ul>
    )
  }
}
