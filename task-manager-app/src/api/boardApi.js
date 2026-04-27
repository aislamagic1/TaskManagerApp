import apiClient from "./apiClient";

export const getBoardForUser = async(id) => {
    return await apiClient.get(`/users/${id}/boards`);
};

export const addBoardForUser = async(id, board) => {
    await apiClient.post(`/users/${id}/boards`, board);
    return undefined;
};

export const getAllMembersForUsers = async(id) => {
    return await apiClient.get(`/boards/${id}/members`);
};

export const addMemberToBoard = async(boardId, userId) => {
    await apiClient.post(`/boards/${boardId}/members`, {
        params: {
            userId: userId
        }
    });
};



