import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import ActionDialog from "./ActionDialog";
import "./MessageList.css";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: false,
      actionMsg: "",
    };
  }
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
    msg: PropTypes.string,
    show: PropTypes.bool,
    requestType: PropTypes.string,
  };

  static defaultProps = {
    messages: [],
  };

  handleActionEvent = (action) => {
    if (action === "call")
      this.setState({
        actionMsg:
          "Your call request is registered. You will be reciveing call soon!",
      });
    else
      this.setState({
        actionMsg:
          "Your message request registered you will recieve updates shortly!",
      });
  };

  handleMsgDialog = () => {
    this.props.closeDialog();
  };

  componentDidUpdate = () => {
    this.node.scrollTop = this.node.scrollHeight;
  };

  render() {
    return (
      <div className="MessageList" ref={(node) => (this.node = node)}>
        {this.props.messages.map((message, i) => (
          <Message action={this.state.actionMsg} key={i} {...message} />
        ))}
        {this.props.show && (
          <ActionDialog
            msg={this.props.msg}
            option={this.props.requestType}
            sendActionResponse={this.handleActionEvent}
            closeDialog={this.handleMsgDialog}
          />
        )}
      </div>
    );
  }
}

export default MessageList;
