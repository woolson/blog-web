/**
* @Author: woolson
* @Date:   2016-06-16 16:06:00
* @Email:  woolson.lee@gmail.com
 * @Last modified by:   woolson
 * @Last modified time: 2017-05-25 12:05:80
*/

import "./style"
import React from "react"
import moment from "moment"
import cx from "classnames"
import Empty from "_block-with-empty"
import $ from "jquery"
import moment from "moment"

const Color = [
  "#03B765",
  "#25c9c2",
  "#258ec7",
  "#F74902",
]

export default React.createClass({
  getInitialState() {
    return {
      messageList: null,
    }
  },

  componentDidMount() {
    this.fetchData()
  },

  componentDidUpdate(prevProps, prevState) {
    this.updatePading()
  },

  updatePading() {
    const $list = $(this.refs.list)
    if($list) {
      const scroll = $list[0].offsetWidth - $list[0].scrollWidth
      $list.css("padding-left", scroll)
    }
  },

  fetchData() {
    $.getJSON(__HOST__ + "/fetchAllMessage")
      .then(d => this.setState({messageList: d.messages}))
  },

  submite(evt) {
    evt.preventDefault()

    const $send = $("i", $(evt.target))
    $send.addClass("sending")
    setTimeout(() => $send.removeClass("sending"), 1100)

    let params = {
      author: this.refs.name.value,
      content: this.refs.message.value,
      response: null,
      date: moment().format("YYYY-MM-DD HH:MM:SS"),
    }

    $.post(__HOST__ + "/insertMessage", params)
      .then(d => {
        if(d.succ) {
          this.refs.name.value = ""
          this.refs.message.value = ""
          this.fetchData()
        }
      })
  },

  respone(e) {
    let responeName = $(e.target).closest("li").text()
    this.refs.message.value = "@" + responeName + "："
    this.refs.message.focus()
  },

  renderList() {
    if(!this.state.messageList) return null

    return this.state.messageList.reverse().map((item, index) => {
      const color = Color[~~(Math.random() * 3)]
      const klass = index % 2 == 0 ? "node-left" : "node-right"

      return <div className="node-item">
        <div
          className="node-item__content"
          style={{
            background: color,
            animationDelay: Math.random() * 0.5 + "s",
          }}
        >
          <ul>
            <li
              onClick={ this.respone }
              title="click to respone him or her"
            >
              {item.author}
            </li>
            <li>{item.content}</li>
            <li>
              <i className="fa fa-calendar u-mr5" />
              <span>{ item.date }</span>
            </li>
          </ul>
        </div>
      </div>
    })
  },

  render() {
    return <div className="message">
      <form
        className="send"
        onSubmit={ this.submite }
      >
        <label>Express your ideas !</label>

        <input
          ref="name"
          type="text"
          placeholder="what's your name"
          required
        />

        <textarea
          type="text"
          id="message"
          ref="message"
          placeholder="Say something …"
          className="form-control"
          required
        />

        <button type="submite">
          <i className={ cx("fa fa-paper-plane") } />
        </button>
      </form>

      <Empty
        loading={ this.state.messageList == null }
      >
        <div
          ref="list"
          className="message-list"
        >
          { this.renderList() }
        </div>
      </Empty>
    </div>
  },
})
