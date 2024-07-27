import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import * as authService from "./services/authService";
import AuthContext from "./contexts/authContext";
import Path from "./paths";

import Header from "./components/header/header";
import Home from "./components/home/home";
import GameList from "./components/game-list/GameList";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import GameCreate from "./components/game-create/GameCreate";
import GamesDetails from "./components/game-details/GameDetails";

function App() {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  // accessToken,
  // email,
  // username,
  // _id

  const loginSubmitHandler = async values =>{

    const result = await authService.login(values.email, values.password);

    setAuth(result);
    navigate(Path.Home);
  };

  const registerSubmitHandler = async (values) =>{
    const result = await authService.register(values.email, values.password);
    setAuth(result);
    navigate(Path.Home);
    console.log(result);
  }

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    username: auth.username || auth.email,
    email: auth.email,
    isAuthenticated: !!auth.email,
  }

  return (
    <AuthContext.Provider value={values}>
        <div id="box">
          <Header />
              <Routes>
                  <Route path={Path.Home} element={<Home />} />     
                  <Route path="/games" element={<GameList />} /> 
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} /> 
                  <Route path="/game-create" element={<GameCreate />} />
                  <Route path="/games/:gameId" element={<GamesDetails />} />
              </Routes>
        </div>
    </AuthContext.Provider>
  )
}

export default App
