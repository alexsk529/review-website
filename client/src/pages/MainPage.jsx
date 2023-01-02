import React from 'react';

import ReviewExcerpt from '../components/ReviewExcerpt.jsx';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { fetchReviews, fetchReviewsByBestGrade, selectAllReviews, statusRefreshed } from '../redux/reviewsSlice';
import { fetchWorks } from '../redux/worksSlice';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
    const [reviewsForView, setReviewsForView] = React.useState([]);
    const dispatch = useDispatch();
    const reviewsStatus = useSelector(state => state.reviews.status);
    const reviews = useSelector(selectAllReviews);

    React.useEffect(() => {
        dispatch(statusRefreshed())
        console.log('start');
        return () => { console.log('init unmount'); }
    }, [])

    React.useEffect(() => {
        reviewsStatus === 'idle' && dispatch(fetchWorks())
        reviewsStatus === 'idle' && dispatch(fetchReviews())
    }, [reviewsStatus, dispatch])

    const LIMIT = 3;
    let page = 1;

    const pages = Math.ceil(reviews.length / LIMIT);

    const loadReviews = () => {
        const startIndex = (page - 1) * LIMIT;
        const endIndex = page * LIMIT;
        setReviewsForView(prev => [...prev, ...reviews.slice(startIndex, endIndex)]);
    }

    const handleScroll = (e) => {
        if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150) && !(page > pages)) {
            page <= pages && (page += 1);
            loadReviews();
        }
    }

    React.useEffect(() => {
        loadReviews()
        document.addEventListener('scroll', handleScroll)
        return function () {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <Button onClick={() => { dispatch(fetchReviews()) }}>reg</Button>
            <Button onClick={() => { dispatch(fetchReviewsByBestGrade()) }}>grade</Button>
            <Container fixed>
                <Grid
                    container
                    spacing={6}
                    justifyContent='center'
                >
                    {
                        reviewsForView.map(item => {
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
            </Container>
        </Box>
    );
}

export default MainPage