import React, { useState, useEffect } from "react";
import "./donatemoney.css";

import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";

function Product() {
  const [donorName, setDonorName] = useState("User1");
  const [donationAmount, setDonationAmount] = useState(10);
  const [donorList, setDonorList] = useState([]);

  const amount = donationAmount * 100; // Converting amount to paise for Razorpay
  const currency = "INR";
  const receiptId = "qwsaq1";

  useEffect(() => {
    fetchDonorNames();
  }, []);

  const fetchDonorNames = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/moneydonor/list`
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        setDonorList(json.data || []);
      } else {
        new Noty({
          theme: "sunset",
          text: json.message || "Failed to fetch donors",
          type: "error",
          layout: "topRight",
          timeout: 3000,
        }).show();
      }
    } catch (error) {
      new Noty({
        theme: "sunset",
        text: "Error fetching donor names",
        type: "error",
        layout: "topRight",
        timeout: 3000,
      }).show();
      console.error("Error fetching donor names:", error);
    }
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/moneydonor/order`,
        {
          method: "POST",
          body: JSON.stringify({
            amount,
            currency,
            receipt: receiptId,
            donorName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const order = await response.json();

      if (!order.success) {
        new Noty({
          theme: "sunset",
          text: order.message || "Failed to create order",
          type: "error",
          layout: "topRight",
          timeout: 3000,
        }).show();
        return;
      }

      var options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount,
        currency,
        name: "Piyush Bhatnagar",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.data.id, // Adjust if your order ID is inside data.id
        handler: async function (response) {
          const body = {
            ...response,
          };

          const validateRes = await fetch(
            `${process.env.REACT_APP_API_URL}/api/moneydonor/order/validate`,
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const jsonRes = await validateRes.json();

          if (jsonRes.success) {
            new Noty({
              theme: "sunset",
              text: jsonRes.message || "Payment validated successfully",
              type: "success",
              layout: "topRight",
              timeout: 3000,
            }).show();

            // Optionally refresh donor list
            fetchDonorNames();
          } else {
            new Noty({
              theme: "sunset",
              text: jsonRes.message || "Payment validation failed",
              type: "error",
              layout: "topRight",
              timeout: 3000,
            }).show();
          }
        },
        prefill: {
          name: "Test Customer1",
          email: "customer@example.com",
          contact: "900000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        new Noty({
          theme: "sunset",
          text: response.error.reason || "Payment failed, please try again.",
          type: "error",
          layout: "topRight",
          timeout: 3000,
        }).show();
      });

      rzp1.open();
    } catch (err) {
      new Noty({
        theme: "sunset",
        text: "Error processing payment. Please try again.",
        type: "error",
        layout: "topRight",
        timeout: 3000,
      }).show();
      console.error("Error in paymentHandler:", err);
    }
  };

  return (
    <>
      <div
        id="donate-money"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "15px",
          paddingTop: "20px",
          margin: "0 auto",
        }}
      >
        <h2>
          "Every penny donated is a step closer to healing, a gesture of hope
          for those in need."
        </h2>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "20%",
            minWidth: "200px",
            maxWidth: "40%",
          }}
        >
          <img
            src="https://moneyfcu.org/wp-content/uploads/2017/12/donation-jar.jpg"
            alt="Donation Jar"
            style={{
              borderRadius: "20%",
              width: "100%",
              height: "auto",
              objectFit: "contain",
              margin: "0px",
              paddingLeft: "15px",
            }}
          />
        </div>
        <div style={{ padding: "15px", width: "100%" }}>
          <form
            onSubmit={paymentHandler}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="donorName">Your Name:</label>
            <input
              type="text"
              id="donorName"
              value={donorName}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "15px",
                width: "20%",
              }}
              onChange={(e) => setDonorName(e.target.value)}
              required
            />

            <label htmlFor="donationAmount">Donation Amount (INR):</label>
            <input
              type="number"
              id="donationAmount"
              value={donationAmount}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "15px",
                width: "20%",
              }}
              onChange={(e) => setDonationAmount(e.target.value)}
              required
            />

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#FF5733",
                color: "white",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF8C69")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF5733")}
            >
              DONATE
            </button>
          </form>
        </div>
      </div>

      <h2 id="money-donor-heading">Our Donors</h2>
      <div
        id="myCarousel"
        className="carousel slide"
        data-ride="carousel"
        data-interval="3000"
      >
        <div className="carousel-inner">
          {donorList &&
            donorList.map((donor, index) => (
              <div
                key={donor._id || index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                {donor.name}
              </div>
            ))}
        </div>
      </div>
      <br />
    </>
  );
}

export default Product;
