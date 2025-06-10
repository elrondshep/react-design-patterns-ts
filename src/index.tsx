import App from '@/App'
import ReactDOM from 'react-dom/client'

const rootElement = document.querySelector('#root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
