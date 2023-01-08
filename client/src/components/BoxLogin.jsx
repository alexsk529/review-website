import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import { Icon44LogoVk } from '@vkontakte/icons';
import { useTranslation } from 'react-i18next';

const BoxLogin = ({ xs, md, alignItems, loginExists }) => {
    const [isLoadingGoogle, setIsLoadingGoogle] = React.useState(false)
    const [isLoadingVK, setIsLoadingVK] = React.useState(false)

    const handleAuthClick = (provider) => () => {
        //window.open(`${process.env.REACT_APP_URL || 'http://localhost:5000'}/api/auth/${provider}`, '_self')
        window.open(`https://review-website.onrender.com/api/auth/${provider}`, '_self')
        provider === 'google' ? setIsLoadingGoogle(true) : setIsLoadingVK(true)
    }

    const { t } = useTranslation();

    return (
        <Box sx={{ display: { xs: xs, md: md, alignItems: alignItems } }}>
            {loginExists && <Typography
                variant="body1"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }}
                color='primary'
            >
                {t('navbar.login')}
            </Typography>}
            <IconButton
                color="error"
                onClick={handleAuthClick('google')}
            >
                {
                    isLoadingGoogle ?
                        <CircularProgress size={20} color="error" /> :
                        <GoogleIcon />
                }
            </IconButton>
            <IconButton
                color='primary'
                onClick={handleAuthClick('vkontakte')}
            >
                {
                    isLoadingVK ?
                        <CircularProgress size={20} /> :
                        <Icon44LogoVk />
                }
            </IconButton>
        </Box>
    );
}

export default BoxLogin;
