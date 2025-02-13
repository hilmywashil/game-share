import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import axios from 'axios';

export default function PublisherIndex() {
    const [publishers, setPublishers] = useState([]);
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

    const navigate = useNavigate();

    const fetchDataPublishers = async () => {
        await api.get('/api/publishers')
            .then(response => {
                setPublishers(response.data.data.data);
            })
    }

    useEffect(() => {
        fetchDataPublishers();
    }, []);

    const deletePublisher = async (id) => {
        await api.delete(`/api/publishers/${id}`)
            .then(() => {
                fetchDataPublishers();
            })
    }

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
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
        },
        card: {
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#1f1f1f',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s',
        },
        cardHover: {
            transform: 'scale(1.05)',
        },
        actions: {
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
        },
        btn: {
            padding: '8px 12px',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
            border: 'none',
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
            padding: '10px 15px',
        },
        noData: {
            textAlign: 'center',
            fontStyle: 'italic',
            color: '#888',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Publisher List</h2>
                {user.role === "admin" && (
                    <Link to="/publishers/create" style={{ ...styles.btn, ...styles.btnSuccess }}>ADD NEW CONSOLE</Link>
                )}
            </div>
            <div style={styles.grid}>
                {publishers.length > 0 ? publishers.map((c, index) => (
                    <div
                        key={index}
                        style={styles.card}
                        onClick={() => navigate(`/publishers/show/${c.id}`)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <h3>{c.name}</h3>
                        {user.role === "admin" && (
                            <div style={styles.actions}>
                                <Link
                                    to={`/publishers/edit/${c.id}`}
                                    style={{ ...styles.btn, ...styles.btnPrimary }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    EDIT
                                </Link>
                                <button
                                    onClick={(e) => { e.stopPropagation(); deletePublisher(c.id); }}
                                    style={{ ...styles.btn, ...styles.btnDanger }}
                                >
                                    DELETE
                                </button>
                            </div>
                        )}
                    </div>
                )) : (
                    // //DUMMY CONSOLES
                    // <div style={styles.grid}>
                    //     <div
                    //         style={styles.card}
                    //         onClick={() => navigate(`/publishers/show`)}
                    //         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    //         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    //     >
                    //         <h3>PS2</h3>
                    //     </div>
                    //     <div
                    //         style={styles.card}
                    //         onClick={() => navigate(`/publishers/show`)}
                    //         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    //         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    //     >
                    //         <h3>PSP</h3>
                    //     </div>
                    //     <div
                    //         style={styles.card}
                    //         onClick={() => navigate(`/publishers/show`)}
                    //         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    //         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    //     >
                    //         <h3>PS3</h3>
                    //     </div>
                    //     <div
                    //         style={styles.card}
                    //         onClick={() => navigate(`/publishers/show`)}
                    //         onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    //         onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    //     >
                    //         <h3>Nintendo</h3>
                    //     </div>
                    // </div>
                    // //DUMMY CONSOLES END

                    //NO DATA 
                    <div style={styles.noData}>
                        <p>Data Belum Tersedia!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
