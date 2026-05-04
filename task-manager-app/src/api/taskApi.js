import apiClient from "./apiClient";

export const createTask = async(boardId, task) => {
    return await apiClient.post(`/boards/${boardId}/tasks`, task);
};

export const getAllTasksForUser = async(userId) => {
    return await apiClient.get(`/users/${userId}/tasks`);
};

export const getAllTasksForBoard = async(boardId) => {
    return await apiClient.get(`/boards/${boardId}/tasks`);
};

export const deleteTaskById = async(taskId) => {
    return await apiClient.delete(`/tasks/${taskId}`);
};

export const changeTaskStatusById = async(taskId, taskStatus) => {
    return await apiClient.patch(`/tasks/${taskId}/status`, taskStatus,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};

export const updateTask = async(taskId, task) => {
    return await apiClient.patch(`/tasks/${taskId}`, task);
};