import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import axios from 'axios';

export default function GameIndex() {
    const [games, setGames] = useState([]);
    const token = localStorage.getItem("token");
    const [user, setUser] = useState({});

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get("http://localhost:8000/api/user").then((response) => {
                setUser(response.data);
            });
        }
    }, [token]);

    const fetchDataGames = async () => {
        await api.get('/api/games')
            .then(response => {
                setGames(response.data.data.data);
            });
    };

    useEffect(() => {
        fetchDataGames();
    }, []);

    const deleteGame = async (id) => {
        await api.delete(`/api/games/${id}`)
            .then(() => {
                fetchDataGames();
            });
    };

    const formatSize = (size) => {
        if (size < 1000) {
            return size + 'MB';
        }
        return (size / 1000).toFixed(1) + 'GB';
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>ALL GAME</h2>
                {user.role === "admin" && (
                    <Link to="/games/create" className="btn btn-success">ADD NEW GAME</Link>
                )}
            </div>
            <div className="game-grid">
                {games.length > 0 ? (
                    games.map((g, index) => (
                        <div key={index} className="game-card-wrapper">
                            <Link to={`/games/show/${g.id}`} className="game-card">
                                <img src={`${apiConfig.baseUrl}/storage/${g.image}`} alt={g.name} className="game-image" />
                                <div className="game-info">
                                    <h5><strong>{g.name}</strong></h5>
                                    <hr />
                                    <p><strong>Size:</strong> {formatSize(g.size)}</p>
                                    <p><strong>Console:</strong> {g.console.name}</p>
                                    <p><strong>Genre:</strong> {g.genre.name}</p>
                                </div>
                            </Link>
                            {user.role === "admin" && (
                                <div className="game-actions">
                                    <Link to={`/games/edit/${g.id}`} className="btn btn-primary">EDIT</Link>
                                    <button onClick={() => deleteGame(g.id)} className="btn btn-danger">DELETE</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-data">Data Belum Tersedia!</div>
                )}
            </div>
        </div>
    );
}

// CSS in JS
const styles = `
.game-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
    justify-content: center;
}

.game-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.game-card {
    background: #1f1f1f;
    border-radius: 8px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    text-align: center;
    padding: 10px;
    max-width: 180px;
    width: 100%;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.game-card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.game-image {
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 8px;
}

.game-info {
    flex-grow: 1;
    padding: 8px;
    font-size: 14px;
}

.game-actions {
    margin-top: 8px;
    display: flex;
    justify-content: center;
    gap: 5px;
}

.game-actions .btn {
    padding: 6px 10px;
    font-size: 12px;
}

.no-data {
    text-align: center;
    font-size: 18px;
    color: red;
}`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);