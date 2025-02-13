import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import api from '../../api';

export default function PublisherShow() {
    const { id } = useParams();
    const [publisher, setPublisher] = useState(null);

    useEffect(() => {
        const fetchPublisher = async () => {
            await api.get(`/api/publishers/${id}`)
                .then(response => {
                    setPublisher(response.data.data);
                })
                .catch(error => {
                    publisher.error("Error fetching publisher data", error);
                });
        };
        fetchPublisher();
    }, [id]);

    const formatSize = (size) => {
        return size < 1000 ? `${size}MB` : `${(size / 1000).toFixed(1)}GB`;
    };

    if (!publisher) {
        return <div style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>Loading...</div>;
    }

    const styles = {
        container: {
            maxWidth: '800px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#1f1f1f',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
        title: {
            marginBottom: '10px',
        },
        gamesList: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '20px',
        },
        gameCard: {
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#1f1f1f',
            textAlign: 'center',
            cursor: 'pointer',
        },
        gameTitle: {
            fontSize: '16px',
            marginTop: '10px',
        },
        gameDescription: {
            fontSize: '14px',
            color: '#666',
        },
        button: {
            display: 'inline-block',
            marginTop: '10px',
            padding: '8px 12px',
            borderRadius: '5px',
            backgroundColor: '#1f1f1f',
            border: '2px solid blue',
            color: 'white',
            textDecoration: 'none',
        },
        backButton: {
            display: 'block',
            marginTop: '20px',
            padding: '10px 15px',
            backgroundColor: '#1f1f1f',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
        },
        noGames: {
            fontStyle: 'italic',
            color: '#888',
            marginTop: '15px',
        },
        detailButton: {
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
            <h2 style={styles.title}>{publisher.name} Game List</h2>
            <hr />
            {publisher.games && publisher.games.length > 0 ? (
                <div style={styles.gamesList}>
                    {publisher.games.map(game => (
                        <div key={game.id} style={styles.gameCard}>
                            <h4 style={styles.gameTitle}>{game.name}</h4>
                            <p style={styles.gameDescription}><strong>Size:</strong> {formatSize(game.size)}</p>
                            <Link to={`/games/show/${game.id}`} rel="noopener noreferrer" style={styles.detailButton}>Detail</Link>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={styles.noGames}>No games available for this publisher.</p>
            )}

            <Link to="/publishers" style={styles.backButton}>Back to List</Link>
        </div>
    );
}
