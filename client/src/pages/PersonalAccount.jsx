import React from 'react';

import { Link } from 'react-router-dom';

import './PersonalAccount.css';
//mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CarpenterOutlinedIcon from '@mui/icons-material/CarpenterOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
//utils
import { useTranslation } from 'react-i18next';

const PersonalAccount = () => {
    const [selected, setSelected] = React.useState([]);
    const { t } = useTranslation();

    const columns = [
        { field: "id", headerName: "ID", headerAlign: 'center', align: 'center', flex: 0.1 },
        { field: "title", headerName: t('account.title'), flex: 1 },
        { field: 'category', headerName: t('account.category'), flex: 0.7 },
        { field: "work", headerName: t('account.work'), flex: 1.5 },
        { field: "grade", headerName: t('account.grade'), headerAlign: 'center', align: 'center', flex: 0.7 },
        { field: "createdAt", headerName: t('account.createdAt'), headerAlign: 'center', align: 'center', flex: 1.5 },
        { field: 'buttons', headerName: t('account.tools'), headerAlign: 'center', align: 'center', flex: 0.5, headerClassName: 'header-tools' }
    ];

    const tool = (
        <React.Fragment>
            <Tooltip title={t('account.open')}>
                <IconButton size='small'>
                    <SearchIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title={t('account.edit')}>
                <IconButton size='small'>
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    )

    let rows = [];

    return (
        <Container maxWidth='lg' sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={t('account.delete')} align='left'>
                    <IconButton
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Typography variant='h1' sx={{ fontSize: 20, color: '#5c5c5c', width: '100%' }} align='center'>
                    {t('account.tableTitle')}
                </Typography>
            </Box>
            <Box sx={{ width: '100%', mt: 2 }}>
                <DataGrid
                    autoHeight
                    sx={{
                        justifyContent: "space-between"
                    }}
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    rowHeight={40}
                    onSelectionModelChange={(newSelection) => {
                        setSelected(newSelection)
                    }}
                />
            </Box>
            <Link to='/create-review'>
                <Button variant='contained' color="success" endIcon={<EditIcon />} sx={{ mt: 2 }} size='small' >
                    {t('account.create')}
                </Button>
            </Link>
        </Container>
    );
}

export default PersonalAccount;