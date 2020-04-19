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
        />
        <button type="submit">
          <img className="send-image" src={SendBtn}></img>
        </button>
      </form>
    );
  }
}

export default MessageForm;
