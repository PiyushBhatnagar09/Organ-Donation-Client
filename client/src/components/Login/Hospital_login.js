import React, { Component } from "react";
import axios from "axios";
import Top2 from "../Navbar/Top2";
import "./styles.css";
import { Message } from "semantic-ui-react";

import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

class HospitalLogin extends Component {
  state = {
    username: "AIIMS_Delhi",
    password: "1234",
    errMsg: "",
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({ errMsg: "" });

    const { username, password } = this.state;
    const user = { username, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/hospitals/login`, user)
      .then((res) => {
        // Assuming backend returns { success: true, token: "...", message: "Hospital Login Successful" }
        const message = res.data.message || "Hospital Login Successful";

        new Noty({
          theme: "sunset",
          text: message,
          type: "success",
          layout: "topRight",
          timeout: 2000,
        }).show();

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("token", res.data.token);

        window.location = "/Main_page";
      })
      .catch((error) => {
        // Extract meaningful message from backend error response
        let errorMsg = "An error occurred";

        if (error.response && error.response.data && error.response.data.message) {
          errorMsg = error.response.data.message;
        } else if (error.message) {
          errorMsg = error.message;
        }

        this.setState({ errMsg: errorMsg });

        new Noty({
          theme: "sunset",
          text: errorMsg,
          type: "error",
          layout: "topRight",
          timeout: 2000,
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
        <Top2 />
        <section className="hospital_login">
          <div
            className="px-4 py-5 px-md-5 text-center text-lg-start"
            style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
          >
            <div className="container">
              <div className="row gx-lg-5 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <h1 className="my-5 display-3 fw-bold ls-tight">
                    <span className="form-title">Hospital Login</span>
                  </h1>
                  <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                    "Organ donation is a profound act of compassion, generosity,
                    and humanity. By choosing to become an organ donor, we offer
                    the invaluable gift of life to others. This selfless decision
                    is an expression of care and empathy, leaving behind a legacy
                    of hope and healing. It provides a second chance for those in
                    need, igniting new beginnings and the possibility of a
                    brighter future for countless individuals."
                  </p>
                </div>

                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="card">
                    <div className="card-body py-5 px-md-5">
                      <form
                        className="donor-form"
                        onSubmit={this.onSubmit}
                        error={!!errMsg}
                      >
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChange}
                            required
                          />
                          <label className="form-label" htmlFor="username">
                            Username
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChange}
                            required
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4 submit-btn"
                        >
                          Login
                        </button>
                      </form>

                      {errMsg && errMsg.length > 0 && (
                        <Message error header="Oops!!" content={errMsg} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default HospitalLogin;
