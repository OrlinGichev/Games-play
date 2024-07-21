import { Routes, Route } from "react-router-dom"
import Header from "./components/header/header"
import Home from "./components/home/home"
import GameList from "./components/game-list/GameList"
import Login from "./components/login/Login"
import Register from "./components/register/Register"

function App() {
 

  return (
    <div id="box">
      <Header />
          <Routes>
              <Route path="/" element={<Home />} />     
              <Route path="/games" element={<GameList />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> 
          </Routes>
    </div>
  )
}

export default App
