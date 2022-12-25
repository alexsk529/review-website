import React from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUserRole } from '../redux/userSlice.js';

//css-framework
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ModeIcon from '@mui/icons-material/Mode';

import { useTranslation } from 'react-i18next';

const MenuDesktop = ({ popupProfile }) => {
    const dispatch = useDispatch();
    const userRole = useSelector(selectUserRole)
    
    const menuId = 'primary-search-account-menu';
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const { handlePopupOpen } = popupProfile

    const { t } = useTranslation();

    return (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title={t('logout')}>
                <IconButton onClick={()=>dispatch(logout())} color='error'>
                    <LogoutIcon />
                </IconButton>
            </Tooltip>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="primary"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id={menuId}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                {
                    userRole === "admin" && 
                    <MenuItem>
                        <AdminPanelSettingsIcon color="error" sx={{ mr: 1, height: 30, width: 30 }}/>{t('navbar.admin')}
                    </MenuItem>
                }
                <MenuItem
                    onClick={() => {
                        handlePopupOpen();
                        handleMenuClose();
                    }}
                >
                    <AssignmentIndIcon color="error" sx={{ mr: 1, height: 30, width: 30 }} /> {t('navbar.profile')}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>
                    <ModeIcon sx={{ mr: 1, height: 30, width: 30 }} color="primary" /> {t('navbar.account')}
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default MenuDesktop