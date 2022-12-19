import React from 'react';
import axios from '../axios.js'

export const useNav = () => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const [user, setUser] = React.useState();
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

    const handleProfile = () => {

    }

    const handleYourSpace = () => {

    }

    return {
        mobileMoreAnchorEl, 
        isMobileMenuOpen, 
        handleMobileMenuOpen, 
        handleMobileMenuClose, 
        anchorEl, 
        isMenuOpen, 
        handleMenuOpen, 
        handleMenuClose, 
        handleLogOut,
        handleProfile, 
        handleYourSpace,
        user, 
        setUser
    };
}