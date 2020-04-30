import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import $ from "jquery";
import "./ActionDialog.css";
import templateMessages from "./templateMessages";
import classNames from "classnames";
import CountryCodes from "./countryCodes";

const Twilio = require("twilio-client");

class ActionDialog extends Component {
  static propTypes = {
    msg: PropTypes.string,
    option: PropTypes.option,
  };

  static defaultProps = {
    msg: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      countryCode: "",
      currentNumber: "",
      log: "Connecting...",
      phoneNo: "",
      countries: CountryCodes,
      error: false,
    };
  }

  handleDialog = () => {
    this.props.closeDialog();
  };

  async handleChange(event, data) {
    await this.setState({
      countryCode: data.value,
    });
  }

  async handleValueChange(event) {
    await this.setState({
      phoneNo: event.target.value,
    });
  }

  handleEventAction = () => {
    if (this.state.phoneNo !== "") {
      if (this.props.option === "call") this.callUser();
      else this.sendMessageUpdates();
      this.setState({ error: false });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  async sendMessageUpdates() {
    let phoneNumber = `+${this.state.countryCode}${this.state.phoneNo}`;
    templateMessages.map((msg) => {
      msg.phoneNumber = phoneNumber;
    });

    // call simple sms api

    // call the notification api to set the data in the db
    templateMessages.map(async (msg) => {
      await $.post("/messages", msg);
    });
  }

  // getToken method
  async getToken() {
    let data = await $.getJSON("/token");
    // Setup Twilio.Device
    Twilio.Device.setup(data.tokenCall);

    //device Events
    Twilio.Device.ready(() => {
      console.log("Connected!");
    });

    Twilio.Device.disconnect(() => {
      console.log("Call ended!");
    });
  }

  async callUser() {
    let phoneNumber = `+${this.state.countryCode}${this.state.phoneNo}`;
    let call = await $.post("/call", { number: phoneNumber });
  }
  render() {
    return (
      <div className="container">
        <label>{this.props.msg}</label>
        <div className="input_fields">
          <div className="form-field">
            <Dropdown
              button
              className="icon"
              floating
              labeled
              icon="world"
              options={this.state.countries}
              search
              placeholder="Select Country"
              onChange={(event, data) => this.handleChange(event, data)}
            />
          </div>
          <div className={this.state.error ? "ui input error form-field" : ""}>
            <input
              type="tel"
              id="phone_no"
              name="firstname"
              className="phoneNumber"
              placeholder="Phone Number..."
              value={this.state.phoneNo}
              onChange={(event) => this.handleValueChange(event)}
            ></input>
          </div>
        </div>
        <div className="form_buttons">
          <button
            className="ui primary button"
            onClick={this.handleEventAction}
          >
            {this.props.option === "call" ? "Call" : "Get SMS Updates"}
          </button>
          <button className="ui secondary button" onClick={this.handleDialog}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default ActionDialog;
