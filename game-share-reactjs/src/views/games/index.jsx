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

    // Styling dalam objek JavaScript (Seperti ConsoleIndex.js)
    const styles = {
        container: {
            maxWidth: '800px',
            margin: '50px auto',
            padding: '20px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '15px',
            justifyContent: 'center',
        },
        cardWrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        card: {
            background: '#1f1f1f',
            borderRadius: '8px',
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            textAlign: 'center',
            padding: '10px',
            maxWidth: '400px',
            width: '100%',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            cursor: 'pointer',
        },
        cardHover: {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        },
        image: {
            width: '100%',
            aspectRatio: '2 / 3',
            objectFit: 'cover',
            borderRadius: '5px',
            marginBottom: '8px',
        },
        info: {
            flexGrow: 1,
            padding: '8px',
            fontSize: '14px',
        },
        actions: {
            marginTop: '8px',
            display: 'flex',
            justifyContent: 'center',
            gap: '5px',
        },
        btn: {
            padding: '6px 10px',
            fontSize: '12px',
            borderRadius: '5px',
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
        },
        btnPrimary: {
            backgroundColor: '#007bff',
            color: 'white',
        },
        btnDanger: {
            backgroundColor: '#dc3545',
            color: 'white',
        },
        btnSuccess: {
            backgroundColor: '#28a745',
            color: 'white',
        },
        noData: {
            textAlign: 'center',
            fontStyle: 'italic',
            color: '#888',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>ALL GAME</h2>
                {user.role === "admin" && (
                    <Link to="/games/create" style={{ ...styles.btn, ...styles.btnSuccess }}>ADD NEW GAME</Link>
                )}
            </div>
            <div style={styles.grid}>
                {games.length > 0 ? (
                    games.map((g, index) => (
                        <div key={index} style={styles.cardWrapper}>
                            <div
                                style={styles.card}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                onClick={() => window.location.href = `/games/show/${g.id}`}
                            >
                                <img src={`${apiConfig.baseUrl}/storage/${g.image}`} alt={g.name} style={styles.image} />
                                <div style={styles.info}>
                                    <h5><strong>{g.name}</strong></h5>
                                    <hr />
                                    <p><strong>Size:</strong> {formatSize(g.size)}</p>
                                    <p><strong>Console:</strong> {g.console.name}</p>
                                    <p><strong>Genre:</strong> {g.genre.name}</p>
                                </div>
                            </div>
                            {user.role === "admin" && (
                                <div style={styles.actions}>
                                    <Link to={`/games/edit/${g.id}`} style={{ ...styles.btn, ...styles.btnPrimary }}>EDIT</Link>
                                    <button onClick={() => deleteGame(g.id)} style={{ ...styles.btn, ...styles.btnDanger }}>DELETE</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div style={styles.grid}>
                        <div style={styles.cardWrapper}>
                            <div
                                style={styles.card}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                onClick={() => window.location.href = `/games/show`}
                            >
                                <img src="https://www.gamereactor.dk/media/66/tekken6_186604b.jpg" style={styles.image} />
                                <div style={styles.info}>
                                    <h5><strong>Nama</strong></h5>
                                    <hr />
                                    <p><strong>Size:</strong> {formatSize(1500)}</p>
                                    <p><strong>Console:</strong> Nama Console</p>
                                    <p><strong>Genre:</strong> Genre</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
