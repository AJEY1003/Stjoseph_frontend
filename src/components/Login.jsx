import React, { useState } from "react";

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (name !==" " && password !== " ") {
            window.location.href = "/user";
            console.log("Login successful");
        } else {
            alert("Login failed. Please provide correct details.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label><br />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
