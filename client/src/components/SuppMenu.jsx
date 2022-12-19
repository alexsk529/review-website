import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider } from '@mui/material';

import LangSwitch from './LangSwitch.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';

export default function SuppMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box sx={{ display: { md: 'none' } }}>
            <IconButton
                onClick={handleMenuOpen}
            >
                <SettingsIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleClose}
            >
                <MenuItem>
                    <LangSwitch mr={0} />
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ThemeSwitch />
                </MenuItem>
            </Menu>
        </Box>
    )
};