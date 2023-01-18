import React from 'react';

import WithCircularProgress from './WithCircularProgress.jsx';

import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PersonIcon from '@mui/icons-material/Person';

import { deleteAuthor, blockAuthor, unblockAuthor, makeAdmin, makeUser, selectToolbarStatus } from '../../redux/reducers/authorsSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../../redux/reducers/reviewsSlice.js';
import { fetchWorks } from '../../redux/reducers/worksSlice.js';
import { resetScroll } from '../../redux/reducers/scrollSlice.js';

import { useTranslation } from 'react-i18next';


const AdminToolbar = ({ selected }) => {
    const toolbarStatus = useSelector(selectToolbarStatus);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteAuthor(selected))
        dispatch(fetchReviews());
        dispatch(fetchWorks());
        dispatch(resetScroll());
    }

    const handleBlock = () => {
        dispatch(blockAuthor(selected))
    }

    const handleUnblock = () => {
        dispatch(unblockAuthor(selected))
    }

    const handleAdmin = () => {
        dispatch(makeAdmin(selected))
    }

    const handleUser = () => {
        dispatch(makeUser(selected))
    }

    return (
        <React.Fragment>
            <WithCircularProgress
                showProgress={toolbarStatus === 'deleting'}
                title={t('admin.delete')}
                onClick={handleDelete}
                color="error"
                placement="left"
            >
                <DeleteIcon />
            </WithCircularProgress>
            <WithCircularProgress
                showProgress={toolbarStatus === 'blocking'}
                title={t('admin.block')}
                onClick={handleBlock}
                color="warning"
                placement="top"
            >
                <LockIcon />
            </WithCircularProgress>
            <WithCircularProgress
                showProgress={toolbarStatus === 'unblocking'}
                title={t('admin.unblock')}
                onClick={handleUnblock}
                color="warning"
                placement="top"
            >
                <LockOpenIcon />
            </WithCircularProgress>
            <WithCircularProgress
                showProgress={toolbarStatus === 'admining'}
                title={t('admin.admin')}
                onClick={handleAdmin}
                color="success"
                placement="top"
            >
                <EngineeringIcon />
            </WithCircularProgress>
            <WithCircularProgress
                showProgress={toolbarStatus === 'usering'}
                title={t('admin.user')}
                onClick={handleUser}
                color="success"
                placement="right"
            >
                <PersonIcon />
            </WithCircularProgress>
        </React.Fragment>
    );
}

export default AdminToolbar;