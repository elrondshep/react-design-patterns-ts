// Definition of the action type for the reducer
type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'COMPLETE_TODO'; payload: number }
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
const TodoReducer = (state: State, action: Action): State => {
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
    case 'COMPLETE_TODO':
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

export default TodoReducer
