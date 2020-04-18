import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Message.css";

class Message extends Component {
  static propTypes = {
    author: PropTypes.string,
    body: PropTypes.string.isRequired,
    me: PropTypes.bool,
    type: PropTypes.string,
  };

  render() {
    const classes = classNames("Message", {
      log: !this.props.me && !this.props.type,
      me: this.props.me,
      info: this.props.type,
    });
    return (
      <div className={classes}>
        {this.props.me ? (
          <span className="author">{this.props.body}</span>
        ) : (
          <span>{this.props.body}</span>
        )}
      </div>
    );
  }
}

export default Message;
