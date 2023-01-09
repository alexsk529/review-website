import React from 'react';

import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

import { useSelector, useDispatch } from 'react-redux';
import { hitLike} from '../../redux/reducers/reviewsSlice';
import { selectWorkByName, fetchWorks, hitRate } from '../../redux/reducers/worksSlice';
import { selectUserEmail, selectUserStatus, selectUserRateOnWork, selectUserLikesOnReview } from '../../redux/reducers/userSlice';

import { useTranslation } from 'react-i18next';

import { useTheme } from '@mui/material/styles';

import { LIKE, DARKGRAY } from '../../Const';

const ExcerptActions = (props) => {
    const { email, grade, review_id } = props;
    let { work_name } = props
    const workInstance = useSelector(state => selectWorkByName(state, work_name))
    const userEmail = useSelector(selectUserEmail);
    const userStatus = useSelector(selectUserStatus);

    const dispatch = useDispatch();
    const [liked, setLiked] = React.useState(Boolean(useSelector(state => selectUserLikesOnReview(state, review_id))) || false)
    const [userRate, setUserRate] = React.useState(useSelector(state => selectUserRateOnWork(state, work_name.toLowerCase())) || 0);
    const theme = useTheme();

    React.useEffect(() => {
        !workInstance && dispatch(fetchWorks())
    }, [])

    const { t } = useTranslation();

    const handleRate = (e) => {
        setUserRate(Number(e.target.value))
        dispatch(hitRate({ rate: Number(e.target.value), email: userEmail, work_name: work_name.toLowerCase() }));
    }

    const handleLike = (e) => {
        setLiked(prev => !prev);
        dispatch(hitLike({ email: userEmail, review_id, recipient: email }))
    }

    return (
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
                <Link to={`/review/${review_id}`}>
                    <Button size="small" >{t('excerpt.seemore')}</Button>
                </Link>
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
    );
}

export default ExcerptActions;