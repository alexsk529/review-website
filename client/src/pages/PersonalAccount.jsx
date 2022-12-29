import React from 'react';

import { Link } from 'react-router-dom';

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
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
//utils
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

import { selectReviewsByUserEmail, fetchReviews } from '../redux/reviewsSlice';
import { selectUserEmail } from '../redux/userSlice';
import { fetchWorks } from '../redux/worksSlice';

import { useSelector, useDispatch } from 'react-redux';

const PersonalAccount = () => {
    const [selected, setSelected] = React.useState([]);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const userEmail = useSelector(selectUserEmail);
    const reviews = useSelector(state => selectReviewsByUserEmail(state, userEmail));
    const reviewsStatus = useSelector(state => state.reviews.status);

    const locale = {
        ru: ruLocale,
        en: enLocale
    }

    const columns = [
        { field: "id", headerName: "ID", headerAlign: 'center', align: 'center', flex: 0.1 },
        {
            field: "title",
            headerName: t('account.title'),
            flex: 1.5,
        },
        {
            field: 'category',
            headerName: t('account.category'),
            flex: 0.7,
            valueFormatter: (params) => (params.value[0].toUpperCase() + params.value.slice(1))
        },
        {
            field: "work",
            headerName: t('account.work'),
            flex: 1.2,
            valueFormatter: (params) => (params.value[0].toUpperCase() + params.value.slice(1))
        },
        { field: "grade", headerName: t('account.grade'), headerAlign: 'center', align: 'center', flex: 0.7 },
        {
            field: "createdAt",
            headerName: t('account.createdAt'),
            headerAlign: 'center',
            align: 'center',
            flex: 1.3,
            valueFormatter: (params) => format(parseISO(params.value), 'H:m dd/MMM/yy', { locale: locale[t('locale')] })
        },
        {
            field: 'buttons',
            headerName: t('account.tools'),
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            headerClassName: 'header-tools',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem color="primary" label="Observe" icon={<Tooltip title={t('account.open')}><SearchIcon /></Tooltip>} />,
                <GridActionsCellItem color="error"  label="Edit" icon={<Tooltip title={t('account.edit')}><EditIcon /></Tooltip>} />
            ]
        }
    ];

    //let rows=[];

    const rows = reviews.map((row) => ({
        id: row.review_id,
        title: row.review_title,
        category: row["work.category"],
        work: row.work_name,
        grade: row.grade,
        createdAt: row.created_at
    }));

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

    React.useEffect(() => {
        reviewsStatus === 'idle' && dispatch(fetchWorks())
        reviewsStatus === 'idle' && dispatch(fetchReviews())
    }, [reviewsStatus, dispatch])

    const handleRefresh = () => {
        dispatch(fetchReviews())
    }

    return (
        <Container maxWidth='lg' sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {
                    reviewsStatus === 'loading' ?
                        null :
                        <Tooltip title={t('account.delete')} align='left'>
                            <IconButton
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                }
                <Typography variant='h1' sx={{ fontSize: 20, color: '#5c5c5c', width: '100%' }} align='center'>
                    {t('account.tableTitle')}
                </Typography>
            </Box>
            <Box sx={{ width: '100%', mt: 2 }}>
                {
                    reviewsStatus === 'loading' ?
                        <CircularProgress /> :
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
                }
            </Box>
            <Link to='/create-review'>
                <Button variant='contained' color="success" endIcon={<EditIcon />} sx={{ mt: 2, mr: 2 }} size='small' >
                    {t('account.create')}
                </Button>
            </Link>
            <Button variant='contained' color="warning" endIcon={<RefreshIcon />} sx={{ mt: 2 }} size='small' onClick={handleRefresh} >
                {t('account.refresh')}
            </Button>
        </Container>
    );
}

export default PersonalAccount;