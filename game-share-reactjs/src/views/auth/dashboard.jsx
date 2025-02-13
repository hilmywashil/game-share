import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import apiConfig from "../../api/apiConfig";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const defaultProfileImage = "https://wallpapers.com/images/hd/default-pfp-for-discord-txq6kevqhvi68op5.jpg";

  const fetchData = async () => {
    setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:8000/api/user");
      setUser(response.data);

      const profileImage = response.data.profile_photo
        ? `${apiConfig.baseUrl}/storage/${response.data.profile_photo}`
        : defaultProfileImage;

      setPreviewImage(profileImage);
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
    navigate('/');
  }

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
          <div className="card border-0 rounded shadow-lg" style={{ padding: "40px", backgroundColor: "#1f1f1f" }}>
            <div className="card-body">
              <h1 className="fw-bold" style={{ color: "white" }}>PROFILE</h1>
              <div>
                <img
                  src={previewImage}
                  alt="Profile"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowModal(true)}
                />
              </div>
              {isLoading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <p className="text" style={{ fontSize: "18px", color: "white" }}>
                    Selamat Datang, <strong>{user.name || "User"}!</strong>
                    <br />
                    <i>{user.role || "No role specified"}</i>
                  </p>
                  <Link to="/profile" className="btn btn-success">
                    Upload Photo Profile
                  </Link>
                  <hr />
                  <div className="mt-4">
                    <button onClick={logoutHandler} className="btn btn-lg btn-danger me-3">
                      Logout
                    </button>
                    <button onClick={handleBack} className="btn btn-lg btn-primary me-3">
                      Home
                    </button>
                  </div>
                  <br />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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