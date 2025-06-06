import { Component } from "react";
import Top from "../Navbar/Top";
import "./styles.css";
import "react-bootstrap";
import "./card.css";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";

class UserMedicalInfo extends Component {
  state = {
    aadhaarNumber: "",
    organ: "",
    bloodgroup: "",
    matchfound: false,
    active: false,
    approved: false,
    userType: "Donor",
  };

  onSubmit = async (event) => {
    event.preventDefault();

    if (this.state.aadhaarNumber.length !== 12) {
      new Noty({
        theme: "sunset",
        text: "Enter valid Aadhaar Number",
        type: "error",
        layout: "topRight",
        timeout: 2000,
      }).show();
      return;
    }

    try {
      const endpoint =
        this.state.userType.toLowerCase() === "recipient"
          ? "recipients"
          : "donors";

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/${endpoint}/aadhaar/${this.state.aadhaarNumber}`
      );

      if (!response.ok) {
        // Backend returned an error status
        throw new Error(
          `${this.state.userType} with Aadhaar Number ${this.state.aadhaarNumber} not found`
        );
      }

      const data = await response.json();

      // Assuming backend sends: { organ, bloodgroup, matchFound, active, approved }
      this.setState({
        organ: data.data.organ || "",
        bloodgroup: data.data.bloodgroup || "",
        matchfound: data.data.matchFound || false,
        active: data.data.active || false,
        approved: data.data.approved || false,
      });

      new Noty({
        theme: "sunset",
        text: `${this.state.userType} details loaded successfully`,
        type: "success",
        layout: "topRight",
        timeout: 2000,
      }).show();
    } catch (error) {
      new Noty({
        theme: "sunset",
        text: error.message || `${this.state.userType} not found`,
        type: "error",
        layout: "topRight",
        timeout: 2000,
      }).show();

      this.setState({
        organ: "",
        bloodgroup: "",
        matchfound: false,
        active: false,
        approved: false,
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "userType") {
      this.setState({
        organ: "",
        bloodgroup: "",
        matchfound: false,
        active: false,
        approved: false,
        [name]: value,
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    const {
      aadhaarNumber,
      organ,
      bloodgroup,
      matchfound,
      active,
      approved,
      userType,
    } = this.state;

    return (
      <>
        <Top />
        <section
          className="hospital_login"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div className="px-4 py-5 px-md-5 text-center text-lg-start">
            <div className="container">
              <div className="row gx-lg-5 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <h1 className="display-3 fw-bold ls-tight">
                    <span className="form-title">Check User Details</span>
                  </h1>
                  <p
                    style={{ color: "hsl(217, 10%, 50.8%)", textAlign: "center" }}
                  >
                    "Organ donation is the ultimate act of kindness. It
                    transformed my life when I needed it most."
                  </p>
                </div>

                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="card">
                    <div className="card-body py-5 px-md-5">
                      <form className="donor-form" onSubmit={this.onSubmit}>
                        <div className="form-outline mb-4">
                          <label className="form-label">User Type</label>
                          <select
                            className="form-control"
                            name="userType"
                            value={userType}
                            onChange={this.handleChange}
                          >
                            <option value="Donor">Donor</option>
                            <option value="Recipient">Recipient</option>
                          </select>
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="aadhaarNumber">
                            Aadhaar Number
                          </label>
                          <input
                            type="text"
                            id="aadhaarNumber"
                            name="aadhaarNumber"
                            className="form-control"
                            value={aadhaarNumber}
                            onChange={this.handleChange}
                            required
                            maxLength={12}
                            pattern="\d{12}"
                            title="Enter a valid 12-digit Aadhaar number"
                          />
                        </div>

                        <button type="submit" className="submit-btn">
                          Check
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {(organ && bloodgroup) && (
          <div
            className="alert alert col-md donor_id mx-auto"
            role="alert"
            style={{ maxWidth: "600px" }}
          >
            <h4 className="alert-heading">{userType} Information</h4>
            <div className="card">
              <div className="card-body mx-auto">
                <h3 className="card-subtitle mb-2">Organ: {organ}</h3>
                <h3 className="card-subtitle mb-2">Blood Group: {bloodgroup}</h3>
                {userType === "Donor" && (
                  <h3 className="card-subtitle mb-2">
                    Approved: {approved ? "Yes" : "No"}
                  </h3>
                )}
                <h3 className="card-subtitle mb-2">
                  Match Found: {matchfound ? "Yes" : "No"}
                </h3>
                <h3 className="card-subtitle mb-2">
                  Active: {active ? "Yes" : "No"}
                </h3>
              </div>
            </div>
          </div>
        )}
        <br />
        <br />
      </>
    );
  }
}

export default UserMedicalInfo;
