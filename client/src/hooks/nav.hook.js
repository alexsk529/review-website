import React from 'react';
import axios from '../axios.js'

export const useNav = () => {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')) || null);
    
    const [popupOpen, setPopupOpen] = React.useState(false);
    const handlePopupOpen = () => {
        setPopupOpen(true)
    }
    const popupProfile = {
        popupOpen,
        setPopupOpen,
        handlePopupOpen
    }

    const handleYourSpace = () => {

    }

    return {
        user, 
        setUser,
        popupProfile,
        handleYourSpace
    };
}