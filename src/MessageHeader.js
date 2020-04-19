import React, { Component } from "react";
import "./MessageHeader.css";

class MessageHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chat-header clearfix">
        <div className="chat-about">
          <div className="chat-with">Support Chat By Twilio</div>
        </div>
      </div>
    );
  }
}

export default MessageHeader;
