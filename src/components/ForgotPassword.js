import React, { useState } from "react";
import "../App.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("https://restaurntwebappb.onrender.com/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Password updated successfully. Please login again.");
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Server error.");
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        {message && <p style={{ color: "red" }}>{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
