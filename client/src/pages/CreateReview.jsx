import React from 'react';

import axios from '../axios.js';

import { useSelector, useDispatch } from 'react-redux';
import { selectUserEmail } from '../redux/userSlice';
import { fetchWorks, selectWorks, selectCategories } from '../redux/worksSlice.js';
import { createReview } from '../redux/reviewsSlice.js';

import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useTranslation } from 'react-i18next';
import Editor from '../components/Editor/Editor.jsx';
import DragAndDrop from '../components/DragAndDrop/DragAndDrop.jsx'
import MessageError from '../components/MessageError.jsx'
import MessageFinal from '../components/MessageFinal.jsx';


const CreateReview = ({ isEdit }) => {
    //vars
    const dispatch = useDispatch();

    const [work, setWork] = React.useState(JSON.parse(localStorage.getItem('work')) || '');
    const [category, setCategory] = React.useState(JSON.parse(localStorage.getItem('category')) || '')
    const [title, setTitle] = React.useState(JSON.parse(localStorage.getItem('title')) || '');
    const [content, setContent] = React.useState(JSON.parse(localStorage.getItem('content')) || ``);
    const [image, setImage] = React.useState(JSON.parse(localStorage.getItem('image')) || '');
    const [grade, setGrade] = React.useState(JSON.parse(localStorage.getItem('grade')) || null);
    const [tags, setTags] = React.useState(JSON.parse(localStorage.getItem('tags')) || []);

    const [errors, setErrors] = React.useState([])

    const [isError, setIsError] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [isServerError, setIsServerError] = React.useState(false)

    const { t } = useTranslation();

    const workLabel = t('createReview.work');
    const categoryLabel = t('createReview.category');
    const titleLabel = t('createReview.title');
    const tagsLabel = t('createReview.tags');
    const gradeLabel = t('createReview.grade');
    const confirmLabel = t('createReview.confirm');
    const reviewLabel = t('createReview.review')

    const userEmail = useSelector(selectUserEmail);

    let works = useSelector(selectWorks);
    let categories = useSelector(selectCategories);

    let tagsOptions = React.useRef([]);

    //methods
    const getTags = async () => {
        const res = await axios.get('/api/work/get-tags')
        tagsOptions = res.data;
    }
    
    const errorCollector = () => {
        const errors = []
        work.length < 2 && errors.push(workLabel);
        category.length < 2 && errors.push(categoryLabel);
        title.length < 2 && errors.push(titleLabel);
        content.length < 20 && errors.push(reviewLabel)
        !grade && errors.push(gradeLabel);
        return (errors)
    }
    
    const handleCreateReview = async () => {
        setIsError(false)
        if (errorCollector().length > 0) {
            setErrors(errorCollector())
            setIsError(true)
            return;
        }
        setIsServerError(true)
        const review = {
            work,
            category,
            title,
            content,
            image,
            grade,
            tags
        };
        const response = await dispatch(createReview(review))
        console.log(response);
    }

    //hooks
    React.useLayoutEffect(() => {
        dispatch(fetchWorks());
    }, [dispatch])

    React.useLayoutEffect(() => {
        getTags();
    }, [])
    
    return (
        <Container maxWidth='lg' sx={{ mt: 3 }}>
            <Typography variant='h1' sx={{ fontSize: 20, color: '#5c5c5c', width: '100%', mb: 3 }} align='center'>
                {isEdit ? t('createReview.edit') : t('createReview.create')}
            </Typography>
            <Container sx={{
                display: 'flex',
                gap: 4,
                justifyContent: 'center',
                alignItems: 'center',
                width: {
                    sm: '100%',
                    md: '100%'
                },
                flexDirection: {
                    xs: 'column',
                    sm: 'row'
                }
            }} >
                <Autocomplete
                    freeSolo
                    sx={{ width: {
                        xs: 280,
                        sm: 300
                    }}}
                    name="work"
                    options={works}
                    value={work}
                    inputValue={work}
                    onChange={(_, newVal) => {
                        if (newVal === null) newVal = '';
                        setWork(newVal)
                        localStorage.setItem('work', JSON.stringify(newVal))
                    }}
                    onInputChange={(_, newVal) => {
                        if (newVal === null) newVal = '';
                        setWork(newVal)
                        localStorage.setItem('work', JSON.stringify(newVal))
                    }}
                    renderInput={(params) => <TextField name="work" {...params} label={workLabel} variant="standard" />}
                />
                <Autocomplete
                    freeSolo
                    sx={{ width: {
                        xs: 280,
                        sm: 200
                    }}}
                    options={categories}
                    value={category}
                    inputValue={category}
                    onChange={(_, newVal) => {
                        if (newVal === null) newVal = '';
                        setCategory(newVal)
                        localStorage.setItem('category', JSON.stringify(newVal))
                    }}
                    onInputChange={(_, newVal) => {
                        if (newVal === null) newVal = '';
                        setCategory(newVal)
                        localStorage.setItem('category', JSON.stringify(newVal))
                    }}
                    renderInput={(params) => <TextField name="category" {...params} label={categoryLabel} variant="standard" />}
                />
                <TextField
                    variant='standard'
                    sx={{ width: {
                        xs: 280,
                        sm: 300
                    }}}
                    value={title}
                    onChange={(e) => 
                        {
                            setTitle(e.target.value);
                            localStorage.setItem('title', JSON.stringify(e.target.value))
                        }}
                    label={titleLabel}
                />
            </Container>
            <Box sx={{ mt: 2, mb: 2 }}>
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
                <Autocomplete
                    freeSolo
                    sx={{ width: 250 }}
                    multiple
                    limitTags={2}
                    options={tagsOptions.current}
                    value={tags}
                    onChange={(e, newVal) => { 
                        setTags(newVal) 
                        localStorage.setItem('tags', JSON.stringify(tags))
                    }}
                    renderInput={(params) => <TextField name="tags" {...params} label={tagsLabel} variant="standard" />}
                />
                <Box sx={{ mt: 2 }}>
                    <Typography component="legend" sx={{ color: '#5c5c5c' }}>{gradeLabel}</Typography>
                    <Rating
                        value={grade}
                        onChange={(_, newVal) => {
                            setGrade(newVal)
                            localStorage.setItem('grade', JSON.stringify(newVal))
                        }}
                        max={10}
                    />
                </Box>
            </Container>
            <DragAndDrop image={image} setImage={setImage} />
            <Button variant='contained' color="success" sx={{ mt: 2, mb: 2 }} size='small' onClick={handleCreateReview}>
                {confirmLabel}
            </Button>
            {isError ? <MessageError errors={errors} isError={isError} setIsError={setIsError} /> : null}
            {
                isSuccess || isServerError ?
                    <MessageFinal
                        isSuccess={isSuccess}
                        setIsSuccess={setIsSuccess}
                        isServerError={isServerError}
                        setIsServerError={setIsServerError}
                    /> :
                    null
            }
        </Container>
    )
}

export default CreateReview;