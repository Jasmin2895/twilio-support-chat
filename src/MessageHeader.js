import React, { Component } from "react";
import "./MessageHeader.css";
import SmsImage from "./assets/sms.svg";
import PhoneImage from "./assets/phone.svg";

class MessageHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chat-header clearfix">
        <div className="chat-about">
          <div className="chat-with">Support Chat By Twilio</div>
          <div className="help-icons">
            <img src={SmsImage} className="icon-image"></img>
            <img src={PhoneImage} className="icon-image"></img>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageHeader;
