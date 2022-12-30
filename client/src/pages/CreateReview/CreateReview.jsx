import React from 'react';
import { useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { createReview } from '../../redux/reviewsSlice.js';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTranslation } from 'react-i18next';

import Editor from '../../components/Editor/Editor.jsx';
import TitleRevWork from './TitleRevWork.jsx';
import TagsGrade from './TagsGrade.jsx';
import ActionsMessages from './ActionsMessages.jsx';


const CreateReview = ({ isEdit }) => {
    //vars
    const dispatch = useDispatch();
    const id = (useParams())?.id?.slice(1);

    const [work, setWork] = React.useState(JSON.parse(localStorage.getItem('work')) || '');
    const [category, setCategory] = React.useState(JSON.parse(localStorage.getItem('category')) || '')
    const [title, setTitle] = React.useState(JSON.parse(localStorage.getItem('title')) || '');
    const [content, setContent] = React.useState(JSON.parse(localStorage.getItem('content')) || ``);
    const [image, setImage] = React.useState(JSON.parse(localStorage.getItem('image')) || '');
    const [grade, setGrade] = React.useState(JSON.parse(localStorage.getItem('grade')) || null);
    const [tags, setTags] = React.useState(JSON.parse(localStorage.getItem('tags')) || []);

    const [imageName, setImageName] = React.useState(JSON.parse(localStorage.getItem('name')) || '')

    const [errors, setErrors] = React.useState([])

    const [isError, setIsError] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)
    const [isServerError, setIsServerError] = React.useState(false)

    const { t } = useTranslation();

    const workLabel = t('createReview.work');
    const categoryLabel = t('createReview.category');
    const titleLabel = t('createReview.title');
    const gradeLabel = t('createReview.grade');
    const reviewLabel = t('createReview.review');

    //methods

    const errorCollector = () => {
        const errors = []
        work.length < 2 && errors.push(workLabel);
        category.length < 2 && errors.push(categoryLabel);
        title.length < 2 && errors.push(titleLabel);
        content.length < 20 && errors.push(reviewLabel)
        !grade && errors.push(gradeLabel);
        return (errors)
    }

    const handleClear = () => {
        setWork('');
        setCategory('');
        setTitle('');
        setContent('');
        setImage('')
        setGrade(null);
        setTags([]);
        setImageName('');
        localStorage.removeItem('tags')
        localStorage.removeItem('title')
        localStorage.removeItem('image')
        localStorage.removeItem('work')
        localStorage.removeItem('category')
        localStorage.removeItem('content')
        localStorage.removeItem('grade')
        localStorage.removeItem('name')
    }

    const handleCreateReview = async () => {
        setIsError(false)
        if (errorCollector().length > 0) {
            setErrors(errorCollector())
            setIsError(true)
            return;
        }
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
        response && ((response.meta.requestStatus === 'fulfilled') ? setIsSuccess(true) : setIsServerError(false))
        response && ((response.meta.requestStatus === 'fulfilled') && handleClear())
    }

    return (
        <Container maxWidth='lg' sx={{ mt: 3 }}>
            <Typography variant='h1' sx={{ fontSize: 20, color: '#5c5c5c', width: '100%', mb: 3 }} align='center'>
                {isEdit ? t('createReview.edit') : t('createReview.create')}
            </Typography>
            <TitleRevWork
                work={work}
                setWork={setWork}
                workLabel={workLabel}
                title={title}
                titleLabel={titleLabel}
                setTitle={setTitle}
                category={category}
                setCategory={setCategory}
                categoryLabel={categoryLabel}
            />
            <Box sx={{ mt: 2, mb: 2 }}>
                <Editor content={content} setContent={setContent} />
            </Box>
            <TagsGrade 
                tags={tags}
                setTags={setTags}
                gradeLabel={gradeLabel}
                grade={grade}
                setGrade={setGrade}
            />
            <ActionsMessages 
                image={image}
                setImage={setImage}
                imageName={imageName}
                setImageName={setImageName}
                handleCreateReview={handleCreateReview}
                handleClear={handleClear}
                errors={errors}
                isError={isError}
                setIsError={setIsError}
                isSuccess={isSuccess}
                isServerError={isServerError}
                setIsServerError={setIsServerError}
                setIsSuccess={setIsSuccess}
            />
        </Container>
    )
}

export default CreateReview;