import React from 'react';

import MessageBlocked from './MessageBlocked.jsx';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUserRole, selectUserStatus } from '../redux/reducers/userSlice.js';

import { useNavigate } from 'react-router-dom';

//css-framework
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ModeIcon from '@mui/icons-material/Mode';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const MenuComponent = ({ isMobile, popupProfile }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRole = useSelector(selectUserRole);
    const userStatus = useSelector(selectUserStatus);

    const [blockedOpen, setBlockedOpen] = React.useState(false)

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
        <React.Fragment>
            {
                isMobile ?
                    null :
                    <React.Fragment>
                        <Tooltip title={t('navbar.logout')}>
                            <IconButton onClick={() =>{
                                dispatch(logout());
                                navigate('/');
                            }} color='error'>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t('navbar.home')}>
                            <Link to='/'>
                                <IconButton color='primary' align='center' size="large">
                                    <HomeIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </React.Fragment>

            }
            <Tooltip title={t('navbar.dashboard')}>
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
            </Tooltip>
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
                    (

                        userStatus === 'blocked' ?
                            <MenuItem onClick={() => {handleMenuClose(); setBlockedOpen(true)}}>
                                <AdminPanelSettingsIcon color="error" sx={{ mr: 1, height: 30, width: 30 }} />{t('navbar.admin')}
                            </MenuItem> :
                            <Link to="/admin">
                                <MenuItem onClick={handleMenuClose}>
                                    <AdminPanelSettingsIcon color="error" sx={{ mr: 1, height: 30, width: 30 }} />{t('navbar.admin')}
                                </MenuItem>
                            </Link>

                    )
                }
                <MenuItem
                    onClick={() => {
                        if (userStatus === 'blocked') {
                            handleMenuClose();
                            setBlockedOpen(true)
                        } else {
                            handleMenuClose();
                            handlePopupOpen();
                        }
                    }}
                >
                    <AssignmentIndIcon color="error" sx={{ mr: 1, height: 30, width: 30 }} /> {t('navbar.profile')}
                </MenuItem>
                <Divider />
                {
                    isMobile ?
                        <Link to='/'>
                            <MenuItem onClick={handleMenuClose}>
                                <HomeIcon sx={{ mr: 1, height: 30, width: 30 }} color="primary" /> {t('navbar.home')}
                            </MenuItem>
                        </Link> :
                        null
                }
                {
                    userStatus === 'blocked' ?
                        <MenuItem onClick={() => {handleMenuClose(); setBlockedOpen(true)}}>
                            <ModeIcon sx={{ mr: 1, height: 30, width: 30 }} color="primary" /> {t('navbar.account')}
                        </MenuItem> :
                        <Link to="/account">
                            <MenuItem onClick={handleMenuClose}>
                                <ModeIcon sx={{ mr: 1, height: 30, width: 30 }} color="primary" /> {t('navbar.account')}
                            </MenuItem>
                        </Link>
                }
                {
                    isMobile ?
                        <MenuItem onClick={() => {
                            dispatch(logout())
                            handleMenuClose()
                        }}>
                            <ListItemIcon >
                                <LogoutIcon color="primary" />
                            </ListItemIcon>
                            {t('navbar.logout')}
                        </MenuItem> :
                        null
                }
            </Menu>
            <MessageBlocked
                blockedOpen={blockedOpen}
                setBlockedOpen={setBlockedOpen}
            />
        </React.Fragment>
    );
}

export default MenuComponent