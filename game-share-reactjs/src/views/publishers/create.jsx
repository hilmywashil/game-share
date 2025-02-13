import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../../api';

import axios from 'axios';

export default function PublisherCreate() {

    const token = localStorage.getItem("token");
    const fetchDataToken = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    useEffect(() => {
        fetchDataToken();
    }, []);

    const [name, setName] = useState('');

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const storePublisher = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);

        await api.post('/api/publishers', formData)
            .then(() => {

                navigate('/publishers');

            })
            .catch(error => {

                setErrors(error.response.data);
            })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storePublisher}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Name</label>
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Publisher Name" />
                                    {
                                        errors.name && (
                                            <div className="alert alert-danger mt-2">
                                                Nama Publisher tidak boleh kosong!
                                            </div>
                                        )
                                    }
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}