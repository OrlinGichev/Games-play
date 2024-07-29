import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext";
import Path from "./paths";

import Header from "./components/header/header";
import Home from "./components/home/home";
import GameList from "./components/game-list/GameList";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import GameCreate from "./components/game-create/GameCreate";
import GamesDetails from "./components/game-details/GameDetails";
import Logout from "./components/logout/Logout";
import GameEdit from "./components/game-edit/GameEdit";
import AuthGuard from "./components/guards/AuthGuard";


function App() {
  
  return (
    <AuthProvider>
        <div id="box">
          <Header />
              <Routes>
                  <Route path={Path.Home} element={<Home />} />     
                  <Route path="/games" element={<GameList />} /> 
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />                 
                  <Route path="/games/:gameId" element={<GamesDetails />} />          
                 
                  <Route element={<AuthGuard/>} >
                      <Route path="/game-create" element={<GameCreate />} />
                      <Route path={Path.GameEdit} element={<GameEdit />} />
                      <Route path={Path.Logout} element={<Logout />} />
                  </Route>
              </Routes>
        </div>
    </AuthProvider>
  )
}

export default App
