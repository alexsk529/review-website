import React from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, selectUserEmail } from '../redux/userSlice.js';

//css-framework
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

//custom-comps.
import LangSwitch from './LangSwitch.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';
import SuppMenu from './SuppMenu.jsx';
import MenuMobile from './MenuMobile.jsx';
import MenuDesktop from './MenuDesktop.jsx';
import LoginBox from './LoginBox.jsx';
import ProfilePopup from './ProfilePopup.jsx';

//util
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
    const dispatch = useDispatch();
    const userEmail = useSelector(selectUserEmail)
    const userStatus = useSelector(state => state.user.status)

    React.useEffect(() => {
        if (userStatus === 'idle') dispatch(fetchUser())
    }, [userStatus, dispatch])

    const { t } = useTranslation();

    const [popupOpen, setPopupOpen] = React.useState(false);
    const handlePopupOpen = () => {
        setPopupOpen(true)
    }
    const popupProfile = {
        popupOpen,
        setPopupOpen,
        handlePopupOpen
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="">
                <Toolbar>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <LangSwitch mr={4} />
                        <ThemeSwitch />
                    </Box>
                    <SuppMenu />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder={t('navbar.search')}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    {
                        userEmail ?
                            <React.Fragment>
                                <MenuDesktop
                                    popupProfile={popupProfile}
                                />
                                <ProfilePopup popupProfile={popupProfile} />
                            </React.Fragment> :
                            <LoginBox xs={'none'} md={"flex"} alignItems={"center"} loginExists={true} />
                    }
                    {
                        userEmail ?
                            <React.Fragment>
                                <MenuMobile
                                    popupProfile={popupProfile}
                                />
                                <ProfilePopup popupProfile={popupProfile}/>
                            </React.Fragment>:
                            <LoginBox xs={"flex"} md={"none"} alignItems={""} loginExists={false} />
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

