import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';

import { fetchAuthors, selectAuthorsStatus, selectAuthors } from '../../redux/reducers/authorsSlice.js';
import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';


const AdminToolbar = () => {
    const authorsStatus = useSelector(selectAuthorsStatus);
    const { t } = useTranslation();

    const handleDelete = () => {
    }

    const handleBlock = () => {

    }

    const handleUnblock = () => {

    }

    const handleAdmin = () => {

    }

    const handleUser = () => {

    }

    return ( 
        <React.Fragment>
                            {
                                authorsStatus === 'deleting' ?
                                    <CircularProgress /> :
                                    <Tooltip title={t('admin.delete')} align='left' placement='left'>
                                        <IconButton
                                            color="error"
                                            onClick={handleDelete}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
                            {
                                authorsStatus === 'blocking' ?
                                    <CircularProgress /> :
                                    <Tooltip title={t('admin.block')} align='left' placement='top'>
                                        <IconButton
                                            color="warning"
                                            onClick={handleBlock}
                                        >
                                            <LockIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
                            {
                                authorsStatus === 'unblocking' ?
                                    <CircularProgress /> :
                                    <Tooltip title={t('admin.unblock')} align='left' placement='top'>
                                        <IconButton
                                            color="warning"
                                            onClick={handleUnblock}
                                        >
                                            <LockOpenIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
                            {
                                authorsStatus === 'admining' ?
                                    <CircularProgress /> :
                                    <Tooltip title={t('admin.admin')} align='left' placement='top'>
                                        <IconButton
                                            color="success"
                                            onClick={handleAdmin}
                                        >
                                            <EngineeringIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
                            {
                                authorsStatus === 'usering' ?
                                    <CircularProgress /> :
                                    <Tooltip title={t('admin.user')} align='left' placement='right'>
                                        <IconButton
                                            color="success"
                                            onClick={handleUser}
                                        >
                                            <PersonIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
                        </React.Fragment>
     );
}
 
export default AdminToolbar;