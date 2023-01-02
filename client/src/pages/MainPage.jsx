import React from 'react';

import ReviewExcerpt from '../components/ReviewExcerpt.jsx';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { fetchReviews, fetchReviewsByBestGrade, selectAllReviews, statusRefreshed } from '../redux/reviewsSlice';
import { fetchWorks } from '../redux/worksSlice';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
    const dispatch = useDispatch();
    const reviewsStatus = useSelector(state => state.reviews.status);
    const reviews = useSelector(selectAllReviews);

    React.useLayoutEffect(()=> {
        dispatch(statusRefreshed())
    }, [dispatch])

    React.useLayoutEffect(() => {
        reviewsStatus === 'idle' && dispatch(fetchWorks())
        reviewsStatus === 'idle' && dispatch(fetchReviews())
    }, [reviewsStatus, dispatch])

    return (
        <Box>
            <Button onClick={() => { dispatch(fetchReviews()) }}>reg</Button>
            <Button onClick={() => { dispatch(fetchReviewsByBestGrade()) }}>grade</Button>
            {
                reviews.map(item => {
                    return <ReviewExcerpt
                        key={item.review_id}
                        review={item}
                    />
                })
            }
        </Box>
    );
}

export default MainPage