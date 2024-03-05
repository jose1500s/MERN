import { Router } from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/tasks.controllers.js"

const router = Router()

router.get('/tasks', getTasks);

router.get('/task/:id', getTask);

router.post('/tasks', createTask);

router.put('/task/:id', updateTask);

router.delete('/task/:id', deleteTask);


export default router