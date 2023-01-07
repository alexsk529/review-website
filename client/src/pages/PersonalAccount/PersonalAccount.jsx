import React from 'react';

import { Link, useParams } from 'react-router-dom';


import './PersonalAccount.css';
//mui
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import { DataGrid } from '@mui/x-data-grid';

//utils
import { useTranslation } from 'react-i18next';
import { useAccountColumns } from './useAccountColumns.js'

import { selectReviewsByUserEmail, fetchReviews, deleteReviews } from '../../redux/reducers/reviewsSlice';
import { selectUserEmail } from '../../redux/reducers/userSlice';

import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';


const PersonalAccount = () => {
    const [selected, setSelected] = React.useState([]);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const theme = useTheme();
    const emailRedux = useSelector(selectUserEmail);
    const email = (useParams())?.email;
    const columns = useAccountColumns()
    let userEmail;
    if (email) userEmail = email;
    else userEmail = emailRedux;
    const reviews = useSelector(state => selectReviewsByUserEmail(state, userEmail));
    const reviewsStatus = useSelector(state => state.reviews.status);

        const rows = reviews.map((row) => ({
        id: row.review_id,
        title: row.review_title,
        category: row.category,
        work: row.work_name,
        grade: row.grade,
        createdAt: row.created_at
    }));

    const handleDelete = () => {
        dispatch(deleteReviews(selected))
    }

    const handleRefresh = () => {
        dispatch(fetchReviews())
    }

    return (
        <Container maxWidth='xl' sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {
                    reviewsStatus === 'loading' ?
                        null :
                        <React.Fragment>
                            {
                                reviewsStatus === 'deleting' ?
                                    <CircularProgress /> :
                                    <Tooltip title={t('account.delete')} align='left'>
                                        <IconButton
                                            color="error"
                                            onClick={handleDelete}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
                        </React.Fragment>
                }
                <Typography variant='h1' sx={{ fontSize: 20, color: '#5c5c5c', width: '100%' }} align='center'>
                    {email ? `${t('account.tableTitleAdmin')} ${email}` : t('account.tableTitle')}
                </Typography>
            </Box>
            <Box sx={{ width: '100%', mt: 2 }}>
                {
                    reviewsStatus === 'loading' ?
                        <CircularProgress /> :
                        <DataGrid
                            getRowId={(row) => row.id}
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
                        />
                }
            </Box>
            <Link to='/create-review'>
                <Button variant='contained' color="success" endIcon={<EditIcon />} sx={{ mt: 2, mr: 2 }} size='small' >
                    {t('account.create')}
                </Button>
            </Link>
            <Button variant='contained' color="warning" endIcon={<RefreshIcon />} sx={{ mt: 2 }} size='small' onClick={handleRefresh} >
                {email ? t('account.refreshAdmin') : t('account.refresh')}
            </Button>
        </Container>
    );
}

export default PersonalAccount;