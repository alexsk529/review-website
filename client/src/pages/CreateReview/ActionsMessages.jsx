import React from 'react';

import { useSelector } from 'react-redux';

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import DragAndDrop from '../../components/DragAndDrop/DragAndDrop.jsx'
import MessageError from '../../components/MessageError.jsx'
import MessageFinal from '../../components/MessageFinal.jsx';

import { useTranslation } from 'react-i18next';

const ActionsMessages = (props) => {
    const {
        image,
        setImage,
        imageName,
        setImageName,
        handleCreateReview,
        handleClear,
        errors,
        isError,
        setIsError,
        isSuccess,
        isServerError,
        setIsSuccess,
        setIsServerError
    } = props

    const { t } = useTranslation();

    const reviewStatus = useSelector(state => state.reviews.status)
    const confirmLabel = t('createReview.confirm');
    const clearLabel = t('createReview.clear')

    return ( 
        <React.Fragment>
            {
                reviewStatus === 'loading' ?
                    <CircularProgress sx={{ mt: 3 }} /> :
                    <React.Fragment>
                        <DragAndDrop image={image} setImage={setImage} name={imageName} setName={setImageName} />
                        <Button variant='contained' color="success" sx={{ mt: 2, mb: 2, mr: 2 }} size='small' onClick={handleCreateReview}>
                            {confirmLabel}
                        </Button>
                        <Button variant='contained' color='warning' sx={{ mt: 2, mb: 2 }} size='small' onClick={handleClear}>
                            {clearLabel}
                        </Button>
                    </React.Fragment>
            }
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
        </React.Fragment>
     );
}
 
export default ActionsMessages;