import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './db.js'

import Todo from './models/todoModel.js'
import User from "./models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const app = express()

const port = 8080

app.use(express.json())
app.use(cors())

app.post("/api/signup",async(req,res)=>{
    console.log(req.body,"hello")
    let salt = await bcrypt.genSalt(10)
    
    let hashedPassword = await bcrypt.hash(req.body.password,salt)
    req.body.password = hashedPassword
    try {
        let document = await User.create(req.body)
        let payload = {email:document.email,id:document._id}
        const token = jwt.sign(payload,process.env.JWT_Key,{expiresIn:"3d"})
        res.send({email:document.email,id:document._id,token})
    } catch (error) {
        console.log("error",error.message)
        res.json({error:error.message}).status(400)
    }
    
})
app.post("/api/login",async(req,res)=>{
    let {password,email} = req.body
    let userDoc= await User.findOne({email:email})

    if(!userDoc){
       return res.status(404).json({error:"no such a user exists"})
    }

    let isPasswordValid = await bcrypt.compare(password,userDoc.password)

    if(!isPasswordValid){
        return res.status(400).json({error:"wrong password"})
    }

    console.log("🚀 ~ app.post ~ isPasswordValid:", isPasswordValid)
    console.log("🚀 ~ app.post ~ userDoc:", userDoc)
    console.log("🚀 ~ app.post ~ password:", password)
    console.log("🚀 ~ app.post ~ email:", email)
    let payload = {email:userDoc.email,id:userDoc._id}
    const token = jwt.sign(payload,process.env.JWT_Key,{expiresIn:"365d"})

    res.json({email:userDoc.email,id:userDoc._id,token})
})
// you want anyone to access access data
// auth authorization, you only want users who are logged in to access data
// you only want the user who created the data to access it

const checkIfLoggedIn=(req,res,next)=>{
    let payload
    try {
        let token = req.header("Authorization")
        token = token.replace("Bearer ","")
         payload = jwt.verify(token,process.env.JWT_Key)
        console.log("🚀 ~ app.get ~ payload:", payload)
        console.log("🚀 ~ app.get ~ token:", token)
        req.payload = payload
        next()
    } catch (error) {
        console.log("🚀 ~ app.get ~ error:", error)
        
        return res.status(401).json({message:"you are not loggedin"})
    }

}
app.get('/api/todos/', checkIfLoggedIn ,async (req, res) => {
    try {
        const todos = await Todo.find({userId:req.payload.id})

        if(req.payload.id !== todos[0].userId){
            // you are not the creator
            throw Error("You are not authorized")
        }
        res.status(200).json(todos)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
})

app.post('/api/todos',checkIfLoggedIn ,async (req, res) => {
    try {
        const todo = await Todo.create(req.body)
        console.log(todo)
        res.status(201).json(todo)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
})

app.delete('/api/todos/:id', checkIfLoggedIn,async (req, res) => {
    try {
        const response = await Todo.findByIdAndDelete(req.params.id)
        console.log(response)
        res.status(200).json(response)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}) 

app.put('/api/todos/:id', checkIfLoggedIn,async (req, res) => {
    try {
        console.log('PUT /todos/:id')
        console.log(req.body)
        const response = await Todo.findByIdAndUpdate(req.params.id, req.body) // can add { new: true } as third argument
        // console.log(response)
        res.status(200).json(response)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
})

app.listen(port, () => {
    console.log('Listening on port: ', port)
    connectDB()
})