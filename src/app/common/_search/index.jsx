/*
* @Author: woolson
* @Date:   2017-06-11 17:17:31
* @Email:   woolson.lee@gmail.com
* @Last Modified by:   woolson
* @Last Modified time: 2017-07-01 13:28:06
*/

import React from "react"

export default class Search extends React.Component {
  render() {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search for..." />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button">Go!</button>
        </span>
      </div>
    )
  }
}
