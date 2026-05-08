import { useState } from "react";
import { addBoardForUser } from "../api/boardApi";
import "./CreateModal.css"

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

                <div className="form-group">
                    <label>Enter board name:</label>
                    <input 
                        type="text"
                        placeholder="Board name"
                        value={boardName} 
                        onChange={(e) => setBoardName(e.target.value)}
                    />
                </div>

                <div className="modal-buttons">
                    <button className="create-btn" 
                            onClick={handleCreateBoard}>
                        Submit
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