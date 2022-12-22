import React from 'react';
import Navbar from '../components/Navbar.jsx'
import ProfilePopup from '../components/ProfilePopup.jsx';

import Box from '@mui/material/Box'

const MainPage = () => {
    return (
        <Box>
            <Navbar />
            <ProfilePopup />
        </Box>
    );
}

export default MainPage