import React, { useState } from "react";
import DrawerMenu from "./DrawerMenu";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <header style={styles.header}>
      <button onClick={toggleDrawer} style={styles.menuButton}>
        ☰
      </button>
      <h2 style={{ margin: 0 , color:"white"}}> Hello , Welcome to 5 Star Restaurant </h2>
      {isOpen && <DrawerMenu closeDrawer={() => setIsOpen(false)} />}
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#062d58",
   // color: "white",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
   // background:
        //  "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.1))",
  },
  menuButton: {
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
};

export default Header;



