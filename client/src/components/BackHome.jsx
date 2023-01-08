import React from 'react';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { BACKGROUND } from '../Const';

const Back = styled('div') ( ({theme}) => ({
    zIndex: 2,
    position: 'fixed',
    top: '15vh',
    backgroundColor: '#DCDCDC',
    borderRadius: '50%',
    opacity: '0.45',
    "&:hover, &.Mui-focusVisible": {
        opacity: '1',
        transition: '0.3s',
        backgroundColor: BACKGROUND
    },
    left: '3%'
}))

const BackHome = () => {
   

    return ( 
        <Link to='/'>
            <Back>
            <IconButton size="large" sx={{'&:hover':{color: '#F562F0'}}}>
                    <HomeIcon />
                </IconButton>
            </Back>
        </Link>
     );
}
 
export default BackHome;