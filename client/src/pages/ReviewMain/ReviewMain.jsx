import React from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { selectReviewById, hitLike } from '../../redux/reducers/reviewsSlice';
import { selectWorkByName, hitRate } from '../../redux/reducers/worksSlice';
import { selectUserEmail, selectUserStatus, selectUserRateOnWork, selectUserLikesOnReview } from '../../redux/reducers/userSlice';

import BackHome from '../../components/BackHome';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';

import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

import useCloudImage from '../../hooks/useCloudImage.js';
import { AdvancedImage, responsive } from '@cloudinary/react';

import { LIKE, DARKGRAY } from '../../Const';
import useTags from '../../hooks/useTags';

const ReviewMain = () => {
    const dispatch = useDispatch();
    const review_id = useParams().id;
    const theme = useTheme();

    const locale = {
        ru: ruLocale,
        en: enLocale
    }

    const likeStatus = useSelector((state) => state.reviews.like);

    const { t } = useTranslation();
    const review = useSelector((state) => selectReviewById(state, Number(review_id)));
    const {
        email,
        review_title,
        content,
        grade,
        created_at,
        image_url,
        author_likes,
        category
    } = review;
    let { work_name } = review;

    const {
        rate
    } = useSelector(state => selectWorkByName(state, work_name))

    const userEmail = useSelector(selectUserEmail);
    const userStatus = useSelector(selectUserStatus);
    const [liked, setLiked] = React.useState(Boolean(useSelector(state => selectUserLikesOnReview(state, review_id))) || false)
    const [userRate, setUserRate] = React.useState(useSelector(state => selectUserRateOnWork(state, work_name.toLowerCase())) || 0);

    work_name = work_name[0].toUpperCase() + work_name.slice(1)
    const date = format(parseISO(created_at), 'HH:mm, dd/MMM/yy', { locale: locale[t('locale')] });

    const [myImage, myImageMobile, imageMain] = useCloudImage(image_url);

    const [tagsOptions, setTagsOptions, getTags] = useTags()

    React.useLayoutEffect(() => {
        getTags();
    }, [])

    const handleRate = (e) => {
        setUserRate(Number(e.target.value))
        dispatch(hitRate({ rate: Number(e.target.value), email: userEmail, work_name: work_name.toLowerCase() }));
    }

    const handleLike = (e) => {
        setLiked(prev => !prev);
        dispatch(hitLike({ email: userEmail, review_id, recipient: email }))
    }

    return (
        <Container sx={{ maxWidth: '100vw', display: 'flex', justifyContent: 'center' }}>
            <BackHome />
            <Paper elevation={8} sx={{ width: '100%', mb: 5, p: 3 }}>
                <Typography variant='h1' sx={{ fontSize: { sm: 36, xs: 22 } }}>
                    {review_title}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: {
                        sm: 'row',
                        xs: 'column'
                    }
                }}>
                    <Typography variant='subtitle1' sx={{ textDecoration: 'underline', fontSize: { sm: 18, xs: 14 } }}>{t('review.date')} </Typography>
                    <Typography variant='subtitle1' sx={{ whiteSpace: 'pre', fontSize: { sm: 18, xs: 14 } }}> {date}</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: {
                        sm: 'row',
                        xs: 'column'
                    }
                }}>
                    <Typography variant='subtitle1' sx={{ textDecoration: 'underline', fontSize: { sm: 18, xs: 14 } }}>{t('account.category')}: </Typography>
                    <Typography variant='subtitle1' sx={{ whiteSpace: 'pre', fontSize: { sm: 18, xs: 14 } }}> {category}</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: {
                        sm: 'row',
                        xs: 'column'
                    }
                }}>
                    <Typography variant='subtitle1' sx={{ textDecoration: 'underline', fontSize: { sm: 18, xs: 14 } }}>{t('review.work')}</Typography>
                    <Typography variant='subtitle1' sx={{ whiteSpace: 'pre', fontSize: { sm: 18, xs: 14 } }}> {work_name}</Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: {
                        sm: 'flex-start',
                        xs: 'center'
                    },
                    flexDirection: {
                        sm: 'row',
                        xs: 'column'
                    },
                    my: 1
                }}>
                    <Box sx={{ minWidth: 260, maxWidth: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, backgroundColor: DARKGRAY, borderRadius: 1, px: 2, py: 1, mt: 2 }}>
                        <Typography variant='subtitle1' color='primary'>
                            {t('review.author')} {email}
                        </Typography>
                        <Badge badgeContent={author_likes} color="primary" >
                            {
                                likeStatus === 'loading' ?
                                    <CircularProgress color="primary" size={20} /> :
                                    <FavoriteIcon sx={{ color: LIKE }} size="small" />
                            }
                        </Badge>
                    </Box>
                    <Box sx={{ my: { sm: 0, xs: 1 } }}>
                        <Typography component="legend" >{t('excerpt.grade')}</Typography>
                        <Rating
                            name="Grade"
                            value={grade}
                            readOnly
                            precision={0.5}
                            size="small"
                            max={10}
                            sx={{ border: 1, borderRadius: 1, borderColor: DARKGRAY, backgroundColor: DARKGRAY, p: 0.6 }}
                        />
                    </Box>
                </Box>
                <Divider />
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

            </Paper>
        </Container >
    );
}

export default ReviewMain;