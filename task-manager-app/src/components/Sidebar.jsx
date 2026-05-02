import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBoardsForUser } from "../api/boardApi";
import { useParams } from "react-router-dom";
import "./Sidebar.css"
import CreateBoardModal from "./CreateBoardModal";

function SideBar(){
    const [boards, setBoards] = useState([]);
    const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

    const { boardId } = useParams();

    const naviagate = useNavigate();

    async function fetchBoards(){
        try {
            const response = await getBoardsForUser();
            setBoards(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        fetchBoards();
    }, []);

    return(
        <nav className="sidebar">

            <button className="create-board-btn" 
                    onClick={() => setShowCreateBoardModal(true)}>
                Create new Board
            </button>

            <h3>Your boards</h3>

            {boards.length === 0 ? (
                <p> No boards yet </p>
            )
            :
            (
                <ul className="nav-menu">
                    {boards.map((board) => (
                        <li key={board.id}
                            onClick={() => naviagate(`/home/boards/${board.id}`)}
                            className={Number(boardId) === board.id ? "active-board" : ""}
                            style={{ cursor: "pointer" }}>
                            <p>{board.description}</p>
                        </li>
                    ))}
                </ul>
            )}

            {showCreateBoardModal && (
                <CreateBoardModal
                    onClose={() => setShowCreateBoardModal(false)}
                    onCreated={fetchBoards}
                />
            )}
        </nav>
    )
}

export default SideBar;