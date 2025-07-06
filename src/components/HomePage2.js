import React from "react";
import Header from "./Header";
import bgImage from "../assets/cafe.png.png"; //  import the image

function HomePage2() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Header />
      <div style={{ padding: "20px" }}>
        {/* <h1>Welcome to Customer Home Page</h1> */}
      </div>
    </div>
  );
}

export default HomePage2;
