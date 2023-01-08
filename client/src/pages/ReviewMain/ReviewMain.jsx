import React from 'react';
import axios from '../../axios.js';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { selectReviewById } from '../../redux/reducers/reviewsSlice';
import { selectWorkByName } from '../../redux/reducers/worksSlice';

import BackHome from '../../components/BackHome';
import Header from './Header.jsx';
import Content from './Content.jsx';
import Comments from './Comments.jsx';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

import { useTranslation } from 'react-i18next';

const ReviewMain = () => {
    const dispatch = useDispatch();
    const review_id = useParams().id;
    const theme = useTheme();

    const { t } = useTranslation();
    const review = useSelector((state) => selectReviewById(state, Number(review_id)));
    const {
        email,
    } = review;
    let { work_name } = review;

    const {
        rate
    } = useSelector(state => selectWorkByName(state, work_name))

    

    const [tags, setTags] = React.useState([])
    const [tagsLoading, setTagsLoading] = React.useState(true)
    React.useLayoutEffect(() => {
        (async () => {
            let tags = (await axios.get(`/api/review/tags/${review_id}`, { withCredentials: true })).data
            tags = tags.map(tag => tag.tag_name);
            setTags(tags)
            tags.length !== 0 && setTagsLoading(false)
        })()
    }, [])

    return (
        <Container sx={{ maxWidth: '100vw', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <BackHome />
            <Paper elevation={8} sx={{ width: '100%', mb: 5, p: 3 }}>
                <Header />
                <Divider />
                <Content />
            </Paper>
            {
                tagsLoading === true ?
                    null :
                    <Paper elevation={8} sx={{ width: '100%', mb: 5, p: 3 }}>
                        <Typography variant='subtitle1' sx={{ textDecoration: 'underline', fontSize: { sm: 18, xs: 14 } }}>{t('review.tags')}</Typography>
                        {tags.map(tag => {
                            return (
                                <Chip
                                sx={{mx: 2, my: 1}}
                                    key={tag}
                                    label={tag}
                                />)
                        }
                        )}
                    </Paper>
            }
            <Comments id={review_id} />
        </Container >
    );
}

export default ReviewMain;