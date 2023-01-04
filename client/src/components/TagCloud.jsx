import React from 'react';
import axios from '../axios.js';
import { TagCloud as Cloud } from 'react-tagcloud';
import { fetchReviewsByTag } from '../redux/reducers/reviewsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const TagCloud = ({setSelectedIndex}) => {
    const [tagsOptions, setTagsOptions] = React.useState([])
    const dispatch = useDispatch();
    const reviewsStatus = useSelector(state => state.reviews.status);
    const getTags = async () => {
        const res = await axios.get('/tags-cloud');
        setTagsOptions(res.data)
        //tagsOptions.current = res.data;
    }

    const handleClickGetIds = async (tag) => {
        dispatch(fetchReviewsByTag(tag));
        setSelectedIndex(0);
    }

    React.useLayoutEffect(() => {
        reviewsStatus === 'succeded' && getTags()
    }, [reviewsStatus])

    const options = {
        luminosity: 'bright',
        hue: 'pink',
    }

    return (
        <React.Fragment>
        {
            tagsOptions.length > 0 ?
            <Cloud
            minSize={14}
            maxSize={35}
            tags={tagsOptions}
            colorOptions={options}
            style={{ cursor: 'pointer' }}
            onClick={tag => handleClickGetIds(tag)}
            /> :
            <CircularProgress color="secondary" /> 
        }
        </React.Fragment>
    );
}

export default TagCloud;