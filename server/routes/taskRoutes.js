import express from'express';
import { getTaskList, addTask, deleteTaskById, updateTaskById } from "../controllers/taskController.js";
import { authMiddleWare } from '../middlewares/auth.js';
export const taskRouter = express.Router();

//creating case management routes
taskRouter.use(authMiddleWare);
taskRouter.get('/',getTaskList);
taskRouter.post('/',addTask);
taskRouter.put('/:id',updateTaskById);
taskRouter.delete('/:id',deleteTaskById);