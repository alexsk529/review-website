import { useState, useRef } from "react";
import './DragAndDrop.css'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useTranslation } from 'react-i18next';

const DragDropFiles = () => {
    const { t } = useTranslation();

    const [files, setFiles] = useState(null);
    const inputRef = useRef();

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setFiles(event.dataTransfer.files)
    };

    // send files to the server // learn from my other video
    const handleUpload = () => {
        const formData = new FormData();
        formData.append("Files", files);
        console.log(formData.getAll())
        // fetch(
        //   "link", {
        //     method: "POST",
        //     body: formData
        //   }  
        // )
    };

    if (files) return (
        <div className="uploads">
            <ul>
                {Array.from(files).map((file, idx) => <li className="dropzone_title" key={idx}>{file.name}</li>)}
            </ul>
            <Box sx={{display: 'flex', gap: 3, mt: 3}}>
                <Button variant="contained" size="small" onClick={() => setFiles(null)}>{t('createReview.cancel')}</Button>
                <Button variant="contained" size="small" onClick={handleUpload}>{t('createReview.upload')}</Button>
            </Box>
        </div>
    )

    return (
        <>
            <div
                className="dropzone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h1 className="dropzone_title">{t('createReview.dragDrop')}</h1>
                <input
                    type="file"
                    multiple
                    onChange={(event) => setFiles(event.target.files)}
                    hidden
                    accept="image/png, image/jpeg"
                    ref={inputRef}
                />
                <Button
                    sx={{mt: 2}}
                    variant="contained"
                    size="small"
                    onClick={() => inputRef.current.click()}
                >
                    {t('createReview.selectFile')}
                </Button>
            </div>
        </>
    );
};

export default DragDropFiles;