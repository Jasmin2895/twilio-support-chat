import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import { Flag, Segment } from "semantic-ui-react";
import $ from "jquery";
import "./PhoneCall.css";
const Twilio = require("twilio-client");
class PhoneCall extends Component {
  static propTypes = {
    msg: PropTypes.string,
  };

  static defaultProps = {
    msg: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      countryCode: "1",
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
    // this.getToken();
  }

  handleDialog = () => {
    this.props.closeDialog();
  };

  async handleChange(event, data) {
    console.log("event data", event, data.value);
    await this.setState({
      countryCode: data.value,
    });
    console.log("country code", this.state.countryCode);
  }

  async handleValueChange(event) {
    console.log("handleValueChange", event.target.value);
    await this.setState({
      phoneNo: event.target.value,
    });

    console.log("state", this.state.phoneNo);
  }

  handleCallUser = () => {
    console.log("handleCallUser", this.state.phoneNo);
    this.devicFunctions();
  };

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

    // let payload = {
    //   to: "+918890378033",
    //   from: process.env.TWILIO_NUMBER,
    // };
    // Twilio.Device.connect(payload);
    // console.log("Twilio device", Twilio.Device.connect());
    Twilio.Device.disconnect(() => {
      console.log("Call ended!");
    });
  }

  async devicFunctions() {
    let dialNumber = `+${this.state.countryCode}${this.state.phoneNo}`;
    let call = await $.post("/call", { number: dialNumber });
    console.log("call details", call);
    //dial the number

    // console.log("dialNo", dialNumber);
    // console.log("Calling " + dialNumber + "...");
    // Twilio.Device.connect({ To: dialNumber });
    // dial the number
    // device.on("ready", (device) => {
    //   console.log("Twilio device ready!", device);
    // });
    // device.on("error", (error) => {
    //   console.log("Twilio device error!", error.code, error.message);
    // });
    // device.on("connect", (conn) => {
    //   console.log("Call Successfully estabilished!");
    // });
    // device.on("disconnect", (conn) => {
    //   console.log("Call ended.");
    // });
    // device.on("incoming", (conn) => {
    //   console.log("Incoming connection from", conn.parameters.From);
    // });
  }
  render() {
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
          <button className="ui primary button" onClick={this.handleCallUser}>
            Call
          </button>
          <button className="ui secondary button" onClick={this.handleDialog}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default PhoneCall;
