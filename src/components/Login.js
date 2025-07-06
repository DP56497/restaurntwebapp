import React, { useState } from "react";
import "../App.css";
import bgImage from "../assets/restaurant-bg.png";
import { useNavigate } from "react-router-dom";

function Login({ goBack, onLoginSuccess, prefillEmail, prefillPassword }) {
  const [email, setEmail] = useState(prefillEmail || "");
  const [password, setPassword] = useState(prefillPassword || "");
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://restaurntwebappb.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("category", data.user.category);
        localStorage.setItem("email", data.user.email); // Save owner email
        localStorage.setItem("customerEmail", data.user.email); // Save for customer filtering

        onLoginSuccess(data.user.category); //  Triggers flow based on category
        //  Do NOT navigate manually here — handled by onLoginSuccess
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Server error");
      console.log(err)
    }
  };

  return (
    <div className="form-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          style={{ marginTop: "10px" }}
        >
          Login
        </button>

        <p onClick={goBack} className="switch-form">
          Don't have an account? Sign Up
        </p>
<p style={{ marginTop: "4px", color: "#000000" }}>
  <a href="/forgot-password" style={{ color: "#000000" }}>
    Forgot Password?
  </a>
</p>


      </form>
    </div>
  );
}

export default Login;
