import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/tasks";

export function createTask(task) {
    return http.post(apiEndpoint, {
        title: task.title
    })
}

export function getAllTasks() {
    return http.get(apiEndpoint);
}

export function completeTask(taskId) {
    const resourceEndpoint = apiEndpoint + "/" + taskId;
    return http.put(resourceEndpoint, {
        status: {
            completed: true,
            completedon: Date.now()
        }
    });
}

export function changeTask(updateParams) {
    const { task, title, category } = updateParams;
    const resourceEndpoint = apiEndpoint + "/" + task._id;
    return http.put(resourceEndpoint, {
        title: title,
        category: category
    });
}

export function removeTask(taskId) {
    const resourceEndpoint = apiEndpoint + "/" + taskId;
    return http.delete(resourceEndpoint);
}
