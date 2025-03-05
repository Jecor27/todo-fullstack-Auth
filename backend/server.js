import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './db.js'

import Todo from './models/todoModel.js'

const app = express()

const port = 8080

app.use(express.json())
app.use(cors())

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find({})
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