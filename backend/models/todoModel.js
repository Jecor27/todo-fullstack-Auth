import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: { type: String },
    completed: { type: Boolean, default: false },
    userId:{type:String,required:true}
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo