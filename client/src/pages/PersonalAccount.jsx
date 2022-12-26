import React from 'react';
//mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
//utils
import { useTranslation } from 'react-i18next';

const PersonalAccount = () => {

    const { t } = useTranslation();
    return (
        <Container>
            <Box align='left'>
                <Tooltip title={t('account.delete')}>
                    <IconButton
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Container>
    );
}

export default PersonalAccount;