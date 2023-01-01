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
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';

import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

const ReviewExcerpt = (props) => {
    const { image_url, created_at } = props;
    let { content, review_title, work_name } = props
    if(review_title[review_title.length -1] !== '.') review_title+='.'
    work_name = work_name[0].toUpperCase() + work_name.slice(1) 

    const indexEnd = content.indexOf(' ', 500);
    content = content.slice(0, indexEnd);
    if (content[content.length - 1] !== '.') content = content + '...';

    const locale = {
        ru: ruLocale,
        en: enLocale
    }

    const { t } = useTranslation();

    const date = format(parseISO(created_at), 'H:m, dd/MMM/yy', { locale: locale[t('locale')] })

    return (
        <Box>
            <Box sx={{ margin: '0 auto', display: 'inline-block' }}>
                <Card sx={{ maxWidth: 400, mb: 5, mx: 2 }} elevation={8}>
                    <CardActionArea>
                        <CardHeader
                            title={review_title}
                            subheader={`${work_name} ${date}`}
                        />
                        <CardContent>
                            <Typography variant="body2" dangerouslySetInnerHTML={{ __html: content }}>

                            </Typography>
                        </CardContent>
                        {
                            image_url ?
                                <CardMedia></CardMedia> :
                                null
                        }
                    </CardActionArea>
                    <CardActions disableSpacing>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </Box>
        </Box>
    );
}

export default ReviewExcerpt;