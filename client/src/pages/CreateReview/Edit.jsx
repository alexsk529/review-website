import React from 'react';

import axios from '../../axios.js'
import { useSelector, useDispatch } from 'react-redux';
import { selectReviewById, fetchReviews } from '../../redux/reducers/reviewsSlice';

const Edit = (props) => {
    const {
        id,
        setWork,
        setCategory,
        setTitle,
        setContent,
        setTags,
        setGrade,
        setImage,
        setImageName
    } = props
    const dispatch = useDispatch();
    const review = useSelector(state => selectReviewById(state, +id))
    const reviewsStatus = useSelector(state => state.reviews.status);

    React.useEffect(() => {
        reviewsStatus === 'idle' && dispatch(fetchReviews())
    }, [reviewsStatus, dispatch])

    React.useLayoutEffect(() => {
        if (review) {
            (async ()=> {
                let tags = (await axios.get(`/api/review/tags/${id}`, {withCredentials: true})).data
                tags = tags.map(tag => tag.tag_name);
                setTags(tags)
            })()
            setWork(review.work_name[0].toUpperCase() + review.work_name.slice(1));
            setCategory(review.category[0].toUpperCase() + review.category.slice(1));
            setTitle(review.review_title);
            setContent(review.content)
            setGrade(review.grade);
            review.image_url && setImage(review.image_url);
            review.image_url && setImageName(review.image_url);
        }
        // eslint-disable-next-line
    }, [])

    return (<React.Fragment></React.Fragment>);
}

export default Edit;