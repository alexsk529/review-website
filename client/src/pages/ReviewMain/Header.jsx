import React from 'react';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { selectReviewById } from '../../redux/reducers/reviewsSlice';

import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

import { useTheme } from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';

import { LIKE, DARKGRAY } from '../../Const';

const Header = () => {
    const review_id = useParams().id;
    const theme = useTheme();

    const likeStatus = useSelector((state) => state.reviews.like);

    const review = useSelector((state) => selectReviewById(state, Number(review_id)));

    const {
        email,
        review_title,
        grade,
        created_at,
        author_likes,
    } = review;
    let { work_name, category } = review;

    const locale = {
        ru: ruLocale,
        en: enLocale
    }
    const { t } = useTranslation();
    
    const date = format(parseISO(created_at), 'HH:mm, dd/MMM/yy', { locale: locale[t('locale')] });
    
    
    work_name = work_name[0].toUpperCase() + work_name.slice(1);
    category = category[0].toUpperCase() + category.slice(1);
    return ( 
        <React.Fragment>
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
        </React.Fragment>
     );
}
 
export default Header;