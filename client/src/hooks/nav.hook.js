import React from 'react';
import axios from '../axios.js'

export const useNav = () => {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')) || null);
    
    

    const handleYourSpace = () => {

    }

    return {
        user, 
        setUser,
        handleYourSpace
    };
}