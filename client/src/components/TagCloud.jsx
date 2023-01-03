import React from 'react';
import axios from '../axios.js';
import { TagCloud as Cloud } from 'react-tagcloud';
import { fetchReviewsByTag } from '../redux/reducers/reviewsSlice.js';
import { useDispatch } from 'react-redux';

const TagCloud = ({setSelectedIndex}) => {
    const tagsOptions = React.useRef([])
    const dispatch = useDispatch();

    const getTags = async () => {
        const res = await axios.get('/tags-cloud');
        tagsOptions.current = res.data;
    }

    const handleClickGetIds = async (tag) => {
        dispatch(fetchReviewsByTag(tag))
        setSelectedIndex(0)
    }

    React.useLayoutEffect(() => {
        getTags()
    }, [tagsOptions.current])

    const options = {
        luminosity: 'bright',
        hue: 'pink',
    }

    return (
        <Cloud
            minSize={14}
            maxSize={35}
            tags={tagsOptions.current}
            colorOptions={options}
            style={{ cursor: 'pointer' }}
            onClick={tag => handleClickGetIds(tag)}
        />
    );
}

export default TagCloud;