import React, { Component } from "react";
import {
  Grid,
  Form,
  Segment,
  Header,
  Button,
  Divider,
  Message,
} from "semantic-ui-react";
import axios from "axios";
import Hospital_nav from "./Hospital_nav";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";
import "../Login/styles.css";
import socket from "./socket";
const token = localStorage.getItem("token");

class RegisterRecipient extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    severity: 0,
    organ: "",
    bloodgroup: "",
    aadhaarNumber: "",
    loading: false,
    document: null,
    errMsg: "",
    successMsg: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onRegister = async (e) => {
    e.preventDefault();
    const {
      fname,
      lname,
      email,
      phone,
      gender,
      city,
      aadhaarNumber,
      organ,
      bloodgroup,
      severity,
    } = this.state;

    this.setState({ loading: true, errMsg: "", successMsg: "" });
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/recipients/`,
        {
          fname,
          lname,
          email,
          aadhaarNumber,
          organ,
          bloodgroup,
          phone,
          gender,
          city,
          severity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      new Noty({
        theme: "sunset",
        text: "Recipient registered successfully",
        type: "success",
        layout: "topRight",
        timeout: 2000,
      }).show();

      this.resetForm();
    } catch (error) {
      console.error(error);

      // Extract error message safely from backend response
      const errMsg = "Failed to register recipient";

      new Noty({
        theme: "sunset",
        text: errMsg,
        type: "error",
        layout: "topRight",
        timeout: 2000,
      }).show();

      this.setState({ errMsg });
    }
    this.setState({ loading: false });
  };

  resetForm = () => {
    this.setState({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      gender: "",
      city: "",
      severity: 0,
      organ: "",
      bloodgroup: "",
      aadhaarNumber: "",
      loading: false,
      document: null,
      errMsg: "",
      successMsg: "",
    });
  };

  componentDidMount() {
    socket.on("connect", () => {
      console.log("✅ Socket reconnected on this page:", socket.id);
    });

    socket.on("new-transplants", (msg) => {
      // console.log("🎉 Event caught:", msg);
      this.showNotification(msg);
    });
  }

  componentWillUnmount() {
    socket.off("new-transplants");
    socket.off("connect");
  }

  showNotification = (message) => {
    // If message is an object, try to stringify or get a property
    let displayMsg = "🧬 New transplant matched successfully!";
    if (typeof message === "string") {
      displayMsg = message;
    } else if (message && typeof message === "object") {
      displayMsg =
        message.message ||
        JSON.stringify(message).slice(0, 100) || // limit length
        displayMsg;
    }

    new Noty({
      theme: "sunset",
      text: displayMsg,
      type: "success",
      layout: "topRight",
      timeout: 2000,
    }).show();
  };

  render() {
    return (
      <>
        <Hospital_nav />
        <Grid centered columns={2} style={{ marginTop: "20px" }}>
          <Grid.Column width={8}>
            <Segment>
              <Header as="h3" color="grey" textAlign="center">
                Register Recipient
              </Header>
              <Divider />
              <Form onSubmit={this.onRegister}>
                <Form.Input
                  name="aadhaarNumber"
                  label="Aadhaar Number"
                  placeholder="Enter Aadhaar Number"
                  value={this.state.aadhaarNumber}
                  onChange={this.onChange}
                  required
                />
                <Form.Input
                  name="fname"
                  label="First Name"
                  value={this.state.fname}
                  onChange={this.onChange}
                  required
                />
                <Form.Input
                  name="lname"
                  label="Last Name"
                  value={this.state.lname}
                  onChange={this.onChange}
                  required
                />

                <Form.Field required>
                  <label style={{ fontWeight: "bold" }}>Gender</label>
                  <select
                    name="gender"
                    value={this.state.gender}
                    onChange={this.onChange}
                    className="ui dropdown"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Other</option>
                  </select>
                </Form.Field>

                <Form.Field required>
                  <label style={{ fontWeight: "bold" }}>City</label>
                  <select
                    name="city"
                    value={this.state.city}
                    onChange={this.onChange}
                    className="ui dropdown"
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </Form.Field>

                <Form.Input
                  name="phone"
                  label="Phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  required
                />
                <Form.Input
                  name="email"
                  label="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
                <Form.Field required>
                  <label style={{ fontWeight: "bold" }}>Organ</label>
                  <select
                    name="organ"
                    value={this.state.organ}
                    onChange={this.onChange}
                    className="ui dropdown"
                  >
                    <option value="" disabled>
                      Select Organ
                    </option>
                    <option value="Kidney">Kidney</option>
                    <option value="Liver">Liver</option>
                    <option value="Heart">Heart</option>
                  </select>
                </Form.Field>
                <Form.Field required>
                  <label style={{ fontWeight: "bold" }}>Blood Group</label>
                  <select
                    name="bloodgroup"
                    value={this.state.bloodgroup}
                    onChange={this.onChange}
                    className="ui dropdown"
                  >
                    <option value="" disabled>
                      Select Blood Group
                    </option>
                    <option value="A-">A-</option>
                    <option value="A+">A+</option>
                    <option value="B-">B-</option>
                    <option value="B+">B+</option>
                    <option value="AB-">AB-</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                    <option value="O+">O+</option>
                  </select>
                </Form.Field>
                <Form.Input
                  name="severity"
                  label="Severity (0 to 10)"
                  type="number"
                  min="0"
                  max="10"
                  value={this.state.severity}
                  onChange={this.onChange}
                  required
                />

                <Segment basic textAlign="center">
                  <Button loading={this.state.loading} positive type="submit">
                    Register
                  </Button>
                </Segment>

                {this.state.successMsg && (
                  <Message
                    positive
                    header="Success"
                    content={this.state.successMsg}
                  />
                )}
                {this.state.errMsg && (
                  <Message
                    negative
                    header="Error"
                    content={this.state.errMsg}
                  />
                )}
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}

export default RegisterRecipient;
