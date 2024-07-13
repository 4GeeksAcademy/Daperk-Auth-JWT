import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../storeContext';

const Navbar = () => {
    const { dispatch, store } = useStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'logout' });
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Daperk JWT Project</span>
                </Link>
                <div className="ml-auto">
                    {store.token ? (
                        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn btn-primary">Login</button>
                            </Link>
                            <Link to="/signup" className="ml-2">
                                <button className="btn btn-secondary">Signup</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
