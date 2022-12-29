import React, {useLayoutEffect} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { fetchReviews, fetchReviewsByBestGrade, selectAllReviews } from '../redux/reviewsSlice';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
    const dispatch = useDispatch();



    return (
        <Box>
            <Button onClick={()=> {dispatch(fetchReviews())}}>reg</Button>
            <Button onClick={()=> {dispatch(fetchReviewsByBestGrade())}}>grade</Button>
        </Box>
    );
}

export default MainPage