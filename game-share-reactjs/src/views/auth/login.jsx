import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const loginHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        await axios.post('http://localhost:8000/api/login', formData)
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
        navigate('/');
    };

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card border-0 rounded shadow-lg" style={{ backgroundColor: "#1f1f1f", padding: "30px" }}>
                        <div className="card-body">
                            <h3 className="fw-bold text-center" style={{ color: "white" }}>Login ( Coming Soon )</h3>
                            <hr />
                            {validation.message && (
                                <div className="alert alert-danger text-center">
                                    {validation.message}
                                </div>
                            )}
                            <form onSubmit={loginHandler}>
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Email</label>
                                    <input
                                        type="email"
                                        className="form-control p-3"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {validation.email && (
                                    <div className="alert alert-danger">
                                        {validation.email[0]}
                                    </div>
                                )}
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Password</label>
                                    <input
                                        type="password"
                                        className="form-control p-3"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {validation.password && (
                                    <div className="alert alert-danger">
                                        {validation.password[0]}
                                    </div>
                                )}
                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary p-3"
                                        style={{
                                            backgroundColor: "#1f1f1f",
                                            borderRadius: "10px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        LOGIN
                                    </button>
                                </div>
                                <br></br>
                                <div className="d-grid gap-2">
                                    <a href={'/register'} className="btn btn-success p-2"
                                        style={{
                                            backgroundColor: "#1f1f1f",
                                            borderRadius: "10px",
                                        }}
                                    >Doesn't have an account? Click me to Register!</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Back Button */}
            <button
                onClick={handleBack}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#1f1f1f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s',
                }}
            >
                Back
            </button>
        </div>
    );
}

export default Login;
