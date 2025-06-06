import React, { useState, useEffect } from "react";
import "./styles.css";

import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";

function Donors_List(props) {
  const [activeDonors, setActiveDonors] = useState([]);

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/donors`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Assuming the response returns an array of active donors
        const activeDonorsData = data.data.map((donor) => ({
          aadhaarnumber: donor.aadhaarnumber,
          organ: donor.organ,
          bloodgroup: donor.bloodgroup,
          matchFound: donor.matchFound,
          approved: donor.approved,
          active: donor.active
        }));

        setActiveDonors(activeDonorsData);
      } catch (error) {
        new Noty({
          theme: 'sunset',
          text: error.message,
          type: "error", // 'alert', 'success', 'error', 'warning', 'info'
          layout: "topRight", // Position on the screen
          timeout: 2000,
        }).show();
        console.error("Error fetching donor data:", error);
      }
    };

    fetchDonorData();
  }, []);

  return (
    <div className="section">
      <h2>Active Donors</h2>
      <table>
        <thead>
          <tr>
            <th>Donor Aadhaar Number</th>
            <th>Organ</th>
            <th>Blood Group</th>
            <th>Approved</th>
            <th>Active</th>
            <th>Match Found</th>
          </tr>
        </thead>
        <tbody>
          {activeDonors.length > 0 ? (
            activeDonors.map((donor, index) => (
              <tr key={index}>
                <td data-label="Donor Aadhaar Number">
                  <div className="scrollable-text">{donor.aadhaarnumber}</div>
                </td>
                <td data-label="Organ">{donor.organ}</td>
                <td data-label="Bloodgroup">{donor.bloodgroup}</td>
                <td data-label="Approved">{donor.approved ? "Yes" : "No"}</td>
                <td data-label="Active">{donor.active ? "Yes" : "No"}</td>
                <td data-label="MatchFound">{donor.matchFound ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No active donors available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Donors_List;
