import React from 'react';

import ReviewExcerpt from '../components/ReviewExcerpt.jsx';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchReviews, fetchReviewsByBestGrade, selectAllReviews, statusRefreshed } from '../redux/reducers/reviewsSlice';
import { fetchWorks } from '../redux/reducers/worksSlice';
import { loadMore, resetScroll, selectScroll, selectScrollStatus } from '../redux/reducers/scrollSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
    const dispatch = useDispatch();
    const reviewsStatus = useSelector(state => state.reviews.status);
    const reviews = useSelector(selectAllReviews);
    const LIMIT = 3;

    React.useEffect(() => {
        dispatch(statusRefreshed())
    }, [])

    React.useEffect(() => {
        reviewsStatus === 'idle' && dispatch(fetchWorks())
        reviewsStatus === 'idle' && dispatch(fetchReviews())
        if (reviewsStatus === 'succeded') {
            dispatch(resetScroll());
            dispatch(loadMore({ limit: LIMIT, data: reviews }));
        }
    }, [reviewsStatus, dispatch])

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

    const handleResetScroll = () => {
        dispatch(resetScroll());
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Button onClick={async () => {
                dispatch(fetchReviews());
                handleResetScroll();
            }}>reg</Button>
            <Button onClick={async () => {
                dispatch(fetchReviewsByBestGrade());
                handleResetScroll();
            }}>grade</Button>
            {
                reviewsStatus === 'loading' ?
                    <Container sx={{ mt: 6 }}><CircularProgress /></Container>:
                    <Container fixed>
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
                        </Grid>
                        {
                            scrollStatus === 'loading' ?
                                <CircularProgress /> :
                                null
                        }
                    </Container>
            }

        </Box>
    );
}

export default MainPage