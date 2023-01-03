import React from 'react';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, selectUser } from '../redux/reducers/userSlice.js';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

import { useForm } from 'react-hook-form';


const ProfilePopup = ({popupProfile}) => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    const locale = {
        ru: ruLocale,
        en: enLocale
    }

    const {
        popupOpen,
        setPopupOpen
    } = popupProfile;

    const [isEditting, setIsEditting] = React.useState(false)

    let email, name, date, role;
    user && ({ email, author_name: name, created_at: date, role } = user)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: name
        }
    });

    const { t } = useTranslation();

    const handleClose = (event, reason) => {
        if (reason && reason === 'backdropClick') return;
        setIsEditting(false)
        setPopupOpen(false);
    }

    const handleEdit = () => {
        setIsEditting(true)
    }

    const handleCancelEdit = () => {
        setIsEditting(false)
    }

    const onSubmit = async (data) => {
        console.log(data);
        try {
            dispatch(updateUser(data.name))
            handleCancelEdit()
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Dialog
            onClose={handleClose}
            open={popupOpen}
            sx={{
                p: {
                    xs: 0,
                    sm: 4
                }
            }}
            fullScreen={true}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                p: {
                    xs: 0,
                    sm: 4
                }
            }}>
                <DialogTitle sx={{ color: "#d32f2f", display: 'flex', justifyContent: 'space-between' }}>
                    {t('profile.welcome', { name: name })}
                    <IconButton onClick={handleClose} sx={{display: {xs: 'none', sm: 'inline-block'}}} >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <List>
                    <ListItem sx={{ display: 'flex', justifyContent: 'space-between', flexDirection:{xs: 'column', sm:'row'} }}>
                        <Typography color="primary" variant='h6'>{t('profile.email')}</Typography>
                        <Typography sx={{ color: "#7f7e7e" }} variant='body1'>{email}</Typography>
                    </ListItem>
                    <Divider />
                    {
                        isEditting ?
                            <ListItem sx={{ 
                                display: 'flex',
                                justifyContent: 'space-between', 
                                alignItems: 'center',  
                                flexDirection:{xs: 'column', sm:'row'}
                                }}>
                                <Typography color="primary" variant='h6'>{t('profile.name')}</Typography>
                                <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
                                    <TextField
                                        size="small"
                                        name="name"
                                        label={t('profile.input')}
                                        id='new-name'
                                        variant='standard'
                                        {...register('name', { required: t('profile.inputError'), minLength: { value: 2, message: t('profile.inputError') } })}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name?.message}
                                    />
                                </Box>
                            </ListItem> :
                            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', flexDirection:{xs: 'column', sm:'row'} }}>
                                <Typography color="primary" variant='h6'>{t('profile.name')}</Typography>
                                <Box sx={{ display: 'flex', wrap: 'nowrap', alignItems: 'center' }}>
                                    <Typography sx={{ color: "#7f7e7e" }} variant='body1'>{name}</Typography>
                                    <Tooltip title={t('profile.edit')}>
                                        <IconButton onClick={handleEdit} color="error"><EditIcon /></IconButton>
                                    </Tooltip>
                                </Box>
                            </ListItem>
                    }
                    <Divider />
                    <ListItem sx={{ display: 'flex', justifyContent: 'space-between', flexDirection:{xs: 'column', sm:'row'} }}>
                        <Typography color="primary" variant='h6'>{t('profile.creationDate')}</Typography>
                        <Typography sx={{ color: "#7f7e7e" }} variant='body1'>{format(parseISO(date), 'dd/MMM/yy', {locale: locale[t('locale')]})}</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem sx={{ display: 'flex', justifyContent: 'space-between', flexDirection:{xs: 'column', sm:'row'} }}>
                        <Typography color="primary" variant='h6'>{t('profile.rights')}</Typography>
                        <Typography sx={{ color: "#7f7e7e" }} variant='body1'>{role}</Typography>
                    </ListItem>
                </List>
                {
                    isEditting ?
                        <DialogActions>
                            <Button onClick={handleCancelEdit}>
                                {t('profile.cancel')}
                            </Button>
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                type='submit'
                                htmlFor='new-name'
                            >
                                {t('profile.save')}
                            </Button>
                        </DialogActions> :
                        <DialogActions>
                            <Button onClick={handleClose}>
                                {t('profile.close')}
                            </Button>
                        </DialogActions>
                }
            </Box>
        </Dialog>
    );
}

export default ProfilePopup;