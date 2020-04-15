import React, { Component } from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import $ from "jquery";
import "./App.css";
const Chat = require("twilio-chat");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: null,
      channel: null,
    };
  }

  componentDidMount = () => {
    this.getToken()
      .then(this.createChatClient)
      .then(this.joinPersonalChannel)
      .then(this.configureChannelEvents)
      .catch((error) => {
        this.addMessage({ body: `Error: ${error.message}` });
      });
  };

  createChatClient = (token) => {
    return new Promise((resolve, reject) => {
      resolve(new Chat.Client.create(token.jwt));
    });
  };

  handleNewMessage = (text) => {
    if (this.state.channel) {
      this.state.channel.sendMessage(text);
    }
  };
  configureChannelEvents = (channel) => {
    channel.on("messageAdded", ({ author, body }) => {
      this.addMessage({ author, body });
    });

    channel.on("memberJoined", (member) => {
      this.addMessage({ body: `${member.identity} has joined the channel.` });
    });

    channel.on("memberLeft", (member) => {
      this.addMessage({ body: `${member.identity} has left the channel.` });
    });
  };

  getToken = () => {
    return new Promise((resolve, reject) => {
      this.setState({
        messages: [...this.state.messages, { body: `Connecting...` }],
      });

      $.getJSON("/token", (token) => {
        this.setState({ username: token.identity });
        resolve(token);
      }).fail(() => {
        reject(Error("Failed to connect."));
      });
    });
  };

  addMessage = (message) => {
    const messageData = {
      ...message,
      me: message.author === this.state.username,
    };
    this.setState({
      messages: [...this.state.messages, messageData],
    });
  };

  createPersonalChannel = (chatClient) => {
    console.log("createPersonalChannel", chatClient);
    return new Promise((resolve, reject) => {
      this.addMessage({ body: "Initiating a chat with a customer" });
      chatClient
        .createChannel({
          uniqueName: "support_cha",
          friendlyName: "Customer Chat Support",
        })
        .then(() => {
          this.joinPersonalChannel(chatClient);
        })
        .catch(() => reject(Error("Could not create new channel")));
    });
  };

  joinPersonalChannel = (chatClient) => {
    console.log("joinPersonalChannel", chatClient);
    return new Promise((resolve, reject) => {
      chatClient
        .getSubscribedChannels()
        .then(() => {
          chatClient
            .getChannelByUniqueName("support_cha")
            .then((channel) => {
              this.addMessage({ body: "Welcome to support chat..." });
              this.setState({ channel });

              channel
                .join()
                .then(() => {
                  this.addMessage({
                    body: `You can ask your queries here as ${this.state.username}`,
                  });
                  window.addEventListener("beforeunload", () =>
                    channel.leave()
                  );
                })
                .catch(() => {
                  reject(Error("Unable to connect to chat"));
                });

              channel.on("typingStarted", function (member) {
                console.log(member.identity + "is currently typing.");
              });

              resolve(channel);
            })
            .catch(() => {
              this.createPersonalChannel(chatClient);
            });
        })
        .catch(() => {
          reject(Error("Could not connect you to chat support!"));
        });
    });
  };

  render() {
    return (
      <div className="App">
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    );
  }
}

export default App;
