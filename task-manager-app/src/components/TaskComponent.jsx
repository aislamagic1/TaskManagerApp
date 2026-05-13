import { useState, useEffect, useCallback } from "react";
import { getAllTasksForBoard, changeTaskStatusById } from "../api/taskApi";
import "./TaskComponent.css"
import CreateTaskModal from "./CreateTaskModal";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import EditTaskModal from "./EditTaskModal";


function TaskComponent({ boardId }){

    const [tasks, setTasks] = useState([]);
    const taskStatus = {
        TODO: "To Do",
        IN_PROGRESS: "In Progress",
        DONE: "Done"
    };

    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [showEditTaskModal, setEditTaskModal] = useState(false);

    const [taskUpdate, setTaskUpdate] = useState({});

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
        <div className="tasks-container">
            <div className="tasks-header">
                <h2>Tasks</h2>

                <button className="new-task-btn"
                    onClick={() => setShowNewTaskModal(true)}>
                        New Task
                </button>
            </div>

            {tasks.length === 0 ? (
                <div className="no-task-msg">
                    <p>No tasks</p>
                    <span>Create a task to get started</span>
                </div>
            ): (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="task-board">
                        {Object.entries(taskStatus).map(([status, title]) => (

                            <Droppable droppableId={status} key={status}>
                                {(provided) => (
                                    <div className="column" 
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}>

                                            <div className="column-header">
                                                <h3>{title}</h3>

                                                <span className="task-count">
                                                {
                                                    tasks.filter(task => task.status === status).length
                                                }
                                                </span>
                                            </div>

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
                                                            <div className="task-card-title">
                                                                <span className="task-label">Title</span>
                                                                <h4>{task.title}</h4>
                                                            </div>

                                                            <div className="task-card-description">
                                                                    <span className="task-label">Description</span>
                                                                    <div className="task-text">{task.description}</div>
                                                            </div>
                                                            
                                                            <div className="task-card-footer">
                                                                <span className="task-creator">
                                                                    <span className="task-label">Creator</span>
                                                                    <p>{task.creator}</p>
                                                                </span>
                                                                <button className="edit-task-btn"
                                                                    onClick={() => {
                                                                        setEditTaskModal(true);
                                                                        setTaskUpdate(task);
                                                                    }}>
                                                                        Edit
                                                                </button>
                                                            </div> 
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

            {showNewTaskModal && (
                <CreateTaskModal 
                    boardId={boardId}
                    onClose={() => setShowNewTaskModal(false)}
                    onCreated={fetchTasks}
                />
            )}

            {showEditTaskModal && (
                <EditTaskModal 
                    task={taskUpdate}
                    onClose={() => setEditTaskModal(false)}
                    onCreated={fetchTasks}
                />
            )}

        </div>
    )
}

export default TaskComponent;