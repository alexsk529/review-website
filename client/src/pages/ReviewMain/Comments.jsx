import React from 'react';
import axios from '../../axios.js';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { selectReviewById } from '../../redux/reducers/reviewsSlice';
import { selectWorkByName } from '../../redux/reducers/worksSlice';
import { selectUserEmail, selectUserStatus } from '../../redux/reducers/userSlice';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

const Comments = ({ id }) => {
    const { t } = useTranslation();
    const [comm, setComm] = React.useState('')
    const [comments, setComments] = React.useState([]);
    const [commentsLoading, setCommentsLoading] = React.useState(true)
    const [commentSending, setCommentSending] = React.useState(false);

    const userEmail = useSelector(selectUserEmail);
    const userStatus = useSelector(selectUserStatus);


    const locale = {
        ru: ruLocale,
        en: enLocale
    }

    const getComments = React.useCallback(async () => {
        const response = await axios.get(`/api/comment/${id}`)
        setComments(response.data);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comm === '') return;
        setCommentSending(true);
        await axios.post(`/api/comment/create/`, { id, userEmail, comm }, { withCredentials: true })
        setComm('');
        await getComments();
        setCommentSending(false);
    }
    React.useLayoutEffect(() => {
        (async () => {
            await getComments();
            setCommentsLoading(false)
        })()

        const interval = setInterval(getComments, 2000);
        return (()=> clearInterval(interval)) 
    }, [getComments])

    return (
        <React.Fragment>
            {
                userEmail && userStatus !== 'blocked' ?
                    <Paper elevation={8} sx={{ width: '100%', mb: 1, p: 3 }}>
                        <Typography variant='subtitle1' sx={{ textDecoration: 'underline', fontSize: { sm: 18, xs: 14 } }}>{t('review.commentsTitle')}</Typography>
                        <form onSubmit={handleSubmit}>
                            {
                                commentSending ?
                                    <Box sx={{ mt: 2 }}>
                                        <CircularProgress />
                                    </Box> :
                                    <TextField
                                        sx={{ mt: 2 }}
                                        fullWidth
                                        label={t('review.typeComment')}
                                        value={comm}
                                        onChange={(e) => setComm(e.target.value)}
                                    />
                            }
                        </form>
                    </Paper> :
                    null
            }
            {
                commentsLoading ?
                    <Box sx={{ mt: 2 }}>
                        <CircularProgress />
                    </Box> :
                    comments.length === 0 ?
                        <Paper sx={{ my: 0.4, p: 3 }} elevation={8}>
                            {t('review.commentsBlank')}
                        </Paper> :
                        comments.map(comment => {
                            return (
                                <Paper
                                    elevation={8}
                                    sx={{
                                        my: 0.4,
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start'
                                    }}
                                    key={comment.comment_id}
                                >
                                    <Typography
                                        variant='subtitle1'
                                        sx={{
                                            textDecoration: 'underline',
                                            fontSize: { sm: 18, xs: 14 }
                                        }}
                                    >{comment.email}, {format(parseISO(comment.created_at), 'HH:mm, dd/MMM/yy', { locale: locale[t('locale')] })}:</Typography>
                                    <Typography>{comment.comment}</Typography>
                                </Paper>
                            )
                        })
            }
        </React.Fragment>
    );
}

export default Comments;