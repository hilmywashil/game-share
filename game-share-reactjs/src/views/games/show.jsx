import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import apiConfig from '../../api/apiConfig';
import './styles/GameIndex.css';

export default function ShowGame() {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetchGameDetails();
    }, []);

    const fetchGameDetails = async () => {
        try {
            const response = await api.get(`/api/games/${id}`);
            setGame(response.data.data);
        } catch (error) {
            console.error('Error fetching game details:', error);
        }
    };

    if (!game) {
        return <div className="alert alert-danger text-center">Game not found!</div>;
    }

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center">{game.name}</h2>
            <div className="game-detail">
                <img src={`${apiConfig.baseUrl}/storage/${game.image}`} alt={game.name} className="game-image-large" />
                <div className="game-info">
                    <p><strong>Size:</strong> {game.size < 1000 ? `${game.size}MB` : `${(game.size / 1000).toFixed(1)}GB`}</p>
                    <p><strong>Console:</strong> {game.console.name}</p>
                    <p><strong>Genre:</strong> {game.genre.name}</p>
                    <p><strong>Description:</strong> {game.description}</p>
                    <Link to="/games" className="btn btn-secondary">Back to Games</Link>
                </div>
            </div>
        </div>
    );
}
