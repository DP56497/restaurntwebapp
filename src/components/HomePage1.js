import React from "react";
import Header2 from "./Header2";
import bgImage from "../assets/Hotel.png.jpg"

function HomePage1() {
  return (
    <div
    style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}>
      <Header2 />
      <div style={{ padding: "20px" }}>
        {/* <h1>Welcome to Customer Home Page</h1> */}
      </div>
    </div>
  );
}

export default HomePage1;
