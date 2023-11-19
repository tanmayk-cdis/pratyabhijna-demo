import axios from "axios"
import { HttpService, baseUrl } from "./http-service"

export const getTasks = () => {
    return HttpService.get("/tasks")
}

export const saveTask = (task) => {
    return HttpService.post('/task', task)
}