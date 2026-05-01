import { useState, useEffect } from "react";
import { getAllTasksForBoard } from "../api/taskApi";


function TaskComponent({ boardId }){

    const [tasks, setTasks] = useState([]);

    useEffect(() =>{
        if(!boardId) return;

        async function fetchTasks(){

            try {
                const response = await getAllTasksForBoard(boardId);
                setTasks(response.data);   
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
                <p>No tasks</p>
            ):(
                <ul>
                    {tasks.map((task) =>(
                        <li key={task.id}>
                            <strong> {task.title} </strong>
                            <p> {task.description} </p>
                            <p> {task.creator} </p>
                            <p> {task.status} </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TaskComponent;