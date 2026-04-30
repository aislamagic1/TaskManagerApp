import { useState, useEffect } from "react";
import { getBoardsForUser } from "../api/boardApi";
import "./Sidebar.css"

function SideBar(){
    const [boards, setBoards] = useState([]);

    useEffect(() =>{
        async function fetchBoards(){
            const response = await getBoardsForUser();
            setBoards(response.data);
        }
        
        fetchBoards();
    }, []);

    return(
        <nav className="sidebar">
            <h3>Your boards</h3>

            {boards.length === 0 ? (
                <p> No boards yet </p>
            )
            :
            (
                <ul className="nav-menu">
                    {boards.map((board) => (
                        <li key={board.id}>
                            <p>{board.description}</p>
                        </li>
                    ))}
                </ul>
            )}

        </nav>
    )
}

export default SideBar;