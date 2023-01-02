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
    const dispatch = useDispatch();
    const reviewsStatus = useSelector(state => state.reviews.status);
    const reviews = useSelector(selectAllReviews);

    React.useLayoutEffect(() => {
        dispatch(statusRefreshed())
    }, [])

    React.useLayoutEffect(() => {
        reviewsStatus === 'idle' && dispatch(fetchWorks())
        reviewsStatus === 'idle' && dispatch(fetchReviews())
    }, [reviewsStatus, dispatch])



    return (
        <Box>
            <Button onClick={() => { dispatch(fetchReviews()) }}>reg</Button>
            <Button onClick={() => { dispatch(fetchReviewsByBestGrade()) }}>grade</Button>
            <Container maxWidth='lg'>
                <Grid
                    container
                    spacing={2}
                >
                    {
                        reviews.map(item => {
                            return (
                                <Grid item sm={12} md={6} lg={4} key={item.review_id}>
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