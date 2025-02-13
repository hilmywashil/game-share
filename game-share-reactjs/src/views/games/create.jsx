import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../../api';

import axios from 'axios';

export default function GameCreate() {

    const token = localStorage.getItem("token");
    const fetchDataToken = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    useEffect(() => {
        fetchDataToken();
    }, []);

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [publisher_id, setPublisherId] = useState('');
    const [genre_id, setGenreId] = useState('');
    const [console_id, setConsoleId] = useState('');
    const [link_download, setLink] = useState('');

    //CONSOLES
    const [consoles, setConsoles] = useState([]);
    const fetchDataConsoles = async () => {
        await api.get('/api/consoles')
            .then(response => {
                setConsoles(response.data.data.data);
            });
    };
    useEffect(() => {
        fetchDataConsoles();
    }, []);
    //CONSOLES

    //PUBLISHERS
    const [publishers, setPublishers] = useState([]);
    const fetchDataPublishers = async () => {
        await api.get('/api/publishers')
            .then(response => {
                setPublishers(response.data.data.data);
            });
    };
    useEffect(() => {
        fetchDataPublishers();
    }, []);
    //PUBLISHERS

    //GENRES
    const [genres, setGenres] = useState([]);
    const fetchDataGenres = async () => {
        await api.get('/api/genres')
            .then(response => {
                setGenres(response.data.data.data);
            });
    };
    useEffect(() => {
        fetchDataGenres();
    }, []);
    //GENRES


    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    const storeGame = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image', image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('size', size);
        formData.append('publisher_id', publisher_id);
        formData.append('genre_id', genre_id);
        formData.append('console_id', console_id);
        formData.append('link_download', link_download);

        await api.post('/api/games', formData)
            .then(() => {

                navigate('/games');

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
                            <form onSubmit={storeGame}>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input type="file" onChange={handleFileChange} className="form-control" />
                                    {
                                        errors.image && (
                                            <div className="alert alert-danger mt-2">
                                                Gambar Game tidak boleh kosong!
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Name</label>
                                    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Game Name" />
                                    {
                                        errors.name && (
                                            <div className="alert alert-danger mt-2">
                                                Nama Game tidak boleh kosong!
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Description</label>
                                    <textarea className="form-control" onChange={(e) => setDescription(e.target.value)} rows="5" placeholder="Game Description"></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Size (MB)</label>
                                    <input type="number" className="form-control" onChange={(e) => setSize(e.target.value)} placeholder="Game Size in MB" />
                                    {
                                        errors.size && (
                                            <div className="alert alert-danger mt-2">
                                                Size Game tidak boleh kosong!
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Publisher</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => setPublisherId(e.target.value)}
                                        value={publisher_id}
                                    >
                                        <option value="nothing">Publisher :</option>
                                        {publishers.length > 0 ? publishers.map((publisher) => (
                                            <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                                        )) : <option>Data Belum Tersedia!</option>}
                                    </select>
                                    {errors.kategori_id && <div className="alert alert-danger mt-2">Mohon pilih Kategori Barang</div>}

                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Genre</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => setGenreId(e.target.value)}
                                        value={genre_id}
                                    >
                                        <option value="nothing">Genre :</option>
                                        {genres.length > 0 ? genres.map((genre) => (
                                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                                        )) : <option>Data Belum Tersedia!</option>}
                                    </select>
                                    {errors.kategori_id && <div className="alert alert-danger mt-2">Mohon pilih Kategori Barang</div>}

                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Console</label>
                                    <select
                                        className="form-control"
                                        onChange={(e) => setConsoleId(e.target.value)}
                                        value={console_id}
                                    >
                                        <option value="nothing">Console :</option>
                                        {consoles.length > 0 ? consoles.map((console) => (
                                            <option key={console.id} value={console.id}>{console.name}</option>
                                        )) : <option>Data Belum Tersedia!</option>}
                                    </select>
                                    {errors.kategori_id && <div className="alert alert-danger mt-2">Mohon pilih Kategori Barang</div>}

                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Link Download</label>
                                    <input type="text" className="form-control" onChange={(e) => setLink(e.target.value)} placeholder="Game Link" />
                                    {
                                        errors.link_download && (
                                            <div className="alert alert-danger mt-2">
                                                Isi Link Download!
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