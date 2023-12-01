import axios from "axios"
import { AuthHttpService, HttpService, baseUrl } from "./http-service"

export const getTasks = () => {
    return AuthHttpService().get("/tasks")
}

export const saveTask = (task) => {
    return AuthHttpService().post('/task', task)
}