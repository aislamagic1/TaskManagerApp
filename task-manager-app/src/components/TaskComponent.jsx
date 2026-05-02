import { useState, useEffect } from "react";
import { getAllTasksForBoard } from "../api/taskApi";
import "./TaskComponent.css"


function TaskComponent({ boardId }){

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState({});

    useEffect(() =>{
        if(!boardId) return;

        async function fetchTasks(){

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
        }

        fetchTasks();
    }, [boardId]);

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
        </div>
    )
}

export default TaskComponent;