import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import LangSwitch from './LangSwitch.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';

import axios from '../axios.js';
import SuppMenu from './SuppMenu.jsx';
import MenuMobile from './MenuMobile.jsx';
import MenuDesktop from './MenuDesktop.jsx';
import LoginBox from './LoginBox.jsx';
import { NavContext } from '../context/NavContext.js';

import { useTranslation } from 'react-i18next';

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
    const {user, setUser} = React.useContext(NavContext);
    React.useEffect(() => {
        axios.get('/api/get-user', { withCredentials: true })
            .then(res =>{
                res.data && setUser(res.data)
                res.data && console.log(res.data);
            })
            .then(()=> {
                user && console.log('user is: ', user);
            })
            .catch(e => console.log(e))
    }, [])

    const { t } = useTranslation();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="">
                <Toolbar>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <LangSwitch mr={4} />
                        <ThemeSwitch />
                    </Box>
                    <SuppMenu/>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder={t('search')}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    {
                        user ?
                            <MenuDesktop/> :
                            <LoginBox xs={'none'} md={"flex"} alignItems={"center"} loginExists={true} />
                    }
                    {
                        user ?
                            <MenuMobile/> :
                            <LoginBox xs={"flex"} md={"none"} alignItems={""} loginExists={false}/>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

