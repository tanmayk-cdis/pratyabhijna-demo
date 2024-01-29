import { getUser } from "context/AuthContext";

const { default: axios } = require("axios");

export const baseUrl = "http://localhost:3002"

axios.defaults.baseURL = baseUrl
axios.defaults.timeout = 5000
axios.defaults.headers.common = {
    "Content-Type": "application/json",
}

axios.interceptors.response.use(response => response, error => {
    if (error.response.status == 401) {
        console.log('handle unauthenticated!')
    }
    return Promise.reject(error)
})

export const HttpService = axios

export const AuthHttpService = () => axios.create({
    headers: {
        'Authorization': `Bearer ${getUser().accessToken}`
    }
})