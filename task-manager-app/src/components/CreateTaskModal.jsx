import { useState } from "react";
import { createTask } from "../api/taskApi";
import "./CreateModal.css"

function CreateTaskModal( {boardId, onClose, onCreated} ) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState("");

    async function handleCreateTask(){
        setError(false);

        if(!title || !description){
            setError("All fields are required");
            return;
        }

        try {
            await createTask(boardId, {
                title: title,
                description: description
            })

            onClose();
            onCreated();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Create new Task</h3>

                {error && <p className="error">{error}</p>}

                <input 
                    type="text"
                    placeholder="Task name"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input 
                    type="text"
                    placeholder="Decription of task"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="modal-buttons">
                    <button className="create-btn" 
                            onClick={handleCreateTask}>
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

export default CreateTaskModal;