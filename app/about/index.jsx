import "./style"
import React from "react"

export default React.createClass({
  render: function() {
    return (
      <div className="about">
        <div className="about-logo">
          <img src={ require("../assets/images/logo.png") } />
        </div>
      </div>
    )
  }
})
