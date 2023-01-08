import React from 'react';

import { Link } from 'react-router-dom';

//mui
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';

import { DataGrid } from '@mui/x-data-grid';

import { useAdminColumns } from './useAdminColumns.js';
import AdminToolbar from './AdminToolbar.jsx';

import { fetchAuthors, authorsStatusRefreshed, selectAuthorsStatus, selectAuthors } from '../../redux/reducers/authorsSlice.js';
import { selectUserEmail } from '../../redux/reducers/userSlice.js';

import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';

import { useTranslation } from 'react-i18next';


const AdminPanel = () => {
    const [selected, setSelected] = React.useState([]);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const theme = useTheme();

    const authorsStatus = useSelector(selectAuthorsStatus);
    const authors = useSelector(selectAuthors);
    const userEmail = useSelector(selectUserEmail);

    React.useEffect(()=> {
        dispatch(authorsStatusRefreshed())
    }, [])

    React.useEffect(()=>{
        authorsStatus === 'idle' && dispatch(fetchAuthors())
    }, [authorsStatus])
    

    const columns = useAdminColumns();
    const rows = authors.map(row => ({
        email: row.email,
        name: row.author_name,
        reviewCount: row.reviewCount,
        registration: row.created_at,
        lastLogin: row.last_login,
        role: row.role,
        status: row.status
    }));

    const handleRefresh = () => {
        dispatch(fetchAuthors())
    }

    return (
        <Container maxWidth='xl' sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {
                    authorsStatus === 'loading' ?
                        null :
                        <AdminToolbar selected={selected} setSelected={setSelected} />
                }
                <Typography variant='h1' sx={{ fontSize: 20, color: '#5c5c5c', width: '100%' }} align='center'>
                    {t('admin.tableTitle')}
                </Typography>
            </Box>
            <Box sx={{ width: '100%', mt: 2 }}>
                {
                    authorsStatus === 'loading' ?
                        <CircularProgress /> :
                        <DataGrid
                            getRowId={(row) => row.email}
                            autoHeight
                            sx={{
                                justifyContent: "space-between",
                                backgroundColor: theme.palette.background.paper,
                                boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
                            }}
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            rowHeight={40}
                            onSelectionModelChange={(newSelection) => {
                                setSelected(newSelection)
                            }}
                            isRowSelectable={(params) => params.row.email !== userEmail}
                            initialState={{
                                sorting: {
                                    sortModel: [
                                        {
                                            field: 'registration',
                                            sort: 'asc'
                                        }
                                    ]
                                }
                            }}
                        />
                }
            </Box>
            <Button variant='contained' color="warning" endIcon={<RefreshIcon />} sx={{ mt: 2 }} size='small' onClick={handleRefresh} >
                {t('admin.refresh')}
            </Button>
        </Container>
    );
}

export default AdminPanel;

