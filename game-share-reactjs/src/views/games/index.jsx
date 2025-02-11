import { useState, useEffect } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import './styles/GameIndex.css';
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
                    <div className="alert alert-danger text-center">Data Belum Tersedia!</div>
                )}
            </div>
        </div>
    );
}
