import { useState } from "react";
import { addBoardForUser } from "../api/boardApi";
import "./CreateBoardModal.css"

function CreateBoardModal({ onClose, onCreated }){
    const [boardName, setBoardName] = useState("");
    const [error, setError] = useState("");

    async function handleCreateBoard(){
        setError("");

        if(!boardName){
            setError("All fields are required");
            return;
        }

        try {
            await addBoardForUser({
                description: boardName
            });

            onClose();
            onCreated();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Create new Board</h3>

                {error && <p className="error">{error}</p>}

                <input 
                    type="text"
                    placeholder="Board name"
                    value={boardName} 
                    onChange={(e) => setBoardName(e.target.value)}
                />

                <div className="modal-buttons">
                    <button className="create-btn" 
                            onClick={handleCreateBoard}>
                        Create
                    </button>
                    <button className="cancel-btn" 
                            onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CreateBoardModal;