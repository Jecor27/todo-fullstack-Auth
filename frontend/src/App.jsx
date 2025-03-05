import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {

  const [todos, setTodos] = useState([])
  const textRef = useRef()

  async function getTodos() {
    const response = await fetch('http://localhost:8080/api/todos')
    const result = await response.json()
    setTodos(result)
  }

  useEffect(() => {
    getTodos()
  }, [])

  console.log(todos)

  async function handleSubmit(e) {
    e.preventDefault()
    const todo = { 
      text: textRef.current.value
    }
    const response = await fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const todoDoc = await response.json()
    setTodos([...todos, todoDoc])
  }

  async function handleDelete(id) {
    console.log(id)
    await fetch(`http://localhost:8080/api/todos/${id}`, {
      method: 'DELETE'
    })
    // update the state to remove the todo item
  }

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
            {todo.text}
            <button onClick={() => handleDelete(todo._id)}>X</button>
          </li>
        )}
      </ul>
    </>
  )
}

export default App
