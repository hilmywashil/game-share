import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import apiConfig from "../../api/apiConfig";

function EditProfile() {
    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [previewProfile, setPreviewProfile] = useState(null);
    const [previewCover, setPreviewCover] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchUserData();
    }, [token, navigate]);

    const fetchUserData = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
            const response = await axios.get(`${apiConfig.baseUrl}/api/user`);
            const userData = response.data;
            setUser(userData);
            setName(userData.name || "");
            setRole(userData.role || "");
            setPreviewProfile(userData.profile_photo ? `${apiConfig.baseUrl}/storage/${userData.profile_photo}` : null);
            setPreviewCover(userData.cover_photo ? `${apiConfig.baseUrl}/storage/${userData.cover_photo}` : null);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === "profile") {
            setProfilePhoto(file);
            setPreviewProfile(URL.createObjectURL(file));
        } else if (type === "cover") {
            setCoverPhoto(file);
            setPreviewCover(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("role", role);
        if (profilePhoto) formData.append("profile_photo", profilePhoto);
        if (coverPhoto) formData.append("cover_photo", coverPhoto);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
            await axios.post(`${apiConfig.baseUrl}/api/user/update`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Profil berhasil diperbarui.",
                confirmButtonText: "Konfirmasi"
            }).then(() => {
                navigate('/dashboard');
            });

            fetchUserData();
        } catch (error) {
            console.error("Error updating profile:", error);
            Swal.fire({
                icon: "error",
                title: "Gagal!",
                text: "Terjadi kesalahan saat memperbarui profil.",
            });
        }
    };

    const handleDeletePhoto = async (type) => {
        let url = "";
        let message = "";

        if (type === "profile") {
            url = `${apiConfig.baseUrl}/api/profile/delete-photo`;
            message = "Foto profil berhasil dihapus.";
        } else if (type === "cover") {
            url = `${apiConfig.baseUrl}/api/profile/delete-cover`;
            message = "Cover photo berhasil dihapus.";
        }

        Swal.fire({
            title: "Hapus Foto?",
            text: "Foto ini akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(url, {}, { headers: { Authorization: `Bearer ${token}` } })
                    .then(() => {
                        Swal.fire("Dihapus!", message, "success");
                        if (type === "profile") {
                            setPreviewProfile(null);
                            setProfilePhoto(null);
                        } else {
                            setPreviewCover(null);
                            setCoverPhoto(null);
                        }
                    })
                    .catch(() => {
                        Swal.fire("Error", "Gagal menghapus foto", "error");
                    });
            }
        });
    };

    return (
        <div className="container" style={{ maxWidth: "600px", marginTop: "50px" }}>
            <div className="card p-4 shadow-lg" style={{ backgroundColor: "#1f1f1f", borderRadius: "10px", color: "white" }}>
                <h2 className="text-center">Edit Profil</h2>

                {/* Cover Photo */}
                <div className="text-center mb-3">
                    <label htmlFor="coverUpload">
                        <img
                            src={previewCover || "https://operaparallele.org/wp-content/uploads/2023/09/Placeholder_Image.png"}
                            alt="Cover Preview"
                            className="img-fluid"
                            style={{ width: "100%", height: "180px", objectFit: "cover", cursor: "pointer", borderRadius: "10px" }}
                        />
                    </label>
                    <input id="coverUpload" type="file" className="d-none" onChange={(e) => handleFileChange(e, "cover")} />
                    <p style={{ marginTop: '10px' }}>Klik untuk mengubah foto</p>
                    {previewCover && (
                        <button className="btn btn-danger btn-sm mt-2" onClick={() => handleDeletePhoto("cover")}>
                            Hapus Cover Photo
                        </button>
                    )}
                </div>

                {/* Profile Photo */}
                <div className="text-center mb-3">
                    <label htmlFor="profileUpload">
                        <img
                            src={previewProfile || "https://wallpapers.com/images/hd/default-pfp-for-discord-txq6kevqhvi68op5.jpg"}
                            alt="Profile Preview"
                            className="rounded-circle"
                            style={{ width: "120px", height: "120px", objectFit: "cover", cursor: "pointer" }}
                        />
                    </label>
                    <input id="profileUpload" type="file" className="d-none" onChange={(e) => handleFileChange(e, "profile")} />
                    <p style={{ marginTop: '10px' }}>Klik untuk mengubah</p>
                    {previewProfile && (
                        <button className="btn btn-danger btn-sm mt-2" onClick={() => handleDeletePhoto("profile")}>
                            Hapus Foto Profil
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nama</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Simpan Perubahan</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
