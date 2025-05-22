import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      window.location.href = "/user";
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label><br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <label>Password:</label><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
