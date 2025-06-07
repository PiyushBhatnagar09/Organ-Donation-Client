# 🫁 Organ Donation Management System

A full-stack **organ donation platform** built to streamline **donor-recipient matching** and improve transparency, efficiency, and trust in the organ transplant process.

![Alt text](client/assets/readme%20images/home.png)

## 🚀 Features

### 👥 Donor & Recipient Management

* **Donor Registration (Public):** Donors can register via a public form on the website.

![Alt text](client/assets/readme%20images/donor_register.png)

* **Recipient Registration (Hospital-only):** Hospitals can register recipients with organ and health details.

![Alt text](client/assets/readme%20images/register_recipient.png)

### 🏥 Donor Approval Workflow

* **Medical Criteria Verification:** Hospitals approve donors based on organ-specific metrics like:

  * **Kidney:** Creatinine, eGFR, BUN
  * **Heart:** Cholesterol, LDL, HDL, etc.
* **Auto-Fill from Reports:** Medical reports can be parsed using:

  * **Google Vision API**
  * **PyMuPDF**
  * **Google Gemini API**
* These tools extract and structure key-value medical data for quick form auto-filling.
* Donor data is auto-fetched from the registration form for seamless approval.

![Alt text](client/assets/readme%20images/approve_donor_data_parsing.png)

### 🔄 Fast & Accurate Organ Matching

* **Bucketing by Blood Group & Organ Type:** Reduces search space for transplant candidates.
* **Priority Queue (Heap) for Recipients:**

  * Ensures quick selection of high-priority (severe or long-waiting) recipients.
  * Matching in **O(1)** time, insertion in **O(log m)** where *m* = recipients in the same bucket.
* **Efficiency Boost:** Avoids naive **O(n × m)** complexity by optimized recipient grouping.

![Alt text](client/assets/readme%20images/transplant_match_completed.png)

### 🔒 Safe Transplant Logic with Concurrency Control

* **Critical Section Locking:** Uses **mutex locks** to avoid simultaneous transplant runs (prevents assigning a donor to multiple recipients).
* **Real-time Notifications:** Built with **Socket.IO** to notify hospitals:

  * When transplant matching is in progress
  * When it's complete
  * Number of successful matches

![Alt text](client/assets/readme%20images/transplant_match_running.png)
![Alt text](client/assets/readme%20images/transplant_match_completed.png)

### 📊 Hospital Dashboard

* **Status Management:**

  * Activate/Deactivate donors and recipients
  * Manage transplant outcomes: Scheduled, Cancelled, Successful, Unsuccessful
* **Search by Aadhaar Number:** Filter donors, recipients, and transplant records easily

![Alt text](client/assets/readme%20images/Hospital%20Dashboard.png)

### 🔍 Transparency & Public Status Checks

* **Public Tracking:** Donors and recipients can check their status using their **Aadhaar number**.

![Alt text](client/assets/readme%20images/check%20donor%20details.png)
![Alt text](client/assets/readme%20images/check%20recipient.png)

* **Basic Info Displayed:**

  * Aadhaar Number
  * Organ & Blood Group
  * Transplant Status and Timestamps

![Alt text](client/assets/readme%20images/active%20donors.png)

---

## 🛠️ Tech Stack

| Layer           | Technology                                     |
| --------------- | ---------------------------------------------- |
| Frontend        | React.js                                       |
| Backend         | Node.js, Express.js                            |
| Database        | MongoDB                                        |
| AI/ML & Parsing | Python, Google Vision API, PyMuPDF, Gemini API |
| Real-time       | Socket.IO                                      |

---

## 📁 Project Structure

```
organ-donation-system/
├── client/               # React frontend
├── server/               # Node.js + Express backend
├── models/               # MongoDB schemas
├── utils/                # Matching logic, bucket/heap management
├── ai-services/          # OCR and Gemini-based extraction
├── sockets/              # Real-time logic using Socket.IO
```

---

## 📌 Highlights

* ⚡ **Efficient Matching Logic**
* 🔐 **Concurrency-Safe Allocation**
* 🤖 **AI-Assisted Medical Form Filling**
* 📡 **Real-Time Updates**
* 🌐 **Public Transparency Features**

---

## 📣 Contributing

Have ideas or improvements? Contributions are welcome! Fork the repo and raise a PR.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---