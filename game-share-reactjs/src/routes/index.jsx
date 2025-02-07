import { Routes, Route } from "react-router-dom";

import Home from '../views/home.jsx';

import AuthCheck from "./AuthCheck.jsx";
import AdminCheck from "./AdminCheck.jsx";

//Games
import GameIndex from '../views/games/index.jsx';
import GameCreate from '../views/games/create.jsx';
import GameEdit from '../views/games/edit.jsx';

//Authorization
import Login from '../views/auth/login.jsx';
import Register from '../views/auth/register.jsx';
import Dashboard from '../views/auth/dashboard.jsx';
import Unauthorized from "../views/auth/unauthorized.jsx";

function RoutesIndex() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            {/* Games */}
            <Route path="/games" element={<AuthCheck><GameIndex /></AuthCheck>} />
            <Route path="/games/create" element={<AdminCheck><GameCreate /></AdminCheck>} />
            <Route path="/games/edit/:id" element={<GameEdit />} />

            {/* Authorization */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

        </Routes>
    )
}

export default RoutesIndex