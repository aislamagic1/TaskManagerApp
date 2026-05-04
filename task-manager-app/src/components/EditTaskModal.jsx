import { useState } from "react";
import { updateTask, deleteTaskById } from "../api/taskApi";
import "./CreateModal.css"

function EditTaskModal( {task, onClose, onCreated} ) {

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);

    const [error, setError] = useState(false);

    async function handleUpdateTask() {

        setError(false);
        if(!title || !description || !status){
            setError("All fields are required");
            return;
        }

        if(title !== task.title || description !== task.description || status !== task.status){
            try {
                await updateTask(task.id, {
                    title: title,
                    description: description,
                    status: status
                });
            } catch (error) {
                console.log(error);
            }
        }
        onClose();
        onCreated();
    }

    async function handleDeleteTask(){
        try {
            await deleteTaskById(task.id);
            onClose();
            onCreated();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Update Task</h3>

                {error && <p className="error">{error}</p>}

                <input 
                    type="text"
                    placeholder={title}
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input 
                    type="text"
                    placeholder={description}
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>

                <div className="modal-buttons">
                    <button className="create-btn" 
                            onClick={handleUpdateTask}>
                        Save
                    </button>
                    <button className="create-btn" 
                            onClick={handleDeleteTask}>
                        Delete
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

export default EditTaskModal;