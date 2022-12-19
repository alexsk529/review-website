import React from 'react';
import Box from '@mui/material/Box';
import { Divider, ListItemIcon, IconButton } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ModeIcon from '@mui/icons-material/Mode';
import Logout from '@mui/icons-material/Logout';
import { NavContext } from '../context/NavContext.js';
import { useTranslation } from 'react-i18next';

const MenuMobile = () => {
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const {
        handleMobileMenuOpen,
        mobileMoreAnchorEl,
        isMobileMenuOpen,
        handleMobileMenuClose,
        handleProfile,
        handleYourSpace,
        handleLogOut
    } = React.useContext(NavContext)

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
                <MenuItem onClick={handleProfile}>
                    <AssignmentIndIcon sx={{ mr: 1, height: 34, width: 34 }} />{t('profile')}
                </MenuItem>
                <MenuItem onClick={handleYourSpace}>
                    <ModeIcon sx={{ mr: 1, height: 34, width: 34 }} />{t('account')}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout fontSize='small' />
                    </ListItemIcon>
                    {t('logout')}
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default MenuMobile