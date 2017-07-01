/**
* @Author: woolson
* @Date:   2016-10-12 14:10:00
* @Email:  woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-06-11 23:06:42
*/

import "./style"
import React, { Component } from "react"
import cx from "classnames"
import { BlockLoading } from "_loading"

const BlockWrapper = (props) => {
  if(props.loading) return <BlockLoading />

  return (
    <div className={ cx("_block-wrapper", props.className) }>
      {
        !props.empty ?
          props.children
          :
          <div className="_empty-tip">
            {
              props.text || <span>
                <i className="fa fa-exclamation-triangle u-mr10" />
                Nothing
              </span>
            }
          </div>
      }
    </div>
  )
}

export default BlockWrapper
