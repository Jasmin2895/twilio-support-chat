import React, { Component } from "react";
import "./MessageHeader.css";
import SmsImage from "./assets/sms.svg";
import PhoneImage from "./assets/phone.svg";
import { EnvironmentList } from "twilio/lib/rest/serverless/v1/service/environment";

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
          <div className="chat-with">Support Chat By Twilio</div>
          <div className="help-icons">
            <img
              src={SmsImage}
              className="icon-image"
              onClick={() => this.handleClickEvent("msg")}
            ></img>
            <img
              src={PhoneImage}
              className="icon-image"
              onClick={() => this.handleClickEvent("call")}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageHeader;
