import { Routes, Route } from "react-router-dom";

import Home from '../views/home.jsx';

// import AuthCheck from "./AuthCheck.jsx";
// import AdminCheck from "./AdminCheck.jsx";

//Games
import GameIndex from '../views/games/index.jsx';
import ShowGame from "../views/games/show.jsx";
import GameCreate from '../views/games/create.jsx';
import GameEdit from '../views/games/edit.jsx';

//Consoles
import ConsoleIndex from "../views/consoles/index.jsx";
import ConsoleCreate from "../views/consoles/create.jsx";
import ConsoleShow from "../views/consoles/show.jsx";
import ConsoleEdit from "../views/consoles/edit.jsx";

//Publisher
import PublisherIndex from "../views/publishers/index.jsx";
import PublisherCreate from "../views/publishers/create.jsx";
import PublisherShow from "../views/publishers/show.jsx";
import PublisherEdit from "../views/publishers/edit.jsx";

//Genre
import GenreIndex from "../views/genres/index.jsx";
import GenreCreate from "../views/genres/create.jsx";
import GenreShow from "../views/genres/show.jsx";

//Authorization
import Login from '../views/auth/login.jsx';
import Register from '../views/auth/register.jsx';
import Dashboard from '../views/auth/dashboard.jsx';
import Unauthorized from "../views/auth/unauthorized.jsx";
import AuthAdminCheck from "./AuthAdminCheck.jsx";

function RoutesIndex() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            {/* Games */}
            <Route path="/games" element={<GameIndex />} />
            <Route path="/games/show/:id" element={<ShowGame />} />
            <Route path="/games/create" element={<AuthAdminCheck><GameCreate /></AuthAdminCheck>} />
            <Route path="/games/edit/:id" element={<AuthAdminCheck><GameEdit /></AuthAdminCheck>} />

            {/* Consoles */}
            <Route path="/consoles" element={<ConsoleIndex />} />
            <Route path="/consoles/show/:id" element={<ConsoleShow />} />
            <Route path="/consoles/create" element={<AuthAdminCheck><ConsoleCreate /></AuthAdminCheck>} />
            <Route path="/consoles/edit/:id" element={<AuthAdminCheck><ConsoleEdit /></AuthAdminCheck>} />

            {/* Publishers */}
            <Route path="/publishers" element={<PublisherIndex />} />
            <Route path="/publishers/show/:id" element={<PublisherShow />} />
            <Route path="/publishers/create" element={<AuthAdminCheck><PublisherCreate /></AuthAdminCheck>} />
            <Route path="/publishers/edit/:id" element={<AuthAdminCheck><PublisherEdit /></AuthAdminCheck>} />

            {/* Genres */}
            <Route path="/genres" element={<GenreIndex />} />
            <Route path="/genres/show/:id" element={<GenreShow />} />
            <Route path="/genres/create" element={<AuthAdminCheck><GenreCreate /></AuthAdminCheck>} />

            {/* Authorization */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

        </Routes>
    )
}

export default RoutesIndex