import { NotFoundError, sendSuccess } from "../middlewares/errorMiddlewares.js";
import { Task } from "../models/crmModel.js";

//controller to get Task List
export const getTaskList = async (req, res) => {
  try {
    const tasks = await Task.find();
    if(tasks.length===0){
        throw new NotFoundError("No Tasks Added!")
    }
    sendSuccess(res, tasks);

  } catch (err) {
     res.status(400).json({
            success:false,
            message:"Failed to fetch task list",
            error:err.message
        });
}
};

//controller to add Task
export const addTask = async (req, res) => {
 try {
         const {title,description,status} = req.body;
         const isTaskExit= await Task.findOne({ title : title});
         if(isTaskExit){
            return res.status(400).json({
                success:false,
                message:'Task with this title already exists'
            })
         }
         const user=req.user.username;
         const task = new Task({title,description,status,user});
         await task.save();
         return res.json({success:true,message:"new task added successfully", newTask:task});
         
     } catch (error) {
         res.status(400).json({
             success:false,
             message:"Failed to add task",
             error:error.message
         });
     }
};

//controller to update task
export const updateTaskById=async(req,res)=>{
    try {
        const updatedTask=await Task.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
        { new: true }
        );
         if(!updatedTask){
                throw new NotFoundError("Task not found!")
            }
        res.json({message:"Task updated successfully",Task:updatedTask});
        
    } catch (error) {
          res.status(500).json({
            success:false,
            message:"Failed to update Task",
            error:error.message
        });
    }
}

//controller to delete posts
export const deleteTaskById=async(req,res)=>{
    try {
        const deletedTask= await Task.findByIdAndDelete(req.params.id);
        if(!deletedTask){
           throw new NotFoundError("Task not found!");
        }
        res.json({success:true,message:`Task with id-${req.params.id} deleted successfully`});
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"Failed to delete Task",
            error:error.message
        });
    }
}
