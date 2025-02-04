import { useState, useEffect } from 'react';

import api from '../../api';

import { Link } from 'react-router-dom';

export default function GameIndex() {

    const [games, setGames] = useState([]);

    const fetchDataGames = async () => {

        await api.get('/api/games')
            .then(response => {
                setGames(response.data.data.data);
            })

    }

    useEffect(() => {

        fetchDataGames();

    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/games/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW GAME</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">name</th>
                                        <th scope="col">size</th>
                                        <th scope="col" style={{ 'width': '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        games.length > 0
                                            ? games.map((g, index) => (
                                                <tr key={index}>
                                                    <td className='text-center'>
                                                        <img src={g.image} alt={g.name} width="200" className='rounded' />
                                                    </td>
                                                    <td>{g.name}</td>
                                                    <td>{g.size}</td>
                                                    <td className="text-center">
                                                        <Link to={`/games/edit/${g.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                        <button className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                    </td>
                                                </tr>
                                            ))

                                            : <tr>
                                                <td colSpan="4" className="text-center">
                                                    <div className="alert alert-danger mb-0">
                                                        Data Belum Tersedia!
                                                    </div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}