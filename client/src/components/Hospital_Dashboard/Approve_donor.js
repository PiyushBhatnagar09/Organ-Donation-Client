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
import "semantic-ui-css/semantic.min.css";
import HospitalNav from "./Hospital_nav";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";
import socket from "./socket";
const token = localStorage.getItem("token");

class ApproveDonor extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    dob: "",
    age: "",
    organ: "",
    bloodgroup: "",
    aadhaarNumber: "",
    organDetails: {},
    loading: false,
    document: null,
    errMsg: "",
    successMsg: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onOrganDetailsChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      organDetails: { ...prev.organDetails, [name]: value },
    }));
  };

  handleAadhaarFetch = async () => {
    const { aadhaarNumber } = this.state;
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/donors/aadhaar/${aadhaarNumber}`
      );
      const data = response.data;
      if (data.success) {
        this.setState({
          fname: data.data.fname,
          lname: data.data.lname,
          email: data.data.email,
          organ: data.data.organ,
          bloodgroup: data.data.bloodgroup,
        });
        new Noty({
          theme: "sunset",
          text: data.message || "Donor details fetched successfully",
          type: "success",
          layout: "topRight",
          timeout: 2000,
        }).show();
      } else {
        new Noty({
          theme: "sunset",
          text: data.message || "Donor not found with provided Aadhaar",
          type: "error",
          layout: "topRight",
          timeout: 2000,
        }).show();
      }
    } catch (error) {
      const errMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Donor not found with provided Aadhaar";
      new Noty({
        theme: "sunset",
        text: errMsg,
        type: "error",
        layout: "topRight",
        timeout: 2000,
      }).show();
    }
  };

  handleDocumentUpload = async () => {
    if(this.state.document==="" || this.state.organ==="")
    {
      new Noty({
        theme: "sunset",
        text: "Document & Organ is required for parsing",
        type: "error",
        layout: "topRight",
        timeout: 2000,
      }).show();
      return;
    }
    const formData = new FormData();
    formData.append("document", this.state.document);
    formData.append("organ", this.state.organ);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/parse-medical-report`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const keyValues = res.data;
      this.setState((prev) => ({
        organDetails: { ...prev.organDetails, ...keyValues.data },
      }));

      new Noty({
        theme: "sunset",
        text: keyValues.message,
        type: "success",
        layout: "topRight",
        timeout: 2000,
      }).show();
    } catch (error) {
      const errMsg = "Document Parse Error";
      new Noty({
        theme: "sunset",
        text: errMsg,
        type: "error",
        layout: "topRight",
        timeout: 2000,
      }).show();
    }
  };

  resetForm = () => {
    this.setState({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      dob: "",
      age: "",
      organ: "",
      bloodgroup: "",
      aadhaarNumber: "",
      organDetails: {},
      loading: false,
      document: null,
      errMsg: "",
      successMsg: "",
    });
  };

  onApprove = async (e) => {
    e.preventDefault();
    const {
      fname,
      lname,
      email,
      aadhaarNumber,
      organ,
      bloodgroup,
      organDetails,
    } = this.state;

    this.setState({ loading: true, errMsg: "", successMsg: "" });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/donors/approve_donor`,
        {
          fname,
          lname,
          email,
          aadhaarNumber,
          organ,
          bloodgroup,
          organDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data;
      if (data.success) {
        new Noty({
          theme: "sunset",
          text: data.message || "Donor approved successfully",
          type: "success",
          layout: "topRight",
          timeout: 2000,
        }).show();
        this.resetForm();
      } else {
        new Noty({
          theme: "sunset",
          text: data.message || "Approval failed",
          type: "error",
          layout: "topRight",
          timeout: 2000,
        }).show();
      }

      this.resetForm();
    } catch (error) {
      const errMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Approval failed";
      new Noty({
        theme: "sunset",
        text: errMsg,
        type: "error",
        layout: "topRight",
        timeout: 2000,
      }).show();
    }
    this.setState({ loading: false });
  };

  renderOrganSpecificFields = () => {
    const { organ, organDetails } = this.state;
    if (organ === "Kidney") {
      return (
        <>
          <Form.Input
            label="Creatinine Level"
            name="creatinine"
            value={organDetails.creatinine ? organDetails.creatinine : ""}
            onChange={this.onOrganDetailsChange}
          />
          <Form.Input
            label="GFR (Glomerular Filtration Rate)"
            name="egfr"
            value={organDetails.egfr ? organDetails.egfr : ""}
            onChange={this.onOrganDetailsChange}
          />
          <Form.Input
            label="BUN (Blood Urea Nitrogen)"
            name="bun"
            value={organDetails.bun ? organDetails.bun : ""}
            onChange={this.onOrganDetailsChange}
          />
        </>
      );
    }
    if (organ === "Heart") {
      return (
        <>
          <Form.Input
            label="Cholesterol"
            name="cholesterol"
            value={organDetails.cholesterol ? organDetails.cholesterol : ""}
            onChange={this.onOrganDetailsChange}
          />
          <Form.Input
            label="HDL"
            name="hdl"
            value={organDetails.hdl ? organDetails.hdl : ""}
            onChange={this.onOrganDetailsChange}
          />
          <Form.Input
            label="LDL"
            name="ldl"
            value={organDetails.ldl ? organDetails.ldl : ""}
            onChange={this.onOrganDetailsChange}
          />
        </>
      );
    }
    if (organ === "Liver") {
      return (
        <>
          <Form.Input
            label="ALT Level"
            name="alt"
            value={organDetails.alt ? organDetails.alt : ""}
            onChange={this.onOrganDetailsChange}
          />
          <Form.Input
            label="AST Level"
            name="ast"
            value={organDetails.ast ? organDetails.ast : ""}
            onChange={this.onOrganDetailsChange}
          />
          <Form.Input
            label="ALP Level"
            name="alp"
            value={organDetails.alp ? organDetails.alp : ""}
            onChange={this.onOrganDetailsChange}
          />
        </>
      );
    }
    return null;
  };

  componentDidMount() {
    // 🔐 Redirect to login page if not authenticated
    if (!localStorage.getItem("isAuthenticated")) {
      window.location.href = "/Hospital_login";
      return;
    }
    
    socket.on("connect", () => {
      console.log("✅ Socket reconnected on this page:", socket.id);
    });

    socket.on("new-transplants", (msg) => {
      // console.log("🎉 Event catched:", msg);
      this.showNotification(msg);
    });
  }

  componentWillUnmount() {
    socket.off("new-transplants");
    socket.off("connect");
  }

  showNotification = (message) => {
    new Noty({
      theme: "sunset",
      text: message || "🧬 New transplant matched successfully!",
      type: "success",
      layout: "topRight",
      timeout: 2000,
    }).show();
  };

  render() {
    return (
      <>
        <HospitalNav />
        <div class="main-content">
          <Grid centered columns={2} style={{ marginTop: "20px" }}>
            <Grid.Column width={8}>
              <Segment>
                <Header as="h3" color="grey" textAlign="center">
                  Approve Donor
                </Header>
                <Divider />
                <Form onSubmit={this.onApprove}>
                  <Form.Input
                    name="aadhaarNumber"
                    label="Aadhaar Number"
                    placeholder="Enter Aadhaar Number"
                    value={this.state.aadhaarNumber}
                    onChange={this.onChange}
                    required
                  />
                  <Button onClick={this.handleAadhaarFetch} type="button" fluid>
                    Fetch Donor Info
                  </Button>
                  <br />
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
                  <Form.Input
                    name="email"
                    label="Email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                  <Form.Input
                    name="bloodgroup"
                    label="Blood Group"
                    type="text"
                    value={this.state.bloodgroup}
                    onChange={this.onChange}
                    required
                  />
                  <Form.Input
                    name="organ"
                    label="Organ"
                    value={this.state.organ}
                    onChange={this.onChange}
                    required
                  />
                  {this.renderOrganSpecificFields()}

                  <Form.Field>
                    <label>Upload Medical Report to Auto-fill</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) =>
                        this.setState({ document: e.target.files[0] })
                      }
                    />
                    <Button
                      type="button"
                      onClick={this.handleDocumentUpload}
                      fluid
                    >
                      Auto-fill from Report
                    </Button>
                  </Form.Field>

                  <Segment basic textAlign="center">
                    <Button loading={this.state.loading} positive type="submit">
                      Approve
                    </Button>
                  </Segment>

                  {this.state.successMsg ? (
                    <Message
                      positive
                      header="Success"
                      content={this.state.successMsg}
                    />
                  ) : this.state.errMsg ? (
                    <Message
                      negative
                      header="Error"
                      content={this.state.errMsg}
                    />
                  ) : null}
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </>
    );
  }
}

export default ApproveDonor;
