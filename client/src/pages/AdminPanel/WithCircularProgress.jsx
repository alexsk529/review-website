import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const WithCircularProgress = ({ showProgress, title, onClick, children, color, placement }) => {
    return (
        <>
            {
                showProgress === true ?
                    <CircularProgress /> :
                    <Tooltip title={title} align='left' placement={placement}>
                        <IconButton
                            color={color}
                            onClick={onClick}
                        >
                            {children}
                        </IconButton>
                    </Tooltip>
            }
        </>
    );
}

export default WithCircularProgress;