import React, { useEffect, useState } from "react";
import axios from "axios";
import HospitalNav from "./Hospital_nav";
import socket from "./socket";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";

const styles = {
  dashboardContainer: {
    display: "flex",
    justifyContent: "space-around",
    padding: "40px 10%",
    gap: "30px",
    flexWrap: "wrap",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  column: {
    flex: "1 1 300px",
    borderRadius: "16px",
    padding: "20px",
    background: "linear-gradient(to bottom, #ffffff, #f9f9f9)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.2s ease-in-out",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "1.8rem",
    fontWeight: "700",
    borderBottom: "2px solid #ccc",
    paddingBottom: "10px",
  },
  searchInput: {
    width: "100%",
    padding: "10px 14px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  list: {
    maxHeight: "450px",
    overflowY: "auto",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.2s",
    lineHeight: "1.6",
  },
  cardBold: {
    fontWeight: "700",
    fontSize: "1.25rem",
    color: "#2c3e50",
    marginBottom: "6px",
  },
  cardDetail: {
    fontSize: "1rem",
    marginBottom: "4px",
    color: "#555",
  },
  button: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#2185d0",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  buttonInactive: {
    backgroundColor: "#db2828",
  },
  cardSubtitle: {
    fontSize: "1.05rem",
    color: "#16a085",
    marginBottom: "8px",
    fontWeight: "500",
  },
  cardInfo: {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: "6px",
  },
  statusActive: {
    color: "#2ecc71",
    fontWeight: "600",
  },
  statusInactive: {
    color: "#e74c3c",
    fontWeight: "600",
  },
};

