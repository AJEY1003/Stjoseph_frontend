import React, { useState } from "react";
// import { auth, googleProvider } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { auth ,googleProvider} from "./firebase/firebase";
function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleEmailSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      window.location.href = "/login";
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      window.location.href = "/user";
    } catch (error) {
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up with Email</h2>
      <label>Email:</label><br />
      <input type="email" value={email} onChange={(e) => setemail(e.target.value)} /><br />

      <label>Password:</label><br />
      <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} /><br />

      <button onClick={handleEmailSignup}>Create Account</button>

      <hr style={{ margin: "1.5rem 0" }} />

      <h3>Or Sign In with Google</h3>
      <button onClick={handleGoogleSignin}>🔒 Login with Google</button>
    </div>
  );
}

export default Signin;
