import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import apiConfig from '../../api/apiConfig';

export default function ShowGame() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const handleDownload = async () => {
        try {
            await api.post(`/api/games/${id}/increment-downloads`);
            setGame(prevGame => ({
                ...prevGame,
                downloads: prevGame.downloads + 1
            }));
        } catch (error) {
            console.error('Error incrementing downloads:', error);
        }

        window.location.href = `${game.link_download}`;
    };

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
        return <div style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>Loading...</div>;
    }

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: '50px',
            marginBottom: '50px',
        },
        gameDetail: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
            maxWidth: '800px',
            width: '100%',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#1f1f1f',
        },
        gameImage: {
            width: '250px',
            height: 'auto',
            borderRadius: '8px',
        },
        gameInfo: {
            flex: 1,
        },
        backButton: {
            display: 'inline-block',
            marginTop: '15px',
            padding: '10px 15px',
            backgroundColor: '#1f1f1f',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            border: '1px solid red',

        },
        downloadButton: {
            display: 'inline-block',
            marginTop: '15px',
            padding: '10px 15px',
            backgroundColor: '#1f1f1f',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            border: '1px solid #cc6ce7',

        },
    };

    return (
        <div style={styles.container}>
            <h2>{game.name} ({game.console.name})</h2>
            <div style={styles.gameDetail}>
                <img
                    src={`${apiConfig.baseUrl}/storage/${game.image}`}
                    alt={game.name}
                    style={styles.gameImage}
                />
                <div style={styles.gameInfo}>
                    <p><strong>Name:</strong> {game.name}</p>
                    <p><strong>Size:</strong> {game.size < 1000 ? `${game.size}MB` : `${(game.size / 1000).toFixed(1)}GB`}</p>
                    <p><strong>Console:</strong> {game.console.name}</p>
                    <p><strong>Genre:</strong> {game.genre.name}</p>
                    <p><strong>Description:</strong> {game.description}</p>
                    <p><strong>Downloads:</strong> {game.downloads}</p>
                    <button
                        className="btn btn-primary"
                        style={{ backgroundColor: "#1f1f1f", borderRadius: "10px" }}
                        onClick={handleDownload}
                    >
                        Download
                    </button>
                    {/* <Link to="/games" style={styles.backButton}>Back to Games</Link> */}
                </div>
            </div>
        </div>
    );
}
