import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';

import { deleteAuthor,  selectToolbarStatus } from '../../redux/reducers/authorsSlice.js';
import { useSelector, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';


const AdminToolbar = ({selected}) => {
    const toolbarStatus = useSelector(selectToolbarStatus);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        dispatch(deleteAuthor(selected))
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
                                toolbarStatus === 'deleting' ?
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
                                toolbarStatus === 'blocking' ?
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
                                toolbarStatus === 'unblocking' ?
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
                                toolbarStatus === 'admining' ?
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
                                toolbarStatus === 'usering' ?
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