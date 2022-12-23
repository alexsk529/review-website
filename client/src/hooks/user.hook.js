import React from 'react';
import axios from '../axios.js';

export const useUser = () => {
    const [user, setUser] = React.useState();
    async function handleLogOut () {
        await axios.post('/api/auth/logout', {}, { withCredentials: true })
            .then(res => {
                setUser(res.data.user)
            })
            .catch(e => console.log(e))
    }

    return {
        user,
        setUser,
        handleLogOut
    }
}