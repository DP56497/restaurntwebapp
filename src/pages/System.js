import React, { useState } from "react";
import Header2 from "../components/Header2";
import DrawerMenu2 from "../components/DrawerMenu2";
import bgImage from "../assets/cafe.png.png"

function System() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div
     style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}>
      {/* Header with toggle functionality */}
      <Header2 toggleDrawer={toggleDrawer} title="Orders Page" />

      {/* Conditionally render DrawerMenu */}
      {drawerOpen && <DrawerMenu2 closeDrawer={() => setDrawerOpen(false)} />}

      {/* Page Content */}
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#062d58" }}>Mangment  System</h2>
      </div>
    </div>
  );
}

export default System;
