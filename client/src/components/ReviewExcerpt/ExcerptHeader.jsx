import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import Badge from '@mui/material/Badge';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector, useDispatch } from 'react-redux';
import { selectAuthorLikes } from '../../redux/reducers/reviewsSlice';
import { selectWorkByName, fetchWorks } from '../../redux/reducers/worksSlice';

import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

import { useTheme } from '@mui/material/styles';

import { LIKE, DARKGRAY } from '../../Const';

const ExcerptHeader = (props) => {
    const { created_at, email } = props;
    let { review_title, work_name, category } = props
    const workInstance = useSelector(state => selectWorkByName(state, work_name))

    const likes = useSelector((state) => selectAuthorLikes(state, email));
    let authorLikes = 0;
    if (email) authorLikes = Number(likes)
    const likeStatus = useSelector((state) => state.reviews.like);

    if (review_title[review_title.length - 1] !== '.') review_title += '.'
    work_name = work_name[0].toUpperCase() + work_name.slice(1)
    category = category[0].toUpperCase() + category.slice(1)

    const dispatch = useDispatch();
    const { rate } = workInstance;
    
    const theme = useTheme();

    React.useEffect(() => {
        !workInstance && dispatch(fetchWorks())
    }, [])

    const locale = {
        ru: ruLocale,
        en: enLocale
    }

    const { t } = useTranslation();

    const date = format(parseISO(created_at), 'HH:mm, dd/MMM/yy', { locale: locale[t('locale')] });

    const HEADER_HEIGHT = 200

    return ( 
        <CardHeader
                sx={{ minHeight: HEADER_HEIGHT }}
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', fontSize: 13, mt: 1, backgroundColor: DARKGRAY, borderRadius: 1, p: 1 }}>
                            <Typography sx={{ fontSize: 'inherit', mr: 1 }} color="primary" component="legend" >{email}</Typography>
                            <Badge badgeContent={authorLikes} color="primary" >
                                {
                                    likeStatus === 'loading' ?
                                        <CircularProgress color="primary" size={20} /> :
                                        <FavoriteIcon sx={{ color: LIKE }} size="small" />
                                }
                            </Badge>
                        </Box>
                    </React.Fragment>
                }
            >
            </CardHeader>
     );
}
 
export default ExcerptHeader;