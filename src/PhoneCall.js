import React, { Component } from "react";
import "./PhoneCall.css";

class PhoneCall extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <form>
          <label>
            Enter your Phone Number in which you want to schedule task:
          </label>
          <input
            type="tel"
            id="phone_no"
            name="firstname"
            placeholder="Phone Number..."
          ></input>
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}

export default PhoneCall;
