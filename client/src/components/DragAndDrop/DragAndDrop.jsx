import React, { useState, useRef } from "react";
import './DragAndDrop.css'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useTranslation } from 'react-i18next';
import axios from '../../axios.js'

const DragDropFiles = ({ image, setImage }) => {
    const [name, setName] = useState('')
    const { t } = useTranslation();

    const inputRef = useRef();

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result)
        }
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0]
        setName(file.name);
        previewFile(file)
    };
    const handleChange = (event) => {
        const file = event.target.files[0]
        setName(file.name);
        previewFile(file)
    }

    const uploadImage = async (base64) => {
        try {
            await axios.post('/api/review/image', {data: base64})
            setImage(null);
        } catch (error) {
            console.error(error)
        }
    }
    // send files to the server // learn from my other video
    const handleUpload = () => {
        uploadImage(image)
    };

    if (image) return (
        <Container width="100%" sx={{ mt: 4 }}>
            <div className="dropzone">
                <ul>
                    <li className="dropzone_title" >{name}</li>
                </ul>
                <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                    <Button variant="contained" size="small" color="error" onClick={() => setImage(null)}>{t('createReview.cancel')}</Button>
                    {/* <Button variant="contained" size="small" onClick={handleUpload}>{t('createReview.upload')}</Button> */}
                </Box>
                <Button onClick={handleUpload}>
                    Do it
                </Button>
            </div>
        </Container>
    )

    return (
        <React.Fragment>

            <Container width="100%" sx={{ mt: 4, display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' } }}>
                <div
                    className="dropzone"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <h1 className="dropzone_title">{t('createReview.dragDrop')}</h1>
                    <input
                        type="file"
                        onChange={handleChange}
                        hidden
                        accept="image/png, image/jpeg"
                        ref={inputRef}
                        value={image}
                    />
                    <Button
                        sx={{ mt: 2 }}
                        variant="contained"
                        size="small"
                        onClick={() => inputRef.current.click()}
                    >
                        {t('createReview.selectFile')}
                    </Button>
                </div>
            </Container>
            <Container width='100%' sx={{ mt: 4, display: { md: 'none', lg: 'none', xl: 'none' } }}>
                <div
                    className="dropzone"
                >
                    <input
                        type="file"
                        multiple
                        onChange={handleChange}
                        hidden
                        accept="image/png, image/jpeg"
                        ref={inputRef}
                        value={image}
                    />
                    <Button
                        sx={{ mt: 2 }}
                        variant="contained"
                        size="small"
                        onClick={() => inputRef.current.click()}
                    >
                        {t('createReview.selectFile')}
                    </Button>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default DragDropFiles;