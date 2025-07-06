import React, { useState } from "react";
import "../App.css";
import bgImage from "../assets/restaurant-bg.png";

function Signup({ onSignupComplete }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    category: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("https://restaurntwebappb.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok || response.status === 409) {
        // 🔐 Save session data
        localStorage.setItem("username", formData.username);
        localStorage.setItem("email", formData.email);
        localStorage.setItem("category", formData.category);
        localStorage.setItem("isAuthenticated", "true");

        if (formData.category === "customer") {
          localStorage.setItem("customerEmail", formData.email);
        }

        // ⚠️ Old user detected
        if (response.status === 409) {
          alert("User already exists. Redirecting to homepage...");

          if (formData.category === "owner") {
            onSignupComplete("owner", formData.email, formData.password); // redirect to /home1
          } else {
            onSignupComplete("customer", formData.email, formData.password); // redirect to /home2
          }
          return;
        }

        // 🆕 New user
        onSignupComplete(formData.category, formData.email, formData.password);
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch (err) {
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <div
      className="form-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Username"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="owner">Owner</option>
          <option value="customer">Customer</option>
        </select>
        <button type="submit">Register</button>
        {message && <p style={{ color: "red" }}>{message}</p>}
       <p className="switch-form" onClick={() => window.location.href = "/login"}>
  Already Signed Up? Login Here
</p>


      </form>
    </div>
  );
}

export default Signup;
