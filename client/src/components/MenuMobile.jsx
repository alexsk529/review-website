import React from 'react';
import Box from '@mui/material/Box';
import { Divider, ListItemIcon, IconButton } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ModeIcon from '@mui/icons-material/Mode';
import Logout from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { NavContext } from '../context/NavContext.js';
import { useTranslation } from 'react-i18next';

const MenuMobile = () => {
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const {menuMob, handleLogOut} = React.useContext(NavContext);
    const {
        handleMobileMenuOpen,
        mobileMoreAnchorEl,
        isMobileMenuOpen,
        handleMobileMenuClose
    } = menuMob

    const {popupProfile, user} = React.useContext(NavContext);
    const { handlePopupOpen } = popupProfile

    const { t } = useTranslation();

    return (
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
            >
                <MoreIcon />
            </IconButton>
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
            >
                {
                    user.role === "admin" && 
                    <MenuItem>
                        <AdminPanelSettingsIcon color="error" sx={{ mr: 1, height: 34, width: 34 }} />{t('navbar.admin')}
                    </MenuItem>
                }
                <MenuItem onClick={()=> {
                    handlePopupOpen();
                    handleMobileMenuClose();
                }}>
                    <AssignmentIndIcon color="error" sx={{ mr: 1, height: 34, width: 34 }} />{t('navbar.profile')}
                </MenuItem>
                <MenuItem >
                    <ModeIcon color="primary"  sx={{ mr: 1, height: 34, width: 34 }} />{t('navbar.account')}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon >
                        <Logout color="primary"  />
                    </ListItemIcon>
                    {t('navbar.logout')}
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default MenuMobile