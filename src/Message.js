import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Message.css";

class Message extends Component {
  static propTypes = {
    author: PropTypes.string,
    body: PropTypes.string.isRequired,
    me: PropTypes.bool,
  };

  render() {
    console.log("props", this.props.author, this.props.me);
    const classes = classNames("Message", {
      log: !this.props.author,
      me: this.props.me,
    });

    return <div className={classes}>{this.props.body}</div>;
  }
}

export default Message;
