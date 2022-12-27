import React from 'react';

import axios from '../axios.js';

import { useSelector, useDispatch } from 'react-redux';
import { selectUserEmail } from '../redux/userSlice';
import { fetchWorks, selectWorks, selectCategories } from '../redux/worksSlice.js';

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useTranslation } from 'react-i18next';
import Editor from '../components/Editor/Editor.jsx';
import DragAndDrop from '../components/DragAndDrop/DragAndDrop.jsx'

import CustomAutocomplete from '../components/CustomAutocomplete.jsx';


const CreateReview = ({ isEdit }) => {
    const dispatch = useDispatch();

    const [work, setWork] = React.useState('');
    const [category, setCategory] = React.useState('')
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState(``);
    const [image, setImage] = React.useState('');
    const [grade, setGrade] = React.useState(0);
    const [tags, setTags] = React.useState([]);

    const userEmail = useSelector(selectUserEmail);

    const { t } = useTranslation();

    React.useLayoutEffect(() => {
        dispatch(fetchWorks());
    }, [dispatch])

    let tagsOptions = [];

    const getTags = async () => {
        const res = await axios.get('/api/work/get-tags')
        return res.data
    }

    React.useLayoutEffect(() => {
        tagsOptions = getTags();
    })

    let works = useSelector(selectWorks);
    let categories = useSelector(selectCategories);

    return (
        <Container maxWidth='lg' sx={{ mt: 3 }}>
            <Typography variant='h1' sx={{ fontSize: 20, color: '#5c5c5c', width: '100%' }} align='center'>
                {isEdit ? t('createReview.edit') : t('createReview.create')}
            </Typography>
            <Container sx={{
                display: 'flex',
                gap: 4,
                justifyContent: 'center',
                width: {
                    sm: '100%',
                    md: '70%'
                },
                flexDirection: {
                    xs: 'column',
                    sm: 'row'
                }
            }} >
                <CustomAutocomplete
                    setState={setWork}
                    label={t('createReview.work')}
                    options={works}
                />
                <CustomAutocomplete
                    setState={setCategory}
                    label={t('createReview.category')}
                    options={categories}
                />
                <TextField
                    variant='standard'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label={t('createReview.title')}
                />
            </Container>
            <Box sx={{ mt: 2 }}>
                <Editor content={content} setContent={setContent} />
            </Box>
            <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 3,
                flexDirection: {
                    xs: 'column',
                    sm: 'row'
                },
                alignItems: 'center'
            }}>
                <CustomAutocomplete
                    sx={{ width: 250 }}
                    multiple
                    limitTags={2}
                    setState={setTags}
                    label={t('createReview.tags')}
                    options={tagsOptions}
                />
                <Box sx={{ mt: 2 }}>
                    <Typography component="legend" sx={{ color: '#5c5c5c' }}>{t('createReview.grade')}</Typography>
                    <Rating
                        value={grade}
                        onChange={(_, newVal) => setGrade(newVal)}
                        max={10}
                    />
                </Box>
            </Container>
            <Container width="100%" sx={{ mt: 4, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' } }}>
                <DragAndDrop />
            </Container>
            <Container width='100%' sx={{ mt: 4, display: { md: 'none', lg: 'none', xl: 'none' } }}>
                <Button
                    variant="contained"
                    component="label"
                >
                    {t('createReview.uploadFile')}
                    <input
                        type="file"
                        hidden
                    />
                </Button>
            </Container>
            <Button variant='contained' color="success" sx={{ mt: 2, mb: 2 }} size='small' >
                {t('createReview.confirm')}
            </Button>
        </Container>
    )
}

export default CreateReview;