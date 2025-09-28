import mongoose, {Schema} from "mongoose";


//creating User model
const UserSchema= new mongoose.Schema({
    username:{
        type:String,required:true,unique:true
    },
    email:{
        type:String,required:true
    },
    password: { type: String, required: true },
    phone: {type:Number,required: true },
    role: { type: String, enum: ['admin','user'], default: 'user' }
},{timestamp:true});

//creating Task model
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED', 'PENDING'], default: 'PENDING' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    user: { type: mongoose.Schema.Types.Object, ref: 'User'}
}, { timestamps: true });



export const User = mongoose.model('User',UserSchema)
export const Task = mongoose.model('Task',TaskSchema)