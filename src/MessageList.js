import React, { Component } from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import ActionDialog from "./ActionDialog";
import "./MessageList.css";

class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
    msg: PropTypes.string,
    show: PropTypes.bool,
    requestType: PropTypes.string,
  };

  static defaultProps = {
    messages: [],
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
          <Message key={i} {...message} />
        ))}
        {this.props.show && (
          <ActionDialog
            msg={this.props.msg}
            option={this.props.requestType}
            closeDialog={this.handleMsgDialog}
          />
        )}
      </div>
    );
  }
}

export default MessageList;
