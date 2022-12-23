import React from 'react';

export const useMenu = () => {
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

    return {
        menuMob,
        menuDesk,
    };
}