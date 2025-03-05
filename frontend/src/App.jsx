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

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input ref={textRef} />
        <button>Submit</button>
      </form>
      <ul>
        {todos.map(todo => 
          <li>hello</li>
        )}
      </ul>
    </>
  )
}

export default App
