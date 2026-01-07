import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  const { isAuthenticated } = useAuth()
  
  return isAuthenticated ? <Home /> : <Login />
}

export default App
