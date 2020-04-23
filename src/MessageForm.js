import React, { Component } from "react";
import PropTypes from "prop-types";
import "./MessageForm.css";
import SendBtn from "./assets/send.svg";

class MessageForm extends Component {
  static propTypes = {
    onMessageSend: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.input.focus();
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.onMessageSend(this.input.value);
    this.input.value = "";
  };

  render() {
    return (
      <form className="chat-message clearfix" onSubmit={this.handleFormSubmit}>
        <textarea
          type="text"
          ref={(node) => (this.input = node)}
          placeholder="Type your message..."
          rows="3"
          className="msg_box"
        />
        <div className="sendButton">
          <button className="ui primary button" type="submit">
            <i className="paper plane icon"></i>
            Send
          </button>
        </div>
      </form>
    );
  }
}

export default MessageForm;
