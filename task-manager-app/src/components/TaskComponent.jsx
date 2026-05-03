import { useState, useEffect, useCallback } from "react";
import { getAllTasksForBoard } from "../api/taskApi";
import "./TaskComponent.css"
import CreateTaskModal from "./CreateTaskModal";


function TaskComponent({ boardId }){

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState({});

    const [showNewTaskModal, setShowNewTaskModal] = useState(false);


    const fetchTasks = useCallback(async () => {
        try {
            const response = await getAllTasksForBoard(boardId);
            setTasks(response.data);   
            setFilteredTasks({
                TODO: response.data.filter(t => t.status === "TODO"),
                IN_PROGRESS: response.data.filter(t => t.status === "IN_PROGRESS"),
                DONE: response.data.filter(t => t.status === "DONE")
            });
        } catch (error) {
            console.log(error);
        }
    }, [boardId]);

    useEffect(() =>{
        if(!boardId) return;

        fetchTasks();
    }, [fetchTasks, boardId]);

    return(
        <div>
            <h3>Tasks</h3>

            {tasks.length === 0 ? (
                <p className="no-tasks-msg">No tasks. Create a new task to get started</p>
            ): (
                <div className="task-board">
                    {Object.entries(filteredTasks).map(([status, tasks]) => (
                        <div className="column" key={status}>
                            <h3>{status.replace("_", " ")}</h3>

                            {tasks.map((task) => (
                                <div className="task-card" key={task.id}>
                                    <strong>{task.title}</strong>
                                    <p>{task.description}</p>
                                    <p>{task.creator}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
            <button className="create-task-btn"
                    onClick={() => setShowNewTaskModal(true)}>
                        New Task
            </button>

            {showNewTaskModal && (
                <CreateTaskModal 
                    boardId={boardId}
                    onClose={() => setShowNewTaskModal(false)}
                    onCreated={fetchTasks}
                />
            )}

        </div>
    )
}

export default TaskComponent;