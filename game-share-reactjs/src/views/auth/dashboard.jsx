import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      const response = await axios.get("http://localhost:8000/api/user");
      setUser(response.data);
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
          <div
            className="card border-0 rounded shadow-lg"
            style={{ padding: "40px", backgroundColor: "#f9f9f9" }}
          >
            <div className="card-body">
              <h1 className="fw-bold" style={{ color: "#007bff" }}>
                WEBSITE PEMINJAMAN BARANG SEKOLAH
              </h1>

              {isLoading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <>
                  <p className="text-uppercase" style={{ fontSize: "18px", color: "#333" }}>
                    Selamat Datang, <strong>{user.name || "User"}</strong>
                  </p>
                  <hr />
                  <div className="mt-4">
                    <button
                      onClick={logoutHandler}
                      className="btn btn-lg btn-danger me-3"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="btn btn-lg btn-primary"
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
