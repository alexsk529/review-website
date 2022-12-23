import React from 'react';

export const useProfile = () => {
    const [popupOpen, setPopupOpen] = React.useState(false);
    console.log(popupOpen);
    const handlePopupOpen = () => {
        setPopupOpen(true)
    }
    const popupProfile = {
        popupOpen,
        setPopupOpen,
        handlePopupOpen
    }

    return popupProfile
}