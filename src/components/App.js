import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="chat">
        <div className="chat-title">Chat Window</div>
        <div className="chat-body">
          <div id="messages"></div>
          <div className="chat-msg">
            <input
              id="chat-input"
              type="text"
              placeholder="say anything"
              autofocus
            />
          </div>
        </div>
      </div>
    );
  }
}
