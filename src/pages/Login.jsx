import React, { useState } from 'react';
import axios from 'axios';
import "../App.css";
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ibadId, setIbadId] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error messages
        try {
            const response = await axios.post('http://localhost/api_endpoint_for_anambra_state_form/login.php', { email, password });
            if (response.data.status === 'success') {
                setIbadId(response.data.ibad_id);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred while trying to log in.');
        }
    };

    return (
        <div className="container-fluid bg-dark" id='container'>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-5" id='formbak'>
                            <div className="text-center mb-5" id='texts'>
                                <h1 className="h3 mb-3 fw-bold">{ibadId ? 'IBAD ID' : 'Login into your Account'}</h1>
                                {!ibadId && <p className="text">Enter your credentials to access your ID</p>}
                            </div>

                            {/* Conditionally render form or IBAD ID */}
                            {!ibadId ? (
                                <form onSubmit={handleLogin}>
                                    <div className="col-md-12">
                                        <label htmlFor="email" className="form-label text-white">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder='example@gmail.com'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='col-md-12'>
                                        <label htmlFor="password" className="form-label text-white">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            id="password"
                                            placeholder='qwer456yu'
                                            className="form-control"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="d-grid gap-2 mt-5">
                                        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                                    </div>
                                    {error && <p className="text-danger mt-3">{error}</p>}
                                </form>
                            ) : (
                                <div className="text-center">
                                    <p className="text-white fs-4">Your IBAD ID is: <span className="fw-bold">{ibadId}</span></p>
                                    <Link to={`/`} className='btn btn-light mt-3'>Go to Home</Link>
                                </div>
                            )}

                            {/* Optionally add link after displaying IBAD ID */}
                            {!ibadId && (
                                <p className='mt-3 text-white text-center'>You don't have an IBAD_ID? <Link to={`/`} className='text-white'>Generate Yours</Link></p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;