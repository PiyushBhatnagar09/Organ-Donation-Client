import React, { useState, useEffect } from "react";
import "./styles.css";

import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";

function Recipients_List(props) {
  const [matchFoundRecipients, setMatchFoundRecipients] = useState([]);

  useEffect(() => {
    const fetchRecipientData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/recipients`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Assuming the response returns an array of recipients
        const matchFoundRecipientsData = data.data
          .map((recipient) => ({
            aadhaarnumber: recipient.aadhaarnumber,
            organ: recipient.organ,
            bloodgroup: recipient.bloodgroup,
            matchFound: recipient.matchFound,
            active: recipient.active
          }));

        setMatchFoundRecipients(matchFoundRecipientsData);
      } catch (error) {
        new Noty({
          theme: 'sunset',
          text: error.message,
          type: "error", // 'alert', 'success', 'error', 'warning', 'info'
          layout: "topRight", // Position on the screen
          timeout: 2000,
        }).show();
        console.error("Error fetching recipient data:", error);
      }
    };

    fetchRecipientData();
  }, []);

  return (
    <div className="section">
      <h2>Active Recipients</h2>
      <table>
        <thead>
          <tr>
            <th>Aadhaar Number</th>
            <th>Organ</th>
            <th>Blood Group</th>
            <th>Active</th>
            <th>Match Found</th>
          </tr>
        </thead>
        <tbody>
          {matchFoundRecipients.length > 0 ? (
            matchFoundRecipients.map((recipient, index) => (
              <tr key={index}>
                <td data-label="Recipient Aadhaar Number">
                  <div className="scrollable-text">{recipient.aadhaarnumber}</div>
                </td>
                <td data-label="Organ">{recipient.organ}</td>
                <td data-label="Bloodgroup">{recipient.bloodgroup}</td>
                <td data-label="Active">{recipient.active ? "Yes" : "No"}</td>
                <td data-label="MatchFound">{recipient.matchFound ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No recipients with match found false</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Recipients_List;
