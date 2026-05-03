import { useState, useEffect, useCallback } from "react";
import { getAllTasksForBoard } from "../api/taskApi";
import "./TaskComponent.css"
import CreateTaskModal from "./CreateTaskModal";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { changeTaskStatusById } from "../api/taskApi";


function TaskComponent({ boardId }){

    const [tasks, setTasks] = useState([]);
    const taskStatus = {
        TODO: "To Do",
        IN_PROGRESS: "In Progress",
        DONE: "Done"
    };

    const [showNewTaskModal, setShowNewTaskModal] = useState(false);


    const fetchTasks = useCallback(async () => {
        try {
            const response = await getAllTasksForBoard(boardId);
            setTasks(response.data);   
        } catch (error) {
            console.log(error);
        }
    }, [boardId]);

    useEffect(() =>{
        if(!boardId) return;

        fetchTasks();
    }, [fetchTasks, boardId]);

    async function handleDragEnd(result) {
        const { source, destination, draggableId } = result;

        if(!destination) return;

        const sourceStatus = source.droppableId;
        const destStatus = destination.droppableId;

        if (sourceStatus === destStatus) return;

        try {
            await changeTaskStatusById(draggableId, destStatus);

            setTasks(prev =>
                prev.map(task =>
                    task.id === Number(draggableId)
                        ? { ...task, status: destStatus }
                        : task
                )
            );
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <div>
            <h3>Tasks</h3>

            {tasks.length === 0 ? (
                <p className="no-tasks-msg">No tasks. Create a new task to get started</p>
            ): (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="task-board">
                        {Object.entries(taskStatus).map(([status, title]) => (

                            <Droppable droppableId={status} key={status}>
                                {(provided) => (
                                    <div className="column" 
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}>
                                            <h3>{title}</h3>

                                        {tasks
                                            .filter(task => task.status === status)
                                            .map((task, index) => (
                                                <Draggable 
                                                    key={task.id}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div 
                                                            className="task-card"
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <strong>{task.title}</strong>
                                                            <p>{task.description}</p>
                                                            <p>{task.creator}</p>
                                                        </div>
                                                    )}
                                                </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
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