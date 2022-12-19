import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import { Icon44LogoVk } from '@vkontakte/icons';
import { useTranslation } from 'react-i18next';

const LoginBox = ({xs, md, alignItems, loginExists}) => {
    const handleAuthClick = (provider) => () => {
        window.open(`https://review-website.onrender.com/api/auth/${provider}`, '_self')
        //window.open(`http://localhost:5000/api/auth/${provider}`, '_self')
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
                {t('login')}
            </Typography>}
            <IconButton
                color="error"
                onClick={handleAuthClick('google')}
            >
                <GoogleIcon />
            </IconButton>
            <IconButton
                color='primary'
                onClick={handleAuthClick('vkontakte')}
            >
                <Icon44LogoVk />
            </IconButton>
        </Box>
    );
}

export default LoginBox;
