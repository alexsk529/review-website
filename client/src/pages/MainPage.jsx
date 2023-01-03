import React from 'react';

import ReviewExcerpt from '../components/ReviewExcerpt.jsx';
import SortingMenu from '../components/SortingMenu.jsx';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { fetchReviews, fetchReviewsByBestGrade, selectAllReviews, statusRefreshed } from '../redux/reducers/reviewsSlice';
import { fetchWorks } from '../redux/reducers/worksSlice';
import { loadMore, resetScroll, selectScroll, selectScrollStatus } from '../redux/reducers/scrollSlice.js';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

const MainPage = () => {
    const dispatch = useDispatch();
    const [readyToScroll, setReadyToScroll] = React.useState(false)
    const reviewsStatus = useSelector(state => state.reviews.status);
    const reviews = useSelector(selectAllReviews);
    const LIMIT = 3;

    const { t } = useTranslation();

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const options = [t('sorting.sort'), t('sorting.date'), t('sorting.grade')]

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
            <Typography component="legend" color="secondary" sx={{mb:1}}> {t('sorting.sort')} </Typography>
            <SortingMenu 
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                options={options}
            />
            {
                reviewsStatus === 'loading' ?
                    <Container sx={{ mt: 6 }}><CircularProgress /></Container>:
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