import { useState, useEffect } from 'react';
import api from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import axios from 'axios';

export default function GameIndex() {
    const [games, setGames] = useState([]);
    const token = localStorage.getItem("token");
    const [user, setUser] = useState({});
    const navigate = useNavigate();

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
                <h2>All Game List</h2>
                {user.role === "admin" && (
                    <Link to="/games/create" className="btn btn-success" style={{
                        backgroundColor: "#1f1f1f",
                        borderRadius: "10px",
                    }}>ADD NEW GAME</Link>
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
                                    <Link to={`/games/edit/${g.id}`} className="btn btn-primary" style={{
                                        backgroundColor: "#1f1f1f",
                                        borderRadius: "10px"
                                    }}>EDIT</Link>
                                    <button className="btn btn-danger" onClick={() => deleteGame(g.id)} style={{
                                        backgroundColor: "#1f1f1f",
                                        borderRadius: "10px",
                                    }}>DELETE</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    // //DUMMY GAMES START
                    // <div style={styles.grid}>
                    //     <div style={styles.cardWrapper}>
                    //         <div
                    //             style={styles.card}
                    //             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    //             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    //             onClick={() => window.location.href = `/games/show`}
                    //         >
                    //             <img src="https://www.gamereactor.dk/media/66/tekken6_186604b.jpg" style={styles.image} />
                    //             <div style={styles.info}>
                    //                 <h5><strong>Tekken 6</strong></h5>
                    //                 <hr />
                    //                 <p><strong>Size:</strong> {formatSize(1500)}</p>
                    //                 <p><strong>Console:</strong> PSP</p>
                    //                 <p><strong>Genre:</strong> Fighting</p>
                    //             </div>
                    //         </div>
                    //     </div>
                    //     <div style={styles.cardWrapper}>
                    //         <div
                    //             style={styles.card}
                    //             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    //             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    //             onClick={() => window.location.href = `/games/show`}
                    //         >
                    //             <img src="https://th.bing.com/th/id/OIP.v-bq38uY8wFqjcgeJP0XnQHaKX?rs=1&pid=ImgDetMain" style={styles.image} />
                    //             <div style={styles.info}>
                    //                 <h5><strong>NFS Most Wanted</strong></h5>
                    //                 <hr />
                    //                 <p><strong>Size:</strong> {formatSize(4000)}</p>
                    //                 <p><strong>Console:</strong> PS2</p>
                    //                 <p><strong>Genre:</strong> Racing</p>
                    //             </div>
                    //         </div>
                    //     </div>
                    //     <div style={styles.cardWrapper}>
                    //         <div
                    //             style={styles.card}
                    //             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    //             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    //             onClick={() => window.location.href = `/games/show`}
                    //         >
                    //             <img src="https://m.media-amazon.com/images/M/MV5BZjIxYjdkNDMtYjBmNi00ZDgyLThhYTQtNmU2ZmE2MTg1NTVkXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg" style={styles.image} />
                    //             <div style={styles.info}>
                    //                 <h5><strong>Tekken 5</strong></h5>
                    //                 <hr />
                    //                 <p><strong>Size:</strong> {formatSize(3000)}</p>
                    //                 <p><strong>Console:</strong> PS2</p>
                    //                 <p><strong>Genre:</strong> Fighting</p>
                    //             </div>
                    //         </div>
                    //     </div>
                    //     <div style={styles.cardWrapper}>
                    //         <div
                    //             style={styles.card}
                    //             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    //             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    //             onClick={() => navigate(`/games/show`)}
                    //             >
                    //             <img src="https://th.bing.com/th/id/R.c87b6cbabd9e29151f1120b702249d34?rik=W0gpu9zryjvBjg&riu=http%3a%2f%2fwww.mobygames.com%2fimages%2fcovers%2fl%2f6878-rumble-racing-playstation-2-front-cover.jpg&ehk=KtgVa0Cz1B021wk8jGRWKMMyvExihZupQ2t9X6XSSZU%3d&risl=&pid=ImgRaw&r=0" style={styles.image} />
                    //             <div style={styles.info}>
                    //                 <h5><strong>Rumble Racing 2</strong></h5>
                    //                 <hr />
                    //                 <p><strong>Size:</strong> {formatSize(2000)}</p>
                    //                 <p><strong>Console:</strong> PS2</p>
                    //                 <p><strong>Genre:</strong> Racing</p>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                    // //DUMMY GAMES END (COMMENT TO DEACTIVATE)

                    // NO DATA 
                    <div style={styles.noData}>
                        <p>Data Belum Tersedia!</p>
                    </div>

                )}
            </div>
        </div>
    );
}
