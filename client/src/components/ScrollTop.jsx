import React from 'react';
import { styled } from '@mui/material/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';

import { BACKGROUND } from '../Const';

const Scroll = styled('div') ( ({theme}) => ({
    zIndex: 2,
    position: 'fixed',
    bottom: '2vh',
    backgroundColor: '#DCDCDC',
    borderRadius: '50%',
    "&:hover, &.Mui-focusVisible": {
        transition: '0.3s',
        backgroundColor: BACKGROUND
    },
    left: '3%'
}))


const ScrollTop = ({ showBelow }) => {
    const [show, setShow] = React.useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    const handleClick = () => {
        window['scrollTo']({ top: 0, behavior: 'smooth' })
    }

    React.useEffect(() => {
        if (showBelow) {
            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Scroll>
            {
                show &&
                <IconButton onClick={handleClick} className="toTop" size="large" sx={{'&:hover':{color: '#F562F0'}}}>
                    <ExpandLessIcon />
                </IconButton>
            }
        </Scroll>
    )
}

export default ScrollTop;