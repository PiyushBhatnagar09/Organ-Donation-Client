import React, { useState, useEffect } from "react";
import "./styles.css";

import Noty from "noty";
import "noty/lib/noty.css"; // Default CSS
import "noty/lib/themes/sunset.css";

function TransplantMatches() {
  const [successfulTransplants, setSuccessfulTransplants] = useState([]);

  useEffect(() => {
    const fetchTransplantData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/transplants`); // Adjust the endpoint if needed (e.g., `/api/transplants`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const successfulTransplantsData = data.data.map((transplant) => ({
          donor: transplant.donor,
          recipient: transplant.recipient,
          timestamp: new Date(transplant.date).getTime(), // Convert date to timestamp
          status: transplant.status
        }));
        setSuccessfulTransplants(successfulTransplantsData);
      } catch (error) {
        new Noty({
          theme: "sunset",
          text: error.message || "Error fetching data from backend",
          type: "error", // 'alert', 'success', 'error', 'warning', 'info'
          layout: "topRight", // Position on the screen
          timeout: 2000,
        }).show();
        console.error("Error fetching data from backend:", error);
      }
    };

    fetchTransplantData();
  }, []);

  return (
    <div className="section">
      <h2>Transplant Matches</h2>
      <table>
        <thead>
          <tr>
            <th>Donor Aadhaar Number</th>
            <th>Recipient Aadhaar Number</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {successfulTransplants.length > 0 ? (
            successfulTransplants.map((transplant, index) => (
              <tr key={index}>
                <td data-label="Donor Address">
                  <div className="scrollable-text">{transplant.donor.aadhaarnumber}</div>
                </td>
                <td data-label="Recipient Address">
                  <div className="scrollable-text">{transplant.recipient.aadhaarnumber}</div>
                </td>
                <td data-label="Date">{new Date(transplant.timestamp).toLocaleString()}</td>
                <td data-label="Status">{transplant.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No successful transplants yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransplantMatches;
