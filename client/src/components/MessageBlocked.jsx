import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { useTheme } from '@mui/material/styles';

const MessageBlocked = ({ blockedOpen, setBlockedOpen }) => {
    const { t } = useTranslation();

    const theme = useTheme();

    const WHITISH = '#E0DFDF';

    const handleClose = () => {
        setBlockedOpen(false)
    }

    return (
        <React.Fragment>
            <Dialog
                open={blockedOpen}
                onClose={handleClose}
                sx={{}}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: theme.palette.success.main, color: WHITISH }}>
                    {t('block.title')}<IconButton sx={{ color: WHITISH }} onClick={handleClose}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: theme.palette.success.main, color: WHITISH }}>
                    {t('block.prohibited')}
                    <List>
                        <ListItem>
                            {t('block.review')}
                        </ListItem>
                        <ListItem>
                            {t('block.like')}
                        </ListItem>
                        <ListItem>
                            {t('block.comment')}
                        </ListItem>
                    </List>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default MessageBlocked;