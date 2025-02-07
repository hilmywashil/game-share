import { useState, useEffect } from 'react';

import api from '../../api';

import { Link } from 'react-router-dom';

export default function ConsoleIndex() {

    const [consoles, setConsoles] = useState([]);

    const fetchDataConsoles = async () => {

        await api.get('/api/consoles')
            .then(response => {
                setConsoles(response.data.data.data);
            })

    }

    useEffect(() => {

        fetchDataConsoles();

    }, []);

    const deleteConsole = async (id) =>{
        await api.delete(`/api/consoles/${id}`)
        .then(() => {
            fetchDataConsoles();
        })
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/consoles/create" className="btn btn-md btn-success rounded shadow border-0 mb-3">ADD NEW CONSOLE</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead className="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col" style={{ 'width': '15%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        consoles.length > 0
                                            ? consoles.map((c, index) => (
                                                <tr key={index}>
                                                    <td>{c.name}</td>
                                                    <td className="text-center">
                                                        <Link to={`/consoles/edit/${c.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">EDIT</Link>
                                                        <button onClick={() => deleteConsole(c.id)} className="btn btn-sm btn-danger rounded-sm shadow border-0">DELETE</button>
                                                    </td>
                                                </tr>
                                            ))

                                            : <tr>
                                                <td colSpan="9" className="text-center">
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