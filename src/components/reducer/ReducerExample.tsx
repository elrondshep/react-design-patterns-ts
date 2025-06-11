import '@/styles/atom-one-dark.scss'
import '@/styles/components/reducerComponent.scss'
import hljs from 'highlight.js'
import { useEffect, useRef } from 'react'
import TodoList from './TodoList'

const ReducerComponent = () => {
  const todoRef = useRef(null)
  const reducerRef = useRef(null)
  useEffect(() => {
    if (todoRef.current) {
      hljs.highlightBlock(todoRef.current)
    }
    if (reducerRef.current) {
      hljs.highlightBlock(reducerRef.current)
    }
  }, [])
  return (
    <div className="reducers">
      <div className="reducers__content">
        <h2>State management with Reducers</h2>
        <p>
          Most often, handling many states in a component leads to issues with
          many ungrouped states, which can be burdensome and challenging to
          handle. The reducer pattern can be a helpful option in this situation.
          We can categorize states using reducers into certain actions that,
          when executed, can change the grouped states.
        </p>
        <p>
          This pattern allows the developer who uses it to control the
          component's and/or hook's state management, letting them manage state
          changes when events are sent.
        </p>
        <p>
          This Pattern is a technique used in React to manage component state by
          delegating control of the state to a “reducer” similar to that used in
          Redux. This reducer is a function that receives an action and the
          current state, and returns the new state. This approach allows for
          centralizing state update logic in one place, which improves
          maintainability and scalability of the application.
        </p>
        <p className="reducers__section_header">When to use</p>
        <ul>
          <li>
            It is used when more advanced state management is needed, especially
            in applications with complex state logic.
          </li>
          <li>
            For applications that benefit from predictability and traceability
            of state updates.
          </li>
          <li>When you want to centralize state update logic in one place.</li>
        </ul>
        <p className="reducers__section_header">When not to use</p>
        <ul>
          <li>
            In small or simple applications where state management is not
            complex and a more direct approach is sufficient.
          </li>
          <li>
            When the State Reducer pattern results in excessive complexity and
            makes it difficult to understand the data flow in the application.
          </li>
        </ul>
        <p className="reducers__section_header">Advantages</p>
        <ul>
          <li>
            Improves application maintainability by centralizing state update
            logic.
          </li>
          <li>
            Facilitates debugging and tracking of state changes by having a
            single place where updates occur.
          </li>
          <li>
            Promotes a more scalable and structured design of the application,
            especially in applications with a large amount of state logic.
          </li>
        </ul>
        <p className="reducers__section_header">Disadvantages</p>
        <ul>
          <li>
            Can introduce initial overhead when implementing reducer logic and
            associated infrastructure.
          </li>
          <li>
            Requires a deeper understanding of Redux concepts and state
            management patterns.
          </li>
        </ul>
        <h3 className="reducers__section_header">Example</h3>
        <p>
          In this example we have a todo list. There are a lot of different
          states for this list. We can add them, remove them, and mark them
          completed.
        </p>
        <pre>
          <code ref={todoRef}>{`
const TodoList: React.FC = () => {
  // Use the useReducer hook to manage state with the defined reducer
  const [state, dispatch] = useReducer(ToggleReducer, { todos: [] })

  // Functions to handle user interactions
  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: text })
  }

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  }

  const removeTodo = (id: number) => {
    dispatch({ type: 'REMOVE_TODO', payload: id })
  }

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
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
    </div>
  )
}

export default TodoList
`}</code>
        </pre>
        <p>
          You can see that the state is managed by the reducer. We fetch the
          data from the reducer and set the values of the state through the
          reducer by dispatching actions. The first thing we do is to bring in
          the state and the dispatch function from the reducer. We then have
          separate functions to handle the user interaction and based on those
          actions we will manage the state through the reducer through the
          dispatch function. We then have our todo list with all the user
          interactions connected.
        </p>
        <pre>
          <code ref={reducerRef}>{`
          // Definition of the action type for the reducer
type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number }

// Interface definition for the todo state
interface Todo {
  id: number
  text: string
  completed: boolean
}

// Interface definition for the global state
interface State {
  todos: Todo[]
}

// Reducing function to handle actions and update state
const ToggleReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.todos.length + 1,
            text: action.payload,
            completed: false,
          },
        ],
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      }
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    default:
      return state
  }
}

export default ToggleReducer
`}</code>
        </pre>
        <p>
          Below is the todo list. As you interact with this compoennt it uses
          the reducer for state management. This state is stored in memory,
          however, you could get more advanced and persist this state.
        </p>
        <TodoList />
      </div>
    </div>
  )
}

export default ReducerComponent
