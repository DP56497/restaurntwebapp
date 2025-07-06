import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "../App.css";

function RestaurantInfoForm({ onSubmitComplete }) {
  const [formData, setFormData] = useState({
    hotelName: "",
    address: "",
    mobile: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e ) => {
    e.preventDefault();

    const ownerEmail = localStorage.getItem("email");

  try {
  const res = await fetch("http://localhost:5000/api/restaurant-info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData, ownerEmail }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("restaurantName", data.restaurantName);
    onSubmitComplete(); // navigate to HomePage1
  } else {
    alert(data.message || "Failed to save restaurant info.");
  }
} catch (error) {
  alert("Failed to save restaurant info.");
}

  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Restaurant Information</h2>
        <input name="hotelName" placeholder="Hotel Name" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RestaurantInfoForm;
