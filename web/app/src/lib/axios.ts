import axios from "axios";

const api  = axios.create({
    baseURL: process.env.NEXT_API_URL!,
    withCredentials: true // send cookie with req
});

export default api;