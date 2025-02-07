import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);

    await axios
      .post("http://localhost:8000/api/register", formData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  const handleBack = () => {
    navigate("/dashboard"); // Navigate to the root path
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card border-0 rounded shadow-lg p-4" style={{ backgroundColor: "#f9f9f9" }}>
            <div className="card-body">
              <h4 className="fw-bold text-center" style={{ color: "#007bff" }}>REGISTER</h4>
              <hr />
              <form onSubmit={registerHandler}>
                <div className="mb-3">
                  <label className="form-label fw-bold">NAME</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    style={{ borderRadius: "10px", border: "1px solid #007bff" }}
                  />
                  {validation.name && (
                    <div className="alert alert-danger mt-2" style={{ fontSize: "14px" }}>
                      {validation.name[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">EMAIL</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    style={{ borderRadius: "10px", border: "1px solid #007bff" }}
                  />
                  {validation.email && (
                    <div className="alert alert-danger mt-2" style={{ fontSize: "14px" }}>
                      {validation.email[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set Password"
                    style={{ borderRadius: "10px", border: "1px solid #007bff" }}
                  />
                  {validation.password && (
                    <div className="alert alert-danger mt-2" style={{ fontSize: "14px" }}>
                      {validation.password[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">CONFIRM PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirm Password"
                    style={{ borderRadius: "10px", border: "1px solid #007bff" }}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary p-3"
                    style={{
                      backgroundColor: "#007bff",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                  >
                    REGISTER
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleBack}
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
      >
        Back
      </button>
    </div>
  );
}

export default Register;
