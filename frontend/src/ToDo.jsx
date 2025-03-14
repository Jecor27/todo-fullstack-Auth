import { useEffect, useState, useRef } from 'react'
import './App.css'

const BASE_URL = import.meta.env.VITE_API

function ToDo({userAuth}) {

  const [todos, setTodos] = useState([])
  const textRef = useRef()

  async function getTodos() {

    console.log("🚀 ~ getTodos ~ userAuth.userId:", userAuth)
    const response = await fetch(`${BASE_URL}/api/todos`,{
      headers:{
        Authorization:"Bearer "+ userAuth.token
      }
    })
    const result = await response.json()
    console.log("🚀 ~ getTodos ~ result:", result)
    setTodos(result)
  }

  useEffect(() => {
    if(userAuth) {
      getTodos()
    }
  }, [userAuth])

  async function handleSubmit(e) {
    e.preventDefault()
    const todo = { 
      text: textRef.current.value,
      userId:userAuth.id
    }
    const response = await fetch(`${BASE_URL}/api/todos`, {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const todoDoc = await response.json()
    setTodos([...todos, todoDoc])
    textRef.current.value = ''
  }

  async function handleDelete(id) {
    await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: 'DELETE'
    })
    getTodos()
  }

  async function handleComplete(id) {
    const foundTodo = todos.find(todo => todo._id == id)
    foundTodo.completed = !foundTodo.completed
    await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(foundTodo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    getTodos()
  }

  console.log(todos)

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input ref={textRef} />
        <button>Submit</button>
      </form>
      <ul>
        {todos.map(todo => 
          <li key={todo._id}>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => handleComplete(todo._id)}
            />
            {todo.text}
            <button onClick={() => handleDelete(todo._id)}>X</button>
          </li>
        )}
      </ul>
    </>
  )
}

export default ToDo
