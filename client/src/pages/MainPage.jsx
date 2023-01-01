import React from 'react';

import ReviewExcerpt from '../components/ReviewExcerpt.jsx';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { fetchReviews, fetchReviewsByBestGrade, selectAllReviews } from '../redux/reviewsSlice';
import { fetchWorks } from '../redux/worksSlice';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
    const dispatch = useDispatch();
    const reviewsStatus = useSelector(state => state.reviews.status);
    const reviews = useSelector(selectAllReviews);

    React.useEffect(() => {
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
                        content={item.content}
                        review_title={item.review_title}
                        work_name={item.work_name}
                        created_at={item.created_at}
                    />
                })
            }
        </Box>
    );
}

export default MainPage