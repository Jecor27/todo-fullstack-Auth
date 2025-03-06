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
        res.send(document)
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
    let key = process.env.JWT_Key
    let token = jwt.sign({email},key,{expiresIn:"1d"})
    res.json({token,email,id:userDoc._id})
})

app.get("/token",(req,res)=>{
    let obj={
        email:"harry@gmail.com"
    }
    let token = jwt.sign(obj,"gjoijgdioggjo",{expiresIn:"3d"})
    console.log("🚀 ~ app.get ~ token:", token)
    res.send({token})
})

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find({userId:"67c9d6da16b28a4625baebc5"})
        res.status(200).json(todos)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
})

app.post('/api/todos', async (req, res) => {
    try {
        const todo = await Todo.create(req.body)
        console.log(todo)
        res.status(201).json(todo)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
})

app.delete('/api/todos/:id', async (req, res) => {
    try {
        const response = await Todo.findByIdAndDelete(req.params.id)
        console.log(response)
        res.status(200).json(response)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}) 

app.put('/api/todos/:id', async (req, res) => {
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