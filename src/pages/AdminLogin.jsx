import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://ibad.asatuyouth.org/api/admin_login.php', {
                email,
                password,
            });
            if (response.data.status === 'success') {
                setIsLoggedIn(true);
                setError('');
                navigate('/AdminDashboard');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    if (isLoggedIn) {
        return <AdminDashboard />;
    }

    return (
        <div className="container-fluid bg-dark" id='container'>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-5" id='formbak'>
                            <div className="text-center mb-5" id='texts'>
                                {/* <img src={logo} alt="Logo" className="img-fluid mb-4" style={{maxHeight: '100px'}} /> */}
                                <h1 className="h3 mb-3 fw-bold">Admin Login</h1>
                                <p className="text">Enter your credentials to access your ID</p>
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className='col-md-12'>
                                    <label htmlFor="email" className="form-label text-white">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder='example@gmail.com'
                                        className={`form-control`}
                                        id="email"
                                        name="email"
                                    />
                                </div>
                                <div className='col-md-12'>
                                    <label htmlFor="password" className="form-label text-white">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        placeholder='qwer456yu'
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={`form-control`}
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-5">
                                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                                </div>
                            </form>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminLogin;
