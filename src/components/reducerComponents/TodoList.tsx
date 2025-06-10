import { useReducer } from 'react'
import ToggleReducer from './TodoReducer'

// Example component using the State Reducer Pattern
const TodoList: React.FC = () => {
  // Use the useReducer hook to manage state with the defined reducer
  const [state, dispatch] = useReducer(ToggleReducer, { todos: [] })

  // Functions to handle user interactions
  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: text })
  }

  const toggleTodo = (id: number) => {
    dispatch({ type: 'COMPLETE_TODO', payload: id })
  }

  const removeTodo = (id: number) => {
    dispatch({ type: 'REMOVE_TODO', payload: id })
  }

  return (
    <div>
      <h2>Todo List</h2>
      <p>
        Enter a todo item and press the enter key to add it to the list. You can
        then mark the item as completed or remove it from the list.
      </p>
      <input
        type="text"
        placeholder="Add todo..."
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
            addTodo(e.currentTarget.value.trim())
            e.currentTarget.value = ''
          }
        }}
      />
      <div className="reducers__list">
        {state.todos.map((todo) => (
          <div key={todo.id} className="reducers__list__item">
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => toggleTodo(todo.id)}>Complete</button>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TodoList
