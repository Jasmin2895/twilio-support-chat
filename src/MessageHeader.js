import React, { Component } from "react";
import "./MessageHeader.css";

class MessageHeader extends Component {
  constructor(props) {
    super(props);
  }

  handleClickEvent = (eventType) => {
    this.props.onClickIcons(eventType);
  };

  render() {
    return (
      <div className="chat-header clearfix">
        <div className="chat-about">
          <div className="chat-with">Support Chat By Twilio !!!!!</div>
          <div className="help-icons">
            <i
              className="icon-image comment outline icon"
              onClick={() => this.handleClickEvent("msg")}
            ></i>
            <i
              className="icon-image phone icon"
              onClick={() => this.handleClickEvent("call")}
            ></i>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageHeader;
