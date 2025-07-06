import React, { useState } from "react";
import Header from "../components/Header";
import DrawerMenu from "../components/DrawerMenu";
import bgImage from "../assets/Hote-R.png"

function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}>
      {/* Header with toggle functionality */}
      <Header toggleDrawer={toggleDrawer} title="Orders Page" />

      {/* Conditionally render DrawerMenu */}
      {drawerOpen && <DrawerMenu closeDrawer={() => setDrawerOpen(false)} />}

      {/* Page Content */}
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#062d58" }}>Welcome to Hotel 5 Star - Dashboard</h2>
      </div>
    </div>
  );
}

export default Dashboard;
