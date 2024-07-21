import Header from "./components/header/header"
import Home from "./components/home/home"
import { Routes, Route } from "react-router-dom"

function App() {
 

  return (
    <div id="box">
      <Header/>
          <Routes>
              <Route path="/" element={<Home />} />     

          </Routes>
    </div>
  )
}

export default App
