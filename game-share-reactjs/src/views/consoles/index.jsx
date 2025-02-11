import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import './styles/ConsoleIndex.css';
import axios from 'axios';

export default function ConsoleIndex() {
    const [consoles, setConsoles] = useState([]);
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

    const fetchDataConsoles = async () => {
        await api.get('/api/consoles')
            .then(response => {
                setConsoles(response.data.data.data);
            })
    }

    useEffect(() => {
        fetchDataConsoles();
    }, []);

    const deleteConsole = async (id) => {
        await api.delete(`/api/consoles/${id}`)
            .then(() => {
                fetchDataConsoles();
            })
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="header">
                <h2>Console List</h2>
                {user.role == "admin" && (
                    <Link to="/consoles/create" className="btn btn-success">ADD NEW CONSOLE</Link>
                )}
            </div>
            <div className="console-grid">
                {consoles.length > 0 ? consoles.map((c, index) => (
                    <div key={index} className="console-card" onClick={() => navigate(`/consoles/show/${c.id}`)}>
                        <h3>{c.name}</h3>
                        {user.role == "admin" && (
                            <div className="actions">
                                <Link to={`/consoles/edit/${c.id}`} className="btn btn-primary" onClick={(e) => e.stopPropagation()}>EDIT</Link>
                                <button onClick={(e) => { e.stopPropagation(); deleteConsole(c.id); }} className="btn btn-danger">DELETE</button>
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="no-data">
                        <p>Data Belum Tersedia!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
