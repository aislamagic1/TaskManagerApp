import apiClient from "./apiClient";

export const createTask = async(boardId, userId, task) => {
    return await apiClient.post(`/boards/${boardId}/tasks`, task, {
        params: {
            userId: userId
        }
    });
};

export const getAllTasksForUser = async(userId) => {
    return await apiClient.get(`/users/${userId}/tasks`);
};

export const getAllTasksForBoard = async(taskId) => {
    return await apiClient.get(`/tasks/${taskId}`);
};

export const deleteTaskById = async(taskId) => {
    return await apiClient.delete(`/tasks/${taskId}`);
};

export const changeTaskStatusById = async(taskId, taskStatus) => {
    return await apiClient.put(`/tasks/${taskId}/status`, taskStatus);
};