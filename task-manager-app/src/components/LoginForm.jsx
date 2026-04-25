import { useState } from "react";
import { login } from "../api/authApi";
import "./LoginForm.css";

function LoginForm(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    async function handleLogin(){
        try {
            setError("");
            await login(username, password);
        } catch (error) {
            setError("Invalid username or password");
            console.log(error);
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>

                {error && <p className="error">{error}</p>}

                <div className="login-form">
                    <label>Username</label>
                    <input 
                        type="text"
                        name="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your useraname"
                    />
                </div>

                <div className="login-form">
                    <label>Password</label>
                    <input type="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password"
                    />
                </div>
                
                
                <button className="login-button" type="button" name="login" onClick={handleLogin}>
                    Login
                </button>
                

                <p className="register-text">
                    Don't have an account?{" "}
                    <span>
                        Register
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginForm;