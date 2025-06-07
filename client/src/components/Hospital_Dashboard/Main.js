import React, { useEffect } from "react";
import HospitalNav from "./Hospital_nav";
import Testimonials from "./Testimonials";
import socket from "./socket";
import Noty from "noty";
import "noty/lib/noty.css";
import "noty/lib/themes/sunset.css";

function MainPage() {
  const showNotification = (msg) => {
    let text = "New transplant event received";

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
    });

    return () => {
      socket.off("new-transplants");
      socket.off("connect");
    };
  }, []);

  return (
    <>
      <HospitalNav />
      <Testimonials />
    </>
  );
}

export default MainPage;
