import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import apiConfig from "../../api/apiConfig";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const defaultProfileImage = "https://wallpapers.com/images/hd/default-pfp-for-discord-txq6kevqhvi68op5.jpg";
  const defaultCoverImage = "https://operaparallele.org/wp-content/uploads/2023/09/Placeholder_Image.png";

  const fetchData = async () => {
    setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:8000/api/user");
      setUser(response.data);

      const profileImage = response.data.profile_photo
        ? `${apiConfig.baseUrl}/storage/${response.data.profile_photo}`
        : defaultProfileImage;

      const coverImg = response.data.cover_photo
        ? `${apiConfig.baseUrl}/storage/${response.data.cover_photo}`
        : defaultCoverImage;

      setPreviewImage(profileImage);
      setCoverImage(coverImg);
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [token, navigate]);

  const handleBack = () => {
    navigate("/");
  };

  const logoutHandler = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      setIsLoading(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        await axios.post("http://localhost:8000/api/logout");
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        localStorage.removeItem("token");
        setIsLoading(false);
        navigate("/login");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "60px", textAlign: "center" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 rounded shadow-lg" style={{ backgroundColor: "#1f1f1f" }}>
            <div className="card-body">

              {/* Cover Photo */}
              <div style={{ position: "relative", width: "100%", height: "250px", overflow: "hidden", borderRadius: "10px 10px 0 0" }}>
                <img
                  src={coverImage}
                  alt="Cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div style={{
                position: "relative",
                marginTop: "-80px", /* Turunkan lebih jauh */
              }}>
                <img
                  src={previewImage}
                  alt="Profile"
                  style={{
                    width: "140px", /* Perbesar */
                    height: "140px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "5px solid #1f1f1f", /* Border lebih besar */
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowModal(true)}
                />
              </div>

              {/* Informasi User */}
              <div style={{ marginTop: "20px" }}>
                {isLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>
                    <p className="text" style={{ fontSize: "30px", color: "white" }}>
                      <strong>{user.name || "User"}</strong>
                    </p>
                    <i style={{ fontSize: "20px", color: "white" }}>Role : {user.role || "No role specified"}</i>
                    <hr />
                    <div className="mt-4">
                      <Link to={'/edit-profile'} className="btn btn-lg btn-primary me-3">
                        Edit
                      </Link>
                      <button onClick={logoutHandler} className="btn btn-lg btn-danger me-3">
                        Logout
                      </button>

                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Foto Profil */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} onClick={() => setShowModal(false)}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">Foto Profil</h2>
              </div>
              <div className="modal-body text-center">
                <img src={previewImage} alt="Profile" className="img-fluid" style={{ borderRadius: "10px" }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
