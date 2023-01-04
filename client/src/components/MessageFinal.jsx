import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { useTheme } from '@mui/material/styles';

const MessageFinal = ({ isSuccess, setIsSuccess, isServerError, setIsServerError }) => {
    const { t } = useTranslation();

    const theme = useTheme();

    const WHITISH = '#E0DFDF';

    const handleClose = () => {
        setIsSuccess(false)
        setIsServerError(false)
    }

    return (
        <React.Fragment>
            <Dialog
                open={isSuccess}
                onClose={handleClose}
                sx={{}}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: theme.palette.success.main, color: WHITISH }}>
                    {t('createReview.congrat')}<IconButton sx={{ color: WHITISH }} onClick={handleClose}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: theme.palette.success.main, color: WHITISH }}>
                    {t('createReview.success')}
                </DialogContent>
            </Dialog>

            <Dialog
                open={isServerError}
                onClose={handleClose}
                sx={{}}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: theme.palette.warning.main, color: WHITISH }}>
                    {t('createReview.wentWrong')}<IconButton sx={{ color: WHITISH }} onClick={handleClose}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: theme.palette.warning.main, color: WHITISH }}>
                    {t('createReview.again')}
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default MessageFinal;