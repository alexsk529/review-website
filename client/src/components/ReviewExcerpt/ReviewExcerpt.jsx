import React from 'react';

import ExcerptHeader from './ExcerptHeader';
import ExcerptActions from './ExcerptActions';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import { useSelector, useDispatch } from 'react-redux';
import { selectWorkByName, fetchWorks } from '../../redux/reducers/worksSlice';

import useCloudImage from '../../hooks/useCloudImage.js';
import { AdvancedImage } from '@cloudinary/react';

import { useTheme } from '@mui/material/styles';

const ReviewExcerpt = (props) => {
    const { image_url, created_at, email, grade, review_id } = props.review;
    let { content, review_title, work_name, category } = props.review
    const workInstance = useSelector(state => selectWorkByName(state, work_name))

    const indexEnd = content.indexOf(' ', 300);
    content = content.slice(0, indexEnd);
    if (content[content.length - 1] !== '.') content = content + '...';

    const dispatch = useDispatch();
    const theme = useTheme();

    React.useEffect(() => {
        !workInstance && dispatch(fetchWorks())
    }, [])

    const [myImage, myImageMobile] = useCloudImage(image_url);

    const CONTENT_HEIGHT = image_url ? 270 : 570

    return (
        <Card sx={{ maxWidth: { sm: 400, xs: 280 }, mb: 5 }} elevation={8}>
            <ExcerptHeader created_at={created_at} email={email} review_title={review_title} work_name={work_name} category={category}/>
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
            <ExcerptActions email={email} grade={grade} review_id={review_id} work_name={work_name} />
        </Card>


    );
}

export default ReviewExcerpt;