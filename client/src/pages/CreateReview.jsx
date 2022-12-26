import React from 'react';

import { useSelector } from 'react-redux';
import { selectUserEmail } from '../redux/userSlice';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useTranslation } from 'react-i18next';
import Editor from '../components/Editor.jsx';


const CreateReview = ({ isEdit }) => {
    const [work, setWork] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState(``);
    const [image, setImage] = React.useState('');
    const [grade, setGrade] = React.useState();
    const [tags, setTags] = React.useState([]);
    
    const userEmail = useSelector(selectUserEmail);

    const { t } = useTranslation();

    return (
        <Container maxWidth='lg' sx={{ mt: 3 }}>
            {
                isEdit ?
                    <Typography variant='h1' sx={{ fontSize: 20, color: '#5c5c5c', width: '100%' }} align='center'>
                        {t('createReview.edit')}
                    </Typography> :
                    <Typography variant='h1' sx={{ fontSize: 20, color: '#5c5c5c', width: '100%' }} align='center'>
                        {t('createReview.create')}
                    </Typography>
            }
            <Box sx={{ mt: 2 }}>
                <Editor content={content} setContent={setContent}/>
            </Box>
        </Container>
    )
}

export default CreateReview;