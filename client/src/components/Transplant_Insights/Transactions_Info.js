import React, {useState} from "react";
import Top3 from "../Navbar/Top3"; // Assuming this is a top-level navbar
import ActiveDonors from "./Donors_List";
import ActiveRecipients from "./Recipients_List";
import TransplantMatches from "./Transplant_Matches";

function TransactionList() {
  const [selectedTab, setSelectedTab] = useState("Active_Donors");

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <>
      <Top3 onTabClick={handleTabClick} activeTab={selectedTab}/>
      <div id="transactions">        
        {/* Conditionally render components based on selected tab */}
        {selectedTab === "Active_Donors" && <ActiveDonors/>}
        {selectedTab === "Active_Recipients" && <ActiveRecipients/>}
        {selectedTab === "Transplant_Matches" && <TransplantMatches/>}
      </div>
    </>
  );
}

export default TransactionList;
