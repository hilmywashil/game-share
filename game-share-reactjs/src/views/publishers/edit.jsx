import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import api from '../../api';

export default function PublisherEdit() {

    const [name, setName] = useState('');

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();

    const fetchDetailPublisher = async () => {

        await api.get(`/api/publishers/${id}`)
            .then(response => {

                setName(response.data.data.name);
            })
    }

    useEffect(() => {

        fetchDetailPublisher();

    }, []);

    const updatePublisher = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('_method', 'PUT')

        await api.post(`/api/publishers/${id}`, formData)
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
                            <form onSubmit={updatePublisher}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Update Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Title Post" />
                                    {
                                        errors.name && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.name[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}