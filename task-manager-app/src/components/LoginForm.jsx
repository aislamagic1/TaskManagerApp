import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    async function handleLogin(){
        try {
            setError("");
            await login(username, password);
            navigate("/home");
        } catch (error) {
            setError("Invalid username or password");
            console.log(error);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Login</h1>

                {error && <p className="error">{error}</p>}

                <div className="auth-form">
                    <label>Username</label>
                    <input 
                        type="text"
                        name="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter your username"
                    />
                </div>

                <div className="auth-form">
                    <label>Password</label>
                    <input type="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter your password"
                    />
                </div>
                
                
                <button className="auth-button" type="button" name="login" onClick={handleLogin}>
                    Login
                </button>
                
                <p className="register-text">
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/register")}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    )
}

export default LoginForm;