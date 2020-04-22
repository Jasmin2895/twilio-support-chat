import React, { Component } from "react";
import "./PhoneCall.css";

class PhoneCall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: "1",
      currentNumber: "",
      log: "Connecting...",
      muted: false,
      onPhone: false,
      countries: [
        { name: "United States", cc: "1", code: "us" },
        { name: "Great Britain", cc: "44", code: "gb" },
        { name: "Colombia", cc: "57", code: "co" },
        { name: "Ecuador", cc: "593", code: "ec" },
        { name: "Estonia", cc: "372", code: "ee" },
        { name: "Germany", cc: "49", code: "de" },
        { name: "Hong Kong", cc: "852", code: "hk" },
        { name: "Ireland", cc: "353", code: "ie" },
        { name: "Singapore", cc: "65", code: "sg" },
        { name: "Spain", cc: "34", code: "es" },
        { name: "Brazil", cc: "55", code: "br" },
        { name: "India", cc: "91", code: "br" },
      ],
      connection: null,
    };
  }
  render() {
    return (
      <div className="container">
        <form>
          <label>
            Enter your Phone Number in which you want to schedule a call
          </label>
          <input
            type="tel"
            id="phone_no"
            name="firstname"
            placeholder="Phone Number..."
          ></input>
          <div className="phone_call_submit">
            <input type="submit" value="Submit"></input>
            <button className="cancel_btn">Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default PhoneCall;
