import React from 'react';

import axios from '../../axios.js'
import useTags from '../../hooks/useTags.js';

import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import { useTranslation } from 'react-i18next';

const TagsGrade = (props) => {
    const {
        tags,
        setTags,
        gradeLabel,
        grade,
        setGrade,
    } = props

    const { t } = useTranslation();

    const tagsLabel = t('createReview.tags');
    
    const [tagsOptions, setTagsOptions, getTags] = useTags()

    React.useLayoutEffect(() => {
        getTags();
    }, [])

    return (
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
                limitTags={1}
                options={tagsOptions}
                value={tags}
                onChange={(e, newVal) => {
                    setTags(newVal)
                    localStorage.setItem('tags', JSON.stringify(tags))
                }}
                renderInput={(params) => (
                    <TextField
                        name="tags"
                        {...params}
                        label={tagsLabel}
                        variant="standard" />
                )}
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
                    precision={0.5}
                />
            </Box>
        </Container>
    );
}

export default TagsGrade;