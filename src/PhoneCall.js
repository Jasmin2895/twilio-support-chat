import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Dropdown } from "semantic-ui-react";
import { Flag, Segment } from "semantic-ui-react";
import "./PhoneCall.css";
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

  handleDialog = () => {
    this.props.closeDialog();
  };
  handleChange = (event, data) => {
    console.log("event data", event, data);
  };
  render() {
    return (
      <div className="container">
        <form>
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
              />
            </div>
            <input
              type="tel"
              id="phone_no"
              name="firstname"
              placeholder="Phone Number..."
            ></input>
          </div>
          <div className="phone_call_submit">
            <button className="ui primary button" type="submit">
              Submit
            </button>
            <button className="ui secondary button" onClick={this.handleDialog}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PhoneCall;
