import React, {useLayoutEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { fetchReviews, fetchReviewsByBestGrade, selectAllReviews } from '../redux/reviewsSlice';
import { fetchWorks } from '../redux/worksSlice';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
    const dispatch = useDispatch();
    const reviewsStatus = useSelector(state => state.reviews.status);
    
    React.useEffect(() => {
        reviewsStatus === 'idle' && dispatch(fetchWorks())
        reviewsStatus === 'idle' && dispatch(fetchReviews())
    }, [reviewsStatus, dispatch])

    return (
        <Box>
            <Button onClick={()=> {dispatch(fetchReviews())}}>reg</Button>
            <Button onClick={()=> {dispatch(fetchReviewsByBestGrade())}}>grade</Button>
        </Box>
    );
}

export default MainPage