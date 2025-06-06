import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Button, Segment, Message } from 'semantic-ui-react';
import Hospital_nav from './Hospital_nav';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/sunset.css';
import socket from "./socket";

const token = localStorage.getItem("token");

class TransplantMatch extends Component {
  state = {
    loading: false,
    message: "",
    error: "",
    isRunning: false,
  };

  handleMatch = async () => {
    this.setState({ loading: true, message: "", error: "" });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/transplants`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.message) {
        this.setState({ message: response.data.message, error: "" });

        new Noty({
          theme: 'sunset',
          text: response.data.message,
          type: 'success',
          layout: 'topRight',
          timeout: 2000,
        }).show();
      } else {
        this.setState({ error: "No response message from server.", message: "" });
      }
    } catch (err) {
      console.error("Error during transplant match:", err);

      const errorText = err.response?.data?.message || err.message || "Internal Server Error";
      this.setState({ error: errorText, message: "" });

      new Noty({
        theme: 'sunset',
        text: errorText,
        type: 'error',
        layout: 'topRight',
        timeout: 2000,
      }).show();
    }

    this.setState({ loading: false });
  };

  componentDidMount() {
    socket.on("connect", () => {
      console.log("✅ Socket reconnected on this page:", socket.id);
    });

    // Live notification when new transplants are made
    socket.on("new-transplants", (msg) => {
      // console.log("🎉 Event caught:", msg);
      this.showNotification(msg);
    });

    // Listen for matching status
    socket.on("transplant-status", ({ running }) => {
      this.setState({ isRunning: running });

      if (running) {
        new Noty({
          theme: "sunset",
          text: "⚠️ Transplant matching algorithm is currently running.",
          type: "warning",
          layout: "topRight",
          timeout: 3000,
        }).show();
      } else {
        new Noty({
          theme: "sunset",
          text: "✅ Transplant matching algorithm has completed.",
          type: "success",
          layout: "topRight",
          timeout: 2000,
        }).show();
      }
    });
  }

  componentWillUnmount() {
    socket.off("new-transplants");
    socket.off("transplant-status");
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
    const { loading, message, error, isRunning } = this.state;

    return (
      <div>
        <Hospital_nav />
        <Grid centered style={{ marginTop: "30px" }}>
          <Grid.Column width={10}>
            <Message info>
              <Message.Header>Optimized Transplant Matching System</Message.Header>
              <p>
                The transplant match process uses a heap and organ-blood group bucketing logic in the backend to ensure faster and fairer allocations.
              </p>
            </Message>

            <Segment textAlign="center">
              <Button
                loading={loading}
                positive
                disabled={isRunning}
                onClick={this.handleMatch}
              >
                {isRunning ? "Matching In Progress..." : "Run Transplant Match"}
              </Button>
            </Segment>

            {message && (
              <Message positive>
                <Message.Header>Success</Message.Header>
                <p>{message}</p>
              </Message>
            )}

            {error && (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{error}</p>
              </Message>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default TransplantMatch;
