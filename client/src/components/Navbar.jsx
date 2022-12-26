import React from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, selectUserEmail } from '../redux/userSlice.js';

//css-framework
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';

//custom-comps.
import LangSwitch from './LangSwitch.jsx';
import ThemeSwitch from './ThemeSwitch.jsx';
import SuppMenu from './SuppMenu.jsx';
import MenuComponent from './MenuComponent.jsx';
import LoginBox from './LoginBox.jsx';
import ProfilePopup from './ProfilePopup.jsx';
import { Search, SearchIconWrapper, StyledInputBase } from './NavBarComponents.js'

//utils
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const dispatch = useDispatch();
    const userEmail = useSelector(selectUserEmail)
    const userStatus = useSelector(state => state.user.status)

    React.useLayoutEffect(() => {
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
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <MenuComponent
                                        popupProfile={popupProfile}
                                        isMobile={false}
                                    />
                                </Box>
                                <ProfilePopup popupProfile={popupProfile} />
                            </React.Fragment> :
                            <LoginBox xs={'none'} md={"flex"} alignItems={"center"} loginExists={true} />
                    }
                    {
                        userEmail ?
                            <React.Fragment>
                                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                    <MenuComponent
                                        popupProfile={popupProfile}
                                        isMobile={true}
                                    />
                                </Box>
                                <ProfilePopup popupProfile={popupProfile} />
                            </React.Fragment> :
                            <LoginBox xs={"flex"} md={"none"} alignItems={""} loginExists={false} />
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

