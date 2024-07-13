import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../store';
import { Redirect } from 'react-router-dom';

const Private = () => {
    const { state } = useGlobalState();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/private', {
                headers: {
                    'Authorization': `Bearer ${state.token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                // Redirect to login
            }
        };
        fetchUser();
    }, [state.token]);

    if (!state.token) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            {user ? <h1>Welcome {user.username}</h1> : <p>Loading...</p>}
        </div>
    );
};

export default Private;