const Dashboard = () => {
  const [donors, setDonors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [transplants, setTransplants] = useState([]);

  const [searchDonor, setSearchDonor] = useState("");
  const [searchRecipient, setSearchRecipient] = useState("");
  const [searchTransplant, setSearchTransplant] = useState("");
  const token = localStorage.getItem("token");

  const toggleDonorStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/donors/${id}/status`, { active: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      fetchAllData();
      new Noty({
        theme: "sunset",
        text: `Donor marked ${newStatus ? "Active" : "Inactive"}`,
        type: "success",
        timeout: 3000,
      }).show();
    } catch (err) {
      console.error(err);
      new Noty({
        theme: "sunset",
        text: err.response.data.message,
        type: "error",
        timeout: 3000,
      }).show();
    }
  };

  const toggleRecipientStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/recipients/${id}/status`, { active: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      fetchAllData();
      new Noty({
        theme: "sunset",
        text: `Recipient marked ${newStatus ? "Active" : "Inactive"}`,
        type: "success",
        timeout: 3000,
      }).show();
    } catch (err) {
      console.error(err);
      new Noty({
        theme: "sunset",
        text: err.response.data.message,
        type: "error",
        timeout: 3000,
      }).show();
    }
  };

  const toggleTransplantStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/transplants/${id}/status`, { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      fetchAllData();
      new Noty({
        theme: "sunset",
        text: `Transplant status updated to "${newStatus}"`,
        type: "success",
        timeout: 3000,
      }).show();
    } catch (err) {
      console.error("Failed to update transplant status", err);
      new Noty({
        theme: "sunset",
        text: err.response.data.message,
        type: "error",
        timeout: 3000,
      }).show();
    }
  };

  const fetchAllData = async () => {
    try {
      const [dRes, rRes, tRes] = await Promise.all([
        axios.get("/api/donors"),
        axios.get("/api/recipients"),
        axios.get("/api/transplants"),
      ]);
      setDonors(dRes.data.data);
      setRecipients(rRes.data.data);
      setTransplants(tRes.data.data);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const filterData = (data, aadhaar) =>
    aadhaar.trim() === ""
      ? data
      : data.filter((d) => d.aadhaarnumber?.includes(aadhaar));

  const filterTransplants = (data, aadhaar) => {
    if (aadhaar.trim() === "") return data;
    return data.filter((t) => {
      const donorAadhaar = t.donor?.aadhaarnumber || "";
      const recipientAadhaar = t.recipient?.aadhaarnumber || "";
      return donorAadhaar.includes(aadhaar) || recipientAadhaar.includes(aadhaar);
    });
  };

  const capitalize = (s) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";

  // Updated notification function based on backend response format
  const showNotification = (msg) => {
    // msg could be string or object with message property
    let text = "";
    if (typeof msg === "string") {
      text = msg;
    } else if (msg && typeof msg === "object") {
      text = msg.message || JSON.stringify(msg);
    } else {
      text = "New transplant event received";
    }

    new Noty({
      theme: "sunset",
      text,
      type: "info",
      timeout: 4000,
      progressBar: true,
      layout: "topRight",
    }).show();
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("new-transplants", (msg) => {
      // console.log("🎉 Event caught:", msg);
      showNotification(msg);
      fetchAllData(); // Optionally refresh the data on new transplant event
    });

    return () => {
      socket.off("new-transplants");
      socket.off("connect");
    };
  }, []);

  return (
    <div>
      <HospitalNav />
      <div style={styles.dashboardContainer}>
        {/* Donors Column */}
        <div style={styles.column}>
          <h2 style={styles.heading}>Donors</h2>
          <input
            type="text"
            placeholder="Search by Aadhaar"
            value={searchDonor}
            onChange={(e) => setSearchDonor(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.list}>
            {filterData(donors, searchDonor).map((d) => (
              <div key={d._id} style={styles.card}>
                <div style={styles.cardBold}>
                  {capitalize(d.fname)} {capitalize(d.lname)}
                </div>
                <div style={styles.cardSubtitle}>
                  {d.organ} | {d.bloodgroup}
                </div>
                <div style={styles.cardDetail}>Aadhaar: {d.aadhaarnumber}</div>
                <div style={styles.cardDetail}>
                  Approved: {d.approved ? "Yes" : "No"}
                </div>
                <div style={styles.cardDetail}>
                  Match Found: {d.matchFound ? "Yes" : "No"}
                </div>
                <div
                  style={{
                    ...styles.cardInfo,
                    ...(d.active ? styles.statusActive : styles.statusInactive),
                  }}
                >
                  Status: {d.active ? "Active" : "Inactive"}
                </div>
                <button
                  onClick={() => toggleDonorStatus(d._id, !d.active)}
                  style={{
                    ...styles.button,
                    ...(d.active ? {} : styles.buttonInactive),
                  }}
                >
                  Mark {d.active ? "Inactive" : "Active"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recipients Column */}
        <div style={styles.column}>
          <h2 style={styles.heading}>Recipients</h2>
          <input
            type="text"
            placeholder="Search by Aadhaar"
            value={searchRecipient}
            onChange={(e) => setSearchRecipient(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.list}>
            {filterData(recipients, searchRecipient).map((r) => (
              <div key={r._id} style={styles.card}>
                <div style={styles.cardBold}>
                  {capitalize(r.fname)} {capitalize(r.lname)}
                </div>
                <div style={styles.cardSubtitle}>
                  {r.organ} | {r.bloodgroup}
                </div>
                <div style={styles.cardDetail}>Aadhaar: {r.aadhaarnumber}</div>
                <div style={styles.cardDetail}>
                  Match Found: {r.matchFound ? "Yes" : "No"}
                </div>
                <div
                  style={{
                    ...styles.cardInfo,
                    ...(r.active ? styles.statusActive : styles.statusInactive),
                  }}
                >
                  Status: {r.active ? "Active" : "Inactive"}
                </div>
                <button
                  onClick={() => toggleRecipientStatus(r._id, !r.active)}
                  style={{
                    ...styles.button,
                    ...(r.active ? {} : styles.buttonInactive),
                  }}
                >
                  Mark {r.active ? "Inactive" : "Active"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Transplants Column */}
        <div style={styles.column}>
          <h2 style={styles.heading}>Transplants</h2>
          <input
            type="text"
            placeholder="Search by Aadhaar"
            value={searchTransplant}
            onChange={(e) => setSearchTransplant(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.list}>
            {filterTransplants(transplants, searchTransplant).map((t) => (
              <div key={t._id} style={styles.card}>
                <div style={styles.cardDetail}>
                  Donor Aadhaar: {t.donor?.aadhaarnumber || "N/A"}
                </div>
                <div style={styles.cardDetail}>
                  Recipient Aadhaar: {t.recipient?.aadhaarnumber || "N/A"}
                </div>
                <div style={styles.cardDetail}>
                  Date: {new Date(t.date).toLocaleDateString()}
                </div>
                <div style={styles.cardDetail}>Current Status: {t.status}</div>

                <select
                  value={t.newStatus || t.status}
                  onChange={(e) =>
                    setTransplants((prev) =>
                      prev.map((item) =>
                        item._id === t._id ? { ...item, newStatus: e.target.value } : item
                      )
                    )
                  }
                  style={{ ...styles.searchInput, marginTop: "10px" }}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="successful">Successful</option>
                  <option value="unsuccessful">Unsuccessful</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => {
                    const confirmed = window.confirm(
                      `Are you sure you want to change the transplant status to "${
                        t.newStatus || t.status
                      }"?`
                    );
                    if (confirmed) toggleTransplantStatus(t._id, t.newStatus || t.status);
                  }}
                  style={{ ...styles.button, marginTop: "10px" }}
                >
                  Update Status
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
