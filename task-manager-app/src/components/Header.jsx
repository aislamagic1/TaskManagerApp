import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {

    const navigate = useNavigate();


    function handleLogout(){
        localStorage.removeItem("token");
        navigate("/");
    }

    return(
        <header className="header">
            <h2 className="logo">Task Manager</h2>

            <div className="header-actions">
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Header;