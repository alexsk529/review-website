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

import { useSelector, useDispatch } from 'react-redux';
import { selectWorkByName, fetchWorks } from '../redux/reducers/worksSlice';

import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const ReviewExcerpt = (props) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = React.useState(false)
    const { image_url, created_at, email, grade } = props.review;
    let { content, review_title, work_name, category } = props.review
    const workInstance = useSelector(state => selectWorkByName(state, work_name))
    React.useEffect(() => {
        !workInstance && dispatch(fetchWorks())
    }, [])
    const { work_rate, rate_count } = workInstance

    if (review_title[review_title.length - 1] !== '.') review_title += '.'
    work_name = work_name[0].toUpperCase() + work_name.slice(1)
    category = category[0].toUpperCase() + category.slice(1)

    const indexEnd = content.indexOf(' ', 300);
    content = content.slice(0, indexEnd);
    if (content[content.length - 1] !== '.') content = content + '...';

    const locale = {
        ru: ruLocale,
        en: enLocale
    }

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dn3ymq77w'
        }
    })

    const myImage = cld.image(image_url);
    myImage.resize(fill().width(400).height(300).gravity(autoGravity()));

    const myImageMobile = cld.image(image_url);
    myImageMobile.resize(fill().width(280).height(180).gravity(autoGravity()));

    const { t } = useTranslation();

    const date = format(parseISO(created_at), 'HH:mm, dd/MMM/yy', { locale: locale[t('locale')] });

    const BACKGROUND = '#F6E3F5';
    const HIGHLIGHT = "#F0CCEF";
    const LIKE = "#eda800";
    const DARKGRAY = '#656565';
    const CONTENT_HEIGHT = image_url ? 270 : 570

    return (
        <Card sx={{ maxWidth: { sm: 400, xs: 280 }, mb: 5 }} elevation={8}>
            <CardActionArea sx={{ backgroundColor: BACKGROUND }}>
                <CardHeader
                    sx={{ backgroundColor: HIGHLIGHT, minHeight: 170 }}
                    title={review_title}
                    titleTypographyProps={{ color: 'secondary', mb: 1 }}
                    subheaderTypographyProps={{ color: 'secondary' }}
                    subheader={
                        <React.Fragment>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: 14 }}>{work_name}</Typography>

                                <Typography sx={{ fontSize: 12 }}>{date}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <Typography sx={{ fontSize: 'inherit' }}>{category}</Typography>
                                <Rating
                                    name="Rating"
                                    value={rate_count === 0 ? 0 : work_rate / rate_count}
                                    readOnly
                                    precision={0.5}
                                    size="small"
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                <Typography sx={{ fontSize: 'inherit' }}>{email}</Typography>
                            </Box>
                        </React.Fragment>
                    }
                >
                </CardHeader>
                {
                    image_url ?
                        <React.Fragment>
                        <CardMedia sx={{display: {xs:'none', sm:'block', md:'block', lg:'block', xl:'block'}}}>
                            <AdvancedImage cldImg={myImage} />
                        </CardMedia>
                        <CardMedia sx={{display: {xs:'block', sm:'none', md:'none', lg:'none', xl:'none'}}}>
                            <AdvancedImage cldImg={myImageMobile} />
                        </CardMedia>
                        </React.Fragment> :
                        null
                }
                <CardContent sx={{ minHeight: CONTENT_HEIGHT, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" fontSize={14} dangerouslySetInnerHTML={{ __html: content }}>

                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing sx={{ backgroundColor: HIGHLIGHT }}>
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
                        <IconButton onClick={(e) => setLiked(prev => !prev)} >
                            {
                                liked ?
                                    <FavoriteIcon sx={{ color: LIKE }} /> :
                                    <FavoriteBorderIcon sx={{ color: LIKE }} />
                            }
                        </IconButton>
                        <div>
                            <Typography component="legend" color="text.secondary">{t('excerpt.grade')}</Typography>
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
                    <Button size="small" color="secondary">{t('excerpt.seemore')}</Button>
                </Box>
            </CardActions>
        </Card>


    );
}

export default ReviewExcerpt;