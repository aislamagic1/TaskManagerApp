import { useState } from "react";
import { login } from "./api/authApi";

function LoginForm(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    async function handleLogin(){
        try {
            await login(username, password);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Login">
            <h1>Login</h1>
            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text"
                    name="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" 
                    name="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;