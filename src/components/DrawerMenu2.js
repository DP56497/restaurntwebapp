import React from "react";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

function DrawerMenu2({ closeDrawer }) {
  return (
    <div style={styles.drawer}>
      <button onClick={closeDrawer} style={styles.closeButton}>
        ×
      </button>
      <ul style={styles.menuList}>
        <li style={styles.menuItem}>
          <Link to="/System" style={styles.link}>
            <i className="fas fa-tachometer-alt" style={styles.icon}></i>System
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/AddFoodItem" style={styles.link}>
            <i className="fas fa-box" style={styles.icon}></i> Add Food Item
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/OrderRecords" style={styles.link}>
            <i className="fas fa-cog" style={styles.icon}></i> Order records
          </Link>
        </li>
        <li style={styles.menuItem}>
          <Link to="/logout" style={styles.link}>
            <i className="fas fa-sign-out-alt" style={styles.icon}></i> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

const styles = {
  drawer: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "240px",
    height: "100vh",
    backgroundColor: "#062d58",
     background:
          "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.1))",
  //  backgroundcolor: rgba(255, 255, 255, 0.3),
    borderRight: "1px solid #ddd",
    padding: "20px",
    boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
    zIndex: 1000,
  },
  closeButton: {
    fontSize: "28px",
    border: "none",
    background: "none",
    cursor: "pointer",
    color:"#062d58",
    marginBottom: "20px",
    float: "right",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    marginTop: "60px",
  },
  menuItem: {
    fontSize: "18px",
    padding: "12px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  link: {
    textDecoration: "none",
    color: "#062d58",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "10px",
  },
};

export default DrawerMenu2;

