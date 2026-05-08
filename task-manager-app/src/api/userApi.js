import apiClient from "./apiClient";

export const getUserByUsername = async(username) => {
    return await apiClient.get(`/users/search`, {
        params: {
            username: username
        }
    });
};
