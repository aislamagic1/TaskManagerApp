import apiClient from "./apiClient";

export const login = async (username, password) => {
    const response = await apiClient.post("/auth/signin", {
        user_name: username,
        password
    });

    const token = response.data.token;

    localStorage.setItem("token", token);

};

export const signup = async (username, email, password) => {
    return await apiClient.post("/auth/signup", {
        user_name: username,
        email,
        password
    });
};