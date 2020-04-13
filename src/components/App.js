import React, { Component } from "react";
import $ from jQuery;

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      messages:[],
      username: null
    }
  }
  componentDidMount = () => {
    this.getToken()
    .catch((error)=> {
      this.setState({
        messages: [...this.state.messages, {body: `Error: ${error.message}`}]
      })
    })
  }
  
  getToken = () => {
    return new Promise((resolve, reject)=> {
      this.setState({messages: [...this.state.messages, {body: `Connecting...`}]})
    
      $.getJSON('/token', (token)=> {
        this.setState({username: token.identity})
        resolve(token)
      }).fail(()=> {
        reject(Error("failed to connect..."))
      })
    })
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

export default App;
