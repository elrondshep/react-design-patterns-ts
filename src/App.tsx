import router from '@/routes'
import '@/styles/App.scss'
import { RouterProvider } from 'react-router-dom'

function App() {
  return <RouterProvider router={router} />
}

export default App
