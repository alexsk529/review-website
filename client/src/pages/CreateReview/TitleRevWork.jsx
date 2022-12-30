import React from "react";

import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from 'react-redux';
import { fetchWorks, selectWorks, selectCategories } from '../../redux/worksSlice.js';

const TitleRevWork = (props) => {
    const {
        work, 
        setWork, 
        workLabel, 
        title, 
        titleLabel,
        setTitle, 
        category, 
        setCategory, 
        categoryLabel
    } = props

    const dispatch = useDispatch();

    const works = useSelector(selectWorks);
    const categories = useSelector(selectCategories);

    React.useLayoutEffect(() => {
        dispatch(fetchWorks());
    }, [dispatch])

    return (
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
                sx={{
                    width: {
                        xs: 280,
                        sm: 300
                    }
                }}
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
                sx={{
                    width: {
                        xs: 280,
                        sm: 200
                    }
                }}
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
                sx={{
                    width: {
                        xs: 280,
                        sm: 300
                    }
                }}
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    localStorage.setItem('title', JSON.stringify(e.target.value))
                }}
                label={titleLabel}
            />
        </Container>
    );
}

export default TitleRevWork;