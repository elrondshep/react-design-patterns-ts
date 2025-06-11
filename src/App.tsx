import router from '@/routes'
import '@/styles/App.scss'
import { RouterProvider } from 'react-router-dom'

export default function App() {
  return <RouterProvider router={router} />
}
