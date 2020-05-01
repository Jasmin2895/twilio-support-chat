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
    action: PropTypes.string,
  };

  render() {
    const msgClass = classNames("message-data-name", {
      placeRight: this.props.me,
      placeLeft: !this.props.me,
    });
    return (
      <div className="Message">
        <div className="chats">
          <div className={msgClass}>{this.props.author}</div>
          {this.props.me ? (
            <div>
              <span className="u2 chat">{this.props.body}</span>
            </div>
          ) : (
            <span className="u1 chat">{this.props.body}</span>
          )}
          {this.props.action ? (
            <span className="u1 chat">{this.props.action}</span>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Message;
