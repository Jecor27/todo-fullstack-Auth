import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './db.js'

import Todo from './models/todoModel.js'

const app = express()

const port = 8080

app.use(cors())
app.use(express.json())

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
    const response = await Todo.findByIdAndDelete(req.params.id)
    console.log(response)
    res.json(response)
}) 

app.listen(port, () => {
    console.log('Listening on port: ', port)
    connectDB()
})