import React from "react";
import {useState} from "react";

function Signin() {
    const [name,setname]=useState("");
    const [password,setpassword]=useState("");
    const [email,setemail]=useState("");
    function handleSubmit(e){
        if(name!==" " && password!==" " && email!==" "){
            alert("please fill the details")
        }
        else{
            window.location.href="/login";
        }
    }
    return (
    
        
        <div>
            <label>Name:</label><br></br>
            <input type="text" value={name} onChange={(e)=>setname(e.target.value)}></input><br></br>
            <label>Password:</label><br></br>
            <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)}></input><br></br>
            <label>Email:</label><br></br>
            <input type="email" value={email} onChange={(e)=>setemail(e.target.value)}></input><br></br>
            <button onClick={handleSubmit}>Signin</button>
            
        </div>
        
    );
}
export default Signin;