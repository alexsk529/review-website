import React from 'react';
import axios from '../axios.js'

export const useNav = () => {
    const [user, setUser] = React.useState();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const menuMob = {
        mobileMoreAnchorEl,
        setMobileMoreAnchorEl,
        isMobileMenuOpen,
        handleMobileMenuOpen,
        handleMobileMenuClose
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const menuDesk = {
        anchorEl,
        setAnchorEl,
        isMenuOpen,
        handleMenuOpen,
        handleMenuClose
    }

    async function handleLogOut () {
        await axios.post('/api/auth/logout', {}, { withCredentials: true })
            .then(res => {
                setUser(res.data.user)
            })
            .then(()=> {
                handleMenuClose();
                handleMobileMenuClose();
            })
            .catch(e => console.log(e))
    }

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
        menuMob,
        menuDesk,
        handleLogOut,
        user, 
        setUser,
        popupProfile,
        handleYourSpace
    };
}