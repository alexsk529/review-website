import React from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { selectReviewById, hitLike } from '../../redux/reducers/reviewsSlice';
import { selectWorkByName, hitRate } from '../../redux/reducers/worksSlice';
import { selectUserEmail, selectUserStatus, selectUserRateOnWork, selectUserLikesOnReview } from '../../redux/reducers/userSlice';

import BackHome from '../../components/BackHome';
import Header from './Header.jsx';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';

import { useTranslation } from 'react-i18next';

import useCloudImage from '../../hooks/useCloudImage.js';
import { AdvancedImage } from '@cloudinary/react';

import { LIKE, DARKGRAY } from '../../Const';
import useTags from '../../hooks/useTags';

const Content = () => {
    const dispatch = useDispatch();
    const review_id = useParams().id;
    const theme = useTheme();

    const { t } = useTranslation();
    const review = useSelector((state) => selectReviewById(state, Number(review_id)));
    const {
        email,
        content,
        image_url,
    } = review;
    let { work_name } = review;

    const {
        rate
    } = useSelector(state => selectWorkByName(state, work_name))

    const userEmail = useSelector(selectUserEmail);
    const userStatus = useSelector(selectUserStatus);
    const [liked, setLiked] = React.useState(Boolean(useSelector(state => selectUserLikesOnReview(state, review_id))) || false)
    const [userRate, setUserRate] = React.useState(useSelector(state => selectUserRateOnWork(state, work_name.toLowerCase())) || 0);

    const [myImage, myImageMobile, imageMain] = useCloudImage(image_url);

    const handleRate = (e) => {
        setUserRate(Number(e.target.value))
        dispatch(hitRate({ rate: Number(e.target.value), email: userEmail, work_name: work_name.toLowerCase() }));
    }

    const handleLike = (e) => {
        setLiked(prev => !prev);
        dispatch(hitLike({ email: userEmail, review_id, recipient: email }))
    }
    return ( 
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 3 }}>
                    <Typography
                        align='left'
                        variant='body1'
                        sx={{ fontSize: { sm: 16, xs: 14 } }}
                        dangerouslySetInnerHTML={{ __html: content, style: { color: theme.palette.text.secondary } }}
                    />
                </Box>
                <AdvancedImage cldImg={imageMain} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '16px', marginTop: '15px' }} />
                <Divider />
            <div>
                    <Typography component='legend'>{t('review.rate')}</Typography>
                    <Rating
                        name="Rating"
                        value={Number(rate)}
                        readOnly
                        precision={0.5}
                        size="small"
                        sx={{ backgroundColor: DARKGRAY, p: 1, borderRadius: 1 }}
                    />
                </div>
                {
                    userEmail && userStatus !== 'blocked' ?
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: {
                                md: 'row',
                                xs: 'column'
                            },
                            alignItems: 'center',
                            mt: 2
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                                <Typography component="legend" >{t('excerpt.evaluate')}</Typography>
                                <Rating
                                    name="Rate"
                                    precision={0.5}
                                    size="small"
                                    max={5}
                                    sx={{
                                        border: 1,
                                        borderRadius: 1,
                                        borderColor: theme.palette.secondary.main,
                                        backgroundColor: theme.palette.secondary.main,
                                        p: 0.6,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    value={userRate}
                                    onChange={handleRate}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'center' }}>
                                <Typography component="legend" >{t('review.like')}</Typography>
                                <IconButton onClick={handleLike} >
                                    {
                                        liked ?
                                            <FavoriteIcon sx={{ color: LIKE }} /> :
                                            <FavoriteBorderIcon sx={{ color: LIKE }} />
                                    }
                                </IconButton>
                            </Box>
                        </Box> :
                        null
                }

        </React.Fragment>
     );
}
 
export default Content;