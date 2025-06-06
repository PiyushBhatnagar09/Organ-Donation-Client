import React, {useState} from "react";
import Top3 from "../Navbar/Top3"; // Assuming this is a top-level navbar
import Active_Donors from "./Donors_List";
import Active_Recipients from "./Recipients_List";
import Transplant_Matches from "./Transplant_Matches";

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
        {selectedTab === "Active_Donors" && <Active_Donors/>}
        {selectedTab === "Active_Recipients" && <Active_Recipients/>}
        {selectedTab === "Transplant_Matches" && <Transplant_Matches/>}
      </div>
    </>
  );
}

export default TransactionList;
