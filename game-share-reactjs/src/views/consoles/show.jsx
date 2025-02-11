import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import api from '../../api';

export default function ConsoleShow() {
    const { id } = useParams();
    const [console, setConsole] = useState(null);

    useEffect(() => {
        const fetchConsole = async () => {
            await api.get(`/api/consoles/${id}`)
                .then(response => {
                    setConsole(response.data.data);
                })
                .catch(error => {
                    console.error("Error fetching console data", error);
                });
        };
        fetchConsole();
    }, [id]);

    const formatSize = (size) => {
        if (size < 1000) {
            return size + 'MB';
        }
        return (size / 1000).toFixed(1) + 'GB';
    };

    if (!console) {
        return <div className="console-loading">Loading...</div>;
    }

    return (
        <div className="console-container">
            <div className="console-detail-card">
                <h2 className="console-detail-title">{console.name} Game List</h2>
                <hr />
                {console.games && console.games.length > 0 ? (
                    <div className="console-games-list">
                        {console.games.map(game => (
                            <div key={game.id} className="console-game-card">
                                <img src={`${apiConfig.baseUrl}/storage/${game.image}`} alt={game.name} className="console-game-image" />
                                <h4 className="console-game-title">{game.name}</h4>
                                <p className="console-game-description"><strong>Size:</strong> {formatSize(game.size)}</p>
                                <a href={game.link_download} target="_blank" rel="noopener noreferrer" className="console-btn">Download</a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="console-no-games">No games available for this console.</p>
                )}
                
                <Link to="/consoles" className="console-btn">Back to List</Link>
            </div>
        </div>
    );
}
