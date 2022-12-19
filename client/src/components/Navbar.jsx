import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Tooltip, Typography } from '@mui/material';

import { Icon44LogoVk } from '@vkontakte/icons';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';

import LangSwitch from './LangSwitch.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';

import axios from '../axios.js';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  })
);

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
);

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  })
);

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    
    const handleMenuClose = (post) => {
        setAnchorEl(null);
        handleMobileMenuClose();
        if (post) handlerLogOut();
    };
    
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
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
            <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
            <MenuItem onClick={handleMenuClose}>Личный кабинет</MenuItem>
        </Menu>
    );
    
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
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
            <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
            <MenuItem onClick={handleMenuClose}>Личный кабинет</MenuItem>
            <MenuItem onClick={()=> handleMenuClose(true)}>Выйти</MenuItem>
      </Menu>
    );    

    const [user, setUser] = React.useState();
    React.useEffect(()=> {
        axios.get('/api/get-user', {withCredentials: true})
        .then(res => res.data && setUser(res.data))
        .catch(e => console.log(e))
    }, [])
    
    const handlerAuthClick = (provider) => () => {
       window.open(`${process.env.REACT_APP_URL || 'http://localhost:5000'}/api/auth/${provider}`,'_self')
    }

    const handlerLogOut = async () => {
        await axios.post('/api/auth/logout',{}, {withCredentials: true})
            .then(res => {
                console.log('response ', res);
                setUser(res.data.user)
            })
            .catch(e=> console.log(e))
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="">
                <Toolbar>
                    <LangSwitch/>
                    <Box sx={{ flexGrow: 0.1 }} />
                    <ThemeSwitch/>
                    <Search>
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    {
                        user ?
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Tooltip title="LOG OUT">
                                <IconButton onClick={handlerLogOut} color='error'>
                                    <LogoutIcon/>
                                </IconButton>
                            </Tooltip>
                            <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="primary"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Box> :
                        <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                            <Typography
                                variant="body1"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }}
                                color='primary'
                            >
                                LOG IN
                            </Typography>
                            <IconButton 
                                color="error"
                                onClick={handlerAuthClick('google')}
                            >
                                <GoogleIcon/>
                            </IconButton>
                            <IconButton 
                                color='primary'
                                onClick={handlerAuthClick('vkontakte')}
                            >
                                <Icon44LogoVk/>
                            </IconButton>
                        </Box>
                    }
                    {
                        user ?
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
                        </Box> :
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton 
                                color="error"
                                onClick={handlerAuthClick('google')}
                            >
                                <GoogleIcon/>
                            </IconButton>
                            <IconButton 
                                color='primary'
                                onClick={handlerAuthClick('vkontakte')}
                            >
                                <Icon44LogoVk/>
                            </IconButton>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>        
    );
}
 
