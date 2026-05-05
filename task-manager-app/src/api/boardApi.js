import apiClient from "./apiClient";

export const getBoardsForUser = async() => {
    return await apiClient.get(`/boards`);
};

export const addBoardForUser = async(board) => {
    await apiClient.post(`/boards`, board);
    return undefined;
};

export const getAllMembersForBoard = async(boardId) => {
    return await apiClient.get(`/boards/${boardId}/members`);
};

export const addMemberToBoard = async(boardId, userId) => {
    await apiClient.post(`/boards/${boardId}/members`, {
        params: {
            userId: userId
        }
    });
};



