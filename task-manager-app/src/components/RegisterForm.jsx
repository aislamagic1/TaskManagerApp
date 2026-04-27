import { useState } from "react";
import { signup } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"

function RegisterForm() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    async function handleRegister(){
        setError("");
        setSuccess("");

        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }

        if (validateEmail.test(String(email).toLowerCase)){
            setError("Invalid email address!");
            return;
        }

        try {
            await signup(username, email, password);
            setSuccess("Account created successfully!");

            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            console.log(error.response?.data);
            setError("Registration failed");
        }
    }


    return(
        <div className="auth-container">
            <div className="auth-card">
                <h1>Register a new account</h1>

                {error && <p className="error">{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

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
                    <label>Email</label>
                    <input type="text" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email address"
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

                <button className="auth-button" type="button" name="login" onClick={handleRegister}>
                    Register New Account
                </button>

                <p className="register-text">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/")}>
                        Login
                    </span>
                </p>

            </div>

        </div>
    );
}

export default RegisterForm;