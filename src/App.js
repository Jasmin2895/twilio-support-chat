import React, { Component } from "react";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";
import MessageHeader from "./MessageHeader";
import PhoneCall from "./PhoneCall";
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
      showDialog: false,
      msg: "",
    };
  }

  // componentDidMount = () => {
  //   this.getToken()
  //     .then(this.createChatClient)
  //     .then(this.joinPersonalChannel)
  //     .then(this.configureChannelEvents)
  //     .catch((error) => {
  //       this.addMessage({ body: `Error: ${error.message}` });
  //     });
  // };

  handleSelectIcon = (eventType) => {
    let dialogMsg = "";
    if (eventType.toLowerCase() === "call")
      dialogMsg = "Enter your Phone Number to schedule a Call!";
    else dialogMsg = "Enter your Phone Number to get Message Updates!";
    this.setState({ showDialog: true, msg: dialogMsg });
  };

  createChatClient = (token) => {
    return new Promise((resolve, reject) => {
      resolve(new Chat.Client.create(token.jwt));
    });
  };

  handleMsgDialog = () => {
    this.setState({ showDialog: false });
  };

  handleNewMessage = (text) => {
    if (this.state.channel) {
      this.state.channel
        .typing()
        .then(() => {
          this.state.channel.on("typingStarted", (member) => {
            // this.addMessage({
            //   author: member.identity,
            //   body: `${member.identity} is typing...`,
            // });
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
      this.state.channel.sendMessage(text);
    }
  };

  configureChannelEvents = (channel) => {
    channel.on("messageAdded", ({ author, body }) => {
      this.addMessage({ author, body });
    });

    channel.on("memberJoined", (member) => {
      this.addMessage({
        body: `${member.identity} has joined the channel.`,
        type: "info",
      });
    });

    channel.on("memberLeft", (member) => {
      this.addMessage({
        body: `${member.identity} has left the channel.`,
      });
    });
  };

  getToken = () => {
    return new Promise((resolve, reject) => {
      this.setState({
        messages: [
          ...this.state.messages,
          { body: `Connecting...`, type: "info" },
        ],
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
    return new Promise((resolve, reject) => {
      this.addMessage({ body: "Initiating a chat with a customer" });
      chatClient
        .createChannel({
          uniqueName: "support_chat3",
          friendlyName: "Customer Chat Support",
        })
        .then(() => {
          this.joinPersonalChannel(chatClient);
        })
        .catch(() => reject(Error("Could not create new channel")));
    });
  };

  joinPersonalChannel = (chatClient) => {
    return new Promise((resolve, reject) => {
      chatClient
        .getSubscribedChannels()
        .then(() => {
          chatClient
            .getChannelByUniqueName("support_chat3")
            .then((channel) => {
              this.addMessage({
                body: "Welcome to support chat...",
                type: "info",
              });
              this.setState({ channel });

              channel
                .join()
                .then(() => {
                  this.addMessage({
                    body: `You can ask your queries here as ${this.state.username}`,
                    type: "info",
                  });
                  window.addEventListener("beforeunload", () =>
                    channel.leave()
                  );
                })
                .catch(() => {
                  reject(Error("Unable to connect to chat"));
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
        <MessageHeader onClickIcons={this.handleSelectIcon} />
        <MessageList
          show={this.state.showDialog}
          msg={this.state.msg}
          messages={this.state.messages}
          closeDialog={this.handleMsgDialog}
        />
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    );
  }
}

export default App;
