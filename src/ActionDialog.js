import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import $ from "jquery";
import "./ActionDialog.css";
import templateMessages from "./templateMessages";

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
      callDetails: "",
      msgDetails: "",
      muted: false,
      onPhone: false,
      phoneNo: "",
      countries: [
        {
          text: "United States",
          key: "1",
          icon: "us flag",
          value: "1",
        },
        { value: "44", text: "Great Britain", key: "44", icon: "gb flag" },
        { value: "57", text: "Colombia", key: "57", icon: "co flag" },
        { value: "593", text: "Ecuador", key: "593", icon: "ec flag" },
        { value: "372", text: "Estonia", key: "372", icon: "ee flag" },
        { value: "49", text: "Germany", key: "49", icon: "de flag" },
        { value: "852", text: "Hong Kong", key: "852", icon: "hk flag" },
        { value: "353", text: "Ireland", key: "353", icon: "ie flag" },
        { value: "65", text: "Singapore", key: "65", icon: "sg flag" },
        { value: "44", text: "Spain", key: "34", icon: "es flag" },
        { value: "55", text: "Brazil", key: "55", icon: "br flag" },
        { value: "91", text: "India", key: "91", icon: "in flag" },
      ],
      connection: null,
    };
  }

  componentDidMount() {
    this.getMsgUpdates();
  }

  handleDialog = () => {
    this.props.closeDialog();
  };

  async getMsgUpdates() {
    await $.get("/messages/get");
  }
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
    if (this.props.option === "call") this.callUser();
    else this.sendMessageUpdates();
  };

  async sendMessageUpdates() {
    let phoneNumber = `+${this.state.countryCode}${this.state.phoneNo}`;
    templateMessages.map((msg) => {
      msg.phoneNumber = phoneNumber;
    });

    console.log("templateMessages", templateMessages);
    // call simple sms api

    // call the notification api to set the data in the db
    templateMessages.map(async (msg) => {
      await $.post("/messages", msg);
    });
  }

  // getToken method
  async getToken() {
    let data = await $.getJSON("/token");
    console.log("token phone call", data);
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
    console.log("call details", call);
  }
  render() {
    console.log("option", this.props.option);
    return (
      <div className="container">
        <label>{this.props.msg}</label>
        <div className="input_fields">
          <div className="country_code">
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
          <input
            type="tel"
            id="phone_no"
            name="firstname"
            placeholder="Phone Number..."
            value={this.state.phoneNo}
            onChange={(event) => this.handleValueChange(event)}
          ></input>
        </div>
        <div className="form_buttons">
          <button
            className="ui primary button"
            onClick={this.handleEventAction}
          >
            {this.props.option === "call" ? "Call" : "Message"}
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
