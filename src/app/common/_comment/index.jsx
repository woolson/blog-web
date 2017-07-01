/*
* @Author: woolson
* @Date:   2016-12-16 23:16:17
* @Email:   woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-05-25 12:05:04
*/

import "./style"
import React, { Component } from "react"
import cx from "classnames"
import { isEmpty, Msg } from "utils"
import $ from "jquery"
import moment from "moment"

export default class Comment extends Component {
  static defaultProps = {
    data: [
      {
        name: "woolson",
        message: "这个是一则测试信息……",
        date: "2016-12-01"
      }
    ]
  }

  submitComment(replyID, commentID, evt) {
    const $button = $(evt.target).closest("button")
    const message = $button.prev("textarea").val().trim()
    if($button.is(".disabled")) {
      Msg("请先使用Github登录！", "warn")
      return
    }else if(!message) {
      Msg("提交信息不可以是空的哦！", "warn")
      return
    }

    const data = {
      message: message,
      replyID: replyID,
      commentID: commentID,
    }

    $button.prev("textarea").val("")

    this.props.onSubmit && this.props.onSubmit(data)
    if(replyID) {
      $(evt.target).closest("._comment-content__item_input").slideUp()
    }
  }

  renderInput(replyID, commentID) {
    const avatar = isEmpty(Global.user) ? require("../../assets/images/hi.svg") : Global.user.avatar_url
    return <div className="_comment-input">
      <img src={ avatar } />

      <textarea
        className="_comment-input__textarea"
      />

      <button
        className={ cx({disabled: isEmpty(Global.user)}) }
        onClick={ this.submitComment.bind(this, replyID, commentID) }
      >
        <i className="fa fa-check"/>
      </button>
    </div>
  }

  agree(commentID, type, evt) {
    if(isEmpty(Global.user)) return Msg("未登录不可此操作哦！", "error")
    else if($(evt.target).is(".active")) return Msg(`你已经${ type ? "赞" : "踩" }过咯`, "warn")

    const param = {
      comment_id: commentID,
      agree: type,
    }

    this.props.onAgree && this.props.onAgree(param)
  }

  renderComments(data, level = 0, commentID) {
    const Data = isEmpty(data) ? this.props.data : data
    if(isEmpty(Data)) return <center>Be the first...</center>

    return Data.map((item, index) => {
      const agree = item.agrees.filter(o => o.agree == 1).map(o => o.uid)
      const disagree = item.agrees.filter(o => o.agree == 0).map(o => o.uid)

      return <div className="_comment-content__item">
        <img src={ item.avatar_url } />

        <div className="_comment-content__item_content">
          <div className="info">
            <a className="u-mr5 name" href={ item.html_url } target="_blank">
              { item.author_name }
            </a>

            {
              item.reply_name
                && ["@",
                    <a className="name u-ml5 u-mr10" href={ item.reply_url } target="_blank">
                      { item.reply_name }
                    </a>
                   ]
            }

            <span>
              { moment(item.create_date).format("YYYY-MM-DD HH:mm:ss") }
            </span>
          </div>

          <div className="message">{ item.message }</div>

          <div className="evaluation">
            <span>
              <i
                className={ cx("fa fa-angle-up u-mr5", {
                    active: agree.has((Global.user || {}).id)
                  })
                }
                onClick={ this.agree.bind(this, item._id, 1) }
              />
              { agree.length || 0 }
            </span>

            <span className="u-ml5 u-mr5">|</span>

            <span>
              <i
                className={ cx("fa fa-angle-down u-mr5", {
                    active: disagree.has((Global.user || {}).id)
                  })
                }
                onClick={ this.agree.bind(this, item._id, 0) }
              />
              { disagree.length || 0 }
            </span>

            <i
              title="Reply"
              className="fa fa-reply u-ml10"
              onClick={ evt => {
                const $input = $(evt.target).next("div")
                const isShow = $input.is(":visible")
                $input[isShow ? "slideUp" : "slideDown"]()
              } }
            />

            <div
              className="_comment-content__item_input"
              style={{display: "none"}}
            >

              { this.renderInput(item.uid, level ? commentID : item._id) }
            </div>

            {
              !isEmpty(item.replies)
                && <div className="_comment-content__item_reply">
                    { this.renderComments(item.replies, 1, item._id) }
                  </div>
            }
          </div>
        </div>
      </div>
    })
  }

  logout() {
    let newCookie = `user=;expires=-1;domain=woolson.cn`
    document.cookie = newCookie
    Msg("Logout success!")

    setTimeout(function () {
      window.location.reload()
    }, 3000)
  }

  render() {
    return <div className="_comment">
      <div className="_comment-header">
        <span>{  this.props.data.length || 0 } Comments</span>

        {
          isEmpty(Global.user)
            ? <span
                className="u-mlauto"
                onClick={ () => location.href = "https://github.com/login/oauth/authorize?client_id=72e5cae736efb0366ffc&redirect_uri=http://www.woolson.cn/oauth/github&state=23ede2ewedqwe" }
              >
                <i className="fa fa-github u-mr5" />
                Login with Github
              </span>
            : <span
                className="u-mlauto"
                title="Click to Logout"
                onClick={ this.logout }
              >
                Login with:&nbsp;
                { Global.user.name }
              </span>
        }
      </div>

      { this.renderInput(0) }

      <div className="_comment-content">
        { this.renderComments() }
      </div>
    </div>
  }
}
