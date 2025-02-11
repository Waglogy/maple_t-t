import axios from "axios";

// Set the base URL for API requests
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Authentication APIs
export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);
export const getProfile = (token) => API.get("/user/profile", { headers: { Authorization: token } });
export const updateProfile = (data, token) => API.put("/user/profile", data, { headers: { Authorization: token } });
export const deleteAccount = (token) => API.delete("/user/delete", { headers: { Authorization: token } });
