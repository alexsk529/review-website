import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';

const ErrorMessage = React.forwardRef(( props, ref ) => {
    const { t } = useTranslation();
    console.log(props);

    const reviewLabel = t('createReview.review');
    const gradeLabel = t('createReview.grade');

    const { errors, ...properties } = props

    return (
        <Container {...properties} ref={ref}>
            <Paper
                elevation={3}
                sx={{ backgroundColor: '#d32f2f', width: '35%', minWidth: '280px', fontSize: 16, p: 2, color: '#e6e6e6', margin: '0 auto', mb: 3 }}
            >
                <Typography variant='h1' sx={{ fontSize: 18, width: '100%' }} align='left'>{t('createReview.errors.error')}</Typography>
                {errors.map((err, i) => (
                    <Typography key={i} variant='body1' sx={{mt: 1}} align='left'>{t('createReview.errors.field')} <i>"{err}"</i>&nbsp;
                        {
                            err === reviewLabel ?
                                t('createReview.errors.manySymbols') :
                                err === gradeLabel ?
                                    t('createReview.errors.blank') :
                                    t('createReview.errors.twoSymbols')
                        }.
                </Typography>
                ))}
            </Paper>
        </Container>
    );
})

export default ErrorMessage;