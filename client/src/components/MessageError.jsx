import React from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { useTheme } from '@mui/material/styles';

const ErrorMessage = ({ errors, isError, setIsError }) => {
    const { t } = useTranslation();

    const reviewLabel = t('createReview.review');
    const gradeLabel = t('createReview.grade');

    const theme = useTheme();

    const WHITISH = '#E0DFDF'

    const handleClose = () => setIsError(false)


    return (
        <Dialog
            open={isError}
            onClose={handleClose}
            sx={{}}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: theme.palette.warning.main, color: WHITISH, p: { xs: 1, sm: 3 } }}>
                {t('createReview.errors.error')} <IconButton onClick={handleClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: theme.palette.warning.main, color: WHITISH, p: {xs: 0, sm:2} }}>
                <Typography variant='h1' sx={{ fontSize: 18, width: '100%' }} align='left'></Typography>
                <List>
                    {errors.map((err, i) => (
                        <ListItem 
                        key={i} 
                        variant='body1' 
                        sx={{
                             mt: 1,  
                             display: 'flex', 
                             justifyContent: 'flexStart',
                             alignItems: {xs: 'start', sm: 'center' }, 
                             flexDirection:{xs: 'column', sm:'row'} 
                              }} 
                             align='left'
                             >
                                <div>
                                {t('createReview.errors.field')} <b><i>"{err}"</i></b>&nbsp;
                                </div>
                                <div>
                            {
                                err === reviewLabel ?
                                    t('createReview.errors.manySymbols') :
                                    err === gradeLabel ?
                                        t('createReview.errors.blank') :
                                        t('createReview.errors.twoSymbols')
                            }.
                            </div>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}

export default ErrorMessage;