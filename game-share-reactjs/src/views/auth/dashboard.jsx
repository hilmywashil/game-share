import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setIsLoading(true); // Start loading
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .get("http://localhost:8000/api/user")
      .then((response) => {
        setUser(response.data);
      })
      .finally(() => {
        setIsLoading(false); // End loading
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchData(); // Fetch user data
    }
  }, [token, navigate]);

  const logoutHandler = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin logout?");
    if (confirmLogout) {
      setIsLoading(true); // Start loading during logout
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios
        .post("http://localhost:8000/api/logout")
        .then(() => {
          localStorage.removeItem("token");
          navigate("/login");
        })
        .finally(() => {
          setIsLoading(false); // End loading after logout
        });
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="container" style={{ marginTop: "60px", textAlign: "center" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div
            className="card border-0 rounded shadow-lg"
            style={{ padding: "40px", backgroundColor: "#f9f9f9" }}
          >
            <div className="card-body">
              <h1 className="fw-bold" style={{ color: "#007bff" }}>
                WEBSITE PEMINJAMAN BARANG SEKOLAH
              </h1>

              {/* Show loading spinner while fetching data */}
              {isLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <p className="text-uppercase" style={{ fontSize: "18px", color: "#333" }}>
                    Selamat Datang, <strong>{user.name}</strong>
                  </p>
                  <hr />
                  <div className="mt-4">
                    <button
                      onClick={logoutHandler}
                      className="btn btn-lg btn-danger me-3"
                      style={{
                        borderRadius: "10px",
                        padding: "10px 20px",
                        fontWeight: "bold",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                    >
                      Logout
                    </button>
                    <button
                      onClick={handleBack}
                      className="btn btn-lg btn-primary"
                      style={{
                        borderRadius: "10px",
                        padding: "10px 20px",
                        fontWeight: "bold",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                    >
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
    </div>
  );
}

export default Dashboard;
