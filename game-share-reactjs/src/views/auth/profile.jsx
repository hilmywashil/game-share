import { useState, useEffect } from 'react';
import api from '../../api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const token = localStorage.getItem("token");

    const fetchDataToken = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };

    useEffect(() => {
        fetchDataToken();
    }, []);

    const navigate = useNavigate();

    const [profilePhoto, setProfilePhoto] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfilePhoto(file);
        setPreview(URL.createObjectURL(file)); // Tampilkan preview gambar
    };

    const handleBack = async () => {
        navigate('/dashboard');
    };

    const handleUpload = async () => {
        if (!profilePhoto) {
            alert("Please select an image first!");
            return;
        }

        const formData = new FormData();
        formData.append('profile_photo', profilePhoto);

        await api.post('/api/user/update-photo', formData)
            .then(() => {

                navigate('/dashboard');

            })
            .catch(error => {

                setErrors(error.response.data);
            })
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Update Profile Photo</h2>
            <hr />
            {preview && <img src={preview} alt="Preview" style={styles.image} />}
            <p>*disarankan upload foto dengan rasio 1:1 agar foto tidak terpotong.</p>
            <div style={styles.formGroup}>
                <input type="file" accept="image/*" className="btn btn-success" onChange={handleFileChange}
                    style={{
                        backgroundColor: "#1f1f1f",
                        borderRadius: "10px",
                    }} />

                <button onClick={handleUpload} className="btn btn-primary"
                    style={{
                        backgroundColor: "#1f1f1f",
                        borderRadius: "10px",
                    }}>Upload</button>
                <button onClick={handleBack} className="btn btn-danger"
                    style={{
                        backgroundColor: "#1f1f1f",
                        borderRadius: "10px",
                    }}>Batal</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#1f1f1f',
    },
    heading: {
        marginBottom: '20px',
        color: 'white',
    },
    image: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    fileInput: {
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};