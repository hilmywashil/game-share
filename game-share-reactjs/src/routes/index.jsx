import { Routes, Route } from "react-router-dom";

import Home from '../views/home.jsx';

import GameIndex from '../views/games/index.jsx';
import GameCreate from '../views/games/create.jsx';
import GameEdit from '../views/games/edit.jsx';

function RoutesIndex() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/games" element={<GameIndex />} />
            <Route path="/games/create" element={<GameCreate />} />
            <Route path="/games/edit/:id" element={<GameEdit />} />

        </Routes>
    )
}

export default RoutesIndex