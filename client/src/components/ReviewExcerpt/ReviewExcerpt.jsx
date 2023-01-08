import React from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Badge from '@mui/material/Badge';

import { useSelector, useDispatch } from 'react-redux';
import { hitLike, selectAuthorLikes } from '../../redux/reducers/reviewsSlice';
import { selectWorkByName, fetchWorks, hitRate } from '../../redux/reducers/worksSlice';
import { selectUserEmail, selectUserStatus, selectUserRateOnWork, selectUserLikesOnReview } from '../../redux/reducers/userSlice';

import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

import useCloudImage from './useCloudImage.js';
import { AdvancedImage } from '@cloudinary/react';

import { useTheme } from '@mui/material/styles';

import { LIKE, DARKGRAY } from '../../Const';
import { CircularProgress } from '@mui/material';

const ReviewExcerpt = (props) => {
    const { image_url, created_at, email, grade, review_id } = props.review;
    let { content, review_title, work_name, category } = props.review
    const workInstance = useSelector(state => selectWorkByName(state, work_name))
    const userEmail = useSelector(selectUserEmail);
    const userStatus = useSelector(selectUserStatus);
    console.log(email);
    const authorLikes = useSelector((state) => selectAuthorLikes(state, email));
    const likeStatus = useSelector((state) => state.reviews.like);

    if (review_title[review_title.length - 1] !== '.') review_title += '.'
    work_name = work_name[0].toUpperCase() + work_name.slice(1)
    category = category[0].toUpperCase() + category.slice(1)

    const indexEnd = content.indexOf(' ', 300);
    content = content.slice(0, indexEnd);
    if (content[content.length - 1] !== '.') content = content + '...';

    const dispatch = useDispatch();
    const [liked, setLiked] = React.useState(Boolean(useSelector(state => selectUserLikesOnReview(state, review_id))) || false)
    const [userRate, setUserRate] = React.useState(useSelector(state => selectUserRateOnWork(state, work_name.toLowerCase())) || 0);
    const { rate } = workInstance
    const theme = useTheme();

    React.useEffect(() => {
        !workInstance && dispatch(fetchWorks())
    }, [])


    const locale = {
        ru: ruLocale,
        en: enLocale
    }

    const [myImage, myImageMobile] = useCloudImage(image_url);

    const { t } = useTranslation();

    const date = format(parseISO(created_at), 'HH:mm, dd/MMM/yy', { locale: locale[t('locale')] });

    const CONTENT_HEIGHT = image_url ? 270 : 570

    const handleRate = (e) => {
        setUserRate(Number(e.target.value))
        dispatch(hitRate({ rate: Number(e.target.value), email: userEmail, work_name: work_name.toLowerCase() }));
    }

    const handleLike = (e) => {
        setLiked(prev => !prev);
        dispatch(hitLike({ email: userEmail, review_id, recipient: email }))
    }

    return (
        <Card sx={{ maxWidth: { sm: 400, xs: 280 }, mb: 5 }} elevation={8}>
            <CardActionArea>
                <CardHeader
                    sx={{ minHeight: 170 }}
                    title={review_title}
                    titleTypographyProps={{ mb: 1 }}
                    subheader={
                        <React.Fragment>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: 14 }}>{work_name}</Typography>

                                <Typography sx={{ fontSize: 12 }}>{date}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <Typography sx={{ fontSize: 'inherit' }}>{t('account.category')}: {category}</Typography>
                                <Rating
                                    name="Rating"
                                    value={Number(rate)}
                                    readOnly
                                    precision={0.5}
                                    size="small"
                                />
                            </Box>
                            <Box sx={{ display: 'flex', fontSize: 13 }}>
                                <Typography sx={{ fontSize: 'inherit', mr: 1 }} color="primary" >{email}</Typography>
                                <Badge badgeContent={authorLikes} color="primary" >
                                    {
                                        likeStatus === 'loading' ?
                                            <CircularProgress color="primary" size={20}/> :
                                            <FavoriteIcon sx={{ color: LIKE }} size="small" />
                                    }
                                </Badge>
                            </Box>
                        </React.Fragment>
                    }
                >
                </CardHeader>
                {
                    image_url ?
                        <React.Fragment>
                            <CardMedia sx={{ display: { xs: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' } }}>
                                <AdvancedImage cldImg={myImage} />
                            </CardMedia>
                            <CardMedia sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none', xl: 'none' } }}>
                                <AdvancedImage cldImg={myImageMobile} />
                            </CardMedia>
                        </React.Fragment> :
                        null
                }
                <CardContent sx={{ minHeight: CONTENT_HEIGHT, display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontSize={14}
                        dangerouslySetInnerHTML={{ __html: content, style: { color: theme.palette.text.secondary } }}
                    />
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} >
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: {
                        xs: 'column',
                        sm: 'row'
                    }
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {
                            userEmail && userStatus !== 'blocked' ?
                                <IconButton onClick={handleLike} >
                                    {
                                        liked ?
                                            <FavoriteIcon sx={{ color: LIKE }} /> :
                                            <FavoriteBorderIcon sx={{ color: LIKE }} />
                                    }
                                </IconButton> :
                                null
                        }
                        <div>
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
                        </div>
                    </Box>
                    <Button size="small" >{t('excerpt.seemore')}</Button>
                </Box>
                {
                    userEmail && userStatus !== 'blocked' ?
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
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
                                    py: 0,
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                value={userRate}
                                onChange={handleRate}
                            />
                        </Box> :
                        null
                }
            </CardActions>
        </Card>


    );
}

export default ReviewExcerpt;