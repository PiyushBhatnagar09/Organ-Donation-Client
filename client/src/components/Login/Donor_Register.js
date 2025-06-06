import "./styles.css";
import Top from "../Navbar/Top";
import React, { Component } from "react";
import axios from "axios";
import { Message } from "semantic-ui-react";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";

class DonorRegister extends Component {
  state = {
    fname: "",
    lname: "",
    dob: "",
    gender: "",
    city: "",
    phone: "",
    email: "",
    bloodgroup: "",
    organ: "",
    pass: "",
    aadhaarnumber: "",
    errMsg: ""
  };

  onSubmit = (event) => {
    event.preventDefault();

    const donor = { ...this.state };

    if (donor.aadhaarnumber.length !== 12) {
      new Noty({
        theme: "sunset",
        text: "Aadhaar Number must be exactly 12 digits",
        type: "error",
        layout: "topRight",
        timeout: 2000,
      }).show();
      return;
    }

    // Clear previous error message
    this.setState({ errMsg: "" });

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/donors/`, donor)
      .then((res) => {
        // Assuming backend sends { message: "some success message" }
        const successMsg = res.data?.message || "Donor registered successfully";

        new Noty({
          theme: "sunset",
          text: successMsg,
          type: "success",
          layout: "topRight",
          timeout: 2000,
        }).show();

        // Redirect after short delay to allow user to see notification
        setTimeout(() => {
          window.location = "/Hospital_list";
        }, 1500);
      })
      .catch((err) => {
        // Extract error message safely
        const errorMsg =
          err.response?.data?.message ||
          err.message ||
          "An error occurred during registration";

        this.setState({ errMsg: errorMsg });

        new Noty({
          theme: "sunset",
          text: errorMsg,
          type: "error",
          layout: "topRight",
          timeout: 3000,
        }).show();
      });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errMsg } = this.state;

    return (
      <>
        <Top />
        <div className="donor-signup-container">
          <div className="donor-image-section">{/* You can add an image here */}</div>

          <div className="donor-form-section">
            <h2 className="form-title">Donor Registration Form</h2>
            <form onSubmit={this.onSubmit} className="donor-form">
              <label>First Name</label>
              <input
                type="text"
                name="fname"
                value={this.state.fname}
                onChange={this.onChange}
                required
              />

              <label>Last Name</label>
              <input
                type="text"
                name="lname"
                value={this.state.lname}
                onChange={this.onChange}
                required
              />

              <label>Gender</label>
              <select
                name="gender"
                value={this.state.gender}
                onChange={this.onChange}
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Other</option>
              </select>

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />

              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={this.state.phone}
                onChange={this.onChange}
                required
              />

              <label>City</label>
              <select
                name="city"
                value={this.state.city}
                onChange={this.onChange}
                required
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

              <label>Aadhaar Number</label>
              <input
                type="text"
                name="aadhaarnumber"
                value={this.state.aadhaarnumber}
                onChange={this.onChange}
                required
                maxLength={12}
                pattern="\d{12}"
                title="Please enter exactly 12 digits"
              />

              <label>Blood Group</label>
              <select
                name="bloodgroup"
                value={this.state.bloodgroup}
                onChange={this.onChange}
                required
              >
                <option value="" disabled>
                  Select a Blood Type
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

              <label>Organ to Donate</label>
              <select
                name="organ"
                value={this.state.organ}
                onChange={this.onChange}
                required
              >
                <option value="" disabled>
                  Select Organ
                </option>
                <option value="Eyes">Eyes</option>
                <option value="Heart">Heart</option>
                <option value="Lungs">Lungs</option>
                <option value="Liver">Liver</option>
                <option value="Pancreas">Pancreas</option>
                <option value="Kidney">Kidney</option>
              </select>

              <input className="submit-btn" type="submit" value="Register" />

              {errMsg && errMsg.length > 0 && (
                <Message error header="Oops!!" content={errMsg} />
              )}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default DonorRegister;
