import React from 'react';

import ReviewExcerpt from '../components/ReviewExcerpt.jsx';
import SortingMenu from '../components/SortingMenu.jsx';
import ScrollTop from '../components/ScrollTop.jsx';
import TagCloud from '../components/TagCloud.jsx';
import MessageBlocked from '../components/MessageBlocked.jsx';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchReviews, fetchReviewsByBestGrade, selectAllReviews, statusRefreshed } from '../redux/reducers/reviewsSlice';
import { selectUserStatus } from '../redux/reducers/userSlice.js';
import { fetchWorks } from '../redux/reducers/worksSlice';
import { loadMore, resetScroll, selectScroll, selectScrollStatus } from '../redux/reducers/scrollSlice.js';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import { BACKGROUND } from '../Const.js';

const MainPage = () => {
    const dispatch = useDispatch();
    const [readyToScroll, setReadyToScroll] = React.useState(false)
    const reviewsStatus = useSelector(state => state.reviews.status);
    const reviews = useSelector(selectAllReviews);
    const userStatus = useSelector(selectUserStatus);
    const LIMIT = 3;

    const { t } = useTranslation();

    const [blockedOpen, setBlockedOpen] = React.useState(false)

    const selectedIndex = useSelector(state => state.selected)

    const options = [t('sorting.sort'), t('sorting.date'), t('sorting.grade')]

    React.useEffect(()=> {
        userStatus === 'blocked' && setBlockedOpen(true)
    }, [userStatus])

    React.useEffect(() => {
        dispatch(statusRefreshed())
        setReadyToScroll(true)
    }, [selectedIndex])

    React.useEffect(() => {
        if (reviewsStatus === 'idle' && selectedIndex === 1) dispatch(fetchReviews())
        if (reviewsStatus === 'idle' && selectedIndex === 2) dispatch(fetchReviewsByBestGrade())
        reviewsStatus === 'idle' && dispatch(fetchWorks())
        if (reviewsStatus === 'succeded' && readyToScroll === true) {
            dispatch(resetScroll());
            dispatch(loadMore({ limit: LIMIT, data: reviews }));
        }
    }, [reviewsStatus, selectedIndex, dispatch])

    const scrollStatus = useSelector(selectScrollStatus);
    const scrollData = useSelector(selectScroll);

    React.useEffect(() => {
        reviewsStatus === 'succeded' && document.addEventListener('scroll', handleScroll)
        reviewsStatus === 'idle' && document.removeEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [scrollStatus, reviewsStatus])

    const handleScroll = (e) => {
        if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 300) && (scrollStatus === 'idle')) {
            dispatch(loadMore({ limit: LIMIT, data: reviews }))
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <ScrollTop showBelow={100} />
            <Box>
                <Typography component="legend" sx={{ mb: 1 }}> {t('sorting.load')} </Typography>
                <SortingMenu
                    options={options}
                />
                {
                    reviewsStatus === 'loading' ?
                        null :
                        <Container fixed align='center' sx={{ my: 2 }}>
                            <Paper sx={{ py: 2, px: 0.2 }} elevation={8}>
                                <TagCloud />
                            </Paper>
                        </Container>
                }

            </Box>
            {
                reviewsStatus === 'loading' ?
                    <Container sx={{ mt: 6 }}><CircularProgress /></Container> :
                    <Container fixed sx={{ mt: 3 }}>
                        <Grid
                            container
                            spacing={6}
                            justifyContent='center'
                        >
                            {
                                scrollData.map(item => {
                                    return (
                                        <Grid item sm={12} md={6} lg={4} key={item.review_id} align="center">
                                            <ReviewExcerpt
                                                review={item}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                            {
                                scrollData.length === 0 ?
                                    <Grid item sm={12} md={6} lg={4} align="center">
                                        <Paper sx={{p: 3}} elevation={8}>
                                            <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}> {t('zerofound')} </Typography>
                                        </Paper>
                                    </Grid> :
                                    null
                            }
                        </Grid>
                        {
                            scrollStatus === 'loading' ?
                                <CircularProgress /> :
                                null
                        }
                    </Container>
            }
            <MessageBlocked
                blockedOpen={blockedOpen}
                setBlockedOpen={setBlockedOpen}
            />
        </Box>
    );
}

export default MainPage