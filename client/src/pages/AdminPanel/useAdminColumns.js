import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import { format, parseISO } from 'date-fns';

import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserRole } from '../../redux/reducers/userSlice.js';

import { GridActionsCellItem } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

export const useAdminColumns = () => {
    const locale = {
        ru: ruLocale,
        en: enLocale
    }
    const { t } = useTranslation();

    const userEmail = useSelector(selectUserEmail);
    const userRole = useSelector(selectUserRole);

    return [
        {
            field: "email",
            headerName: t('admin.email'),
            headerAlign: 'left',
            align: 'left',
            flex: 1.5
        },
        {
            field: "name",
            headerName: t('admin.name'),
            flex: 1.2,
        },
        {
            field: 'reviewCount',
            headerName: t('admin.reviewCount'),
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: "likes",
            headerName: t('admin.likes'),
            flex: 1,
            headerAlign: 'center',
            align: 'center'
        },
        {
            field: "registration",
            headerName: t('admin.registration'),
            headerAlign: 'center',
            align: 'center',
            flex: 1.1,
            valueFormatter: (params) => format(parseISO(params.value), 'HH:mm, dd/MMM/yy', { locale: locale[t('locale')] })
        },
        {
            field: "lastLogin",
            headerName: t('admin.lastLogin'),
            headerAlign: 'center',
            align: 'center',
            flex: 1.1,
            valueFormatter: (params) => format(parseISO(params.value), 'HH:mm, dd/MMM/yy', { locale: locale[t('locale')] })
        },
        {
            field: 'role',
            headerName: t('admin.role'),
            flex: 0.6,
        },
        {
            field: 'status',
            headerName: t('admin.status'),
            flex: 0.6,
        },
        {
            field: 'buttons',
            headerAlign: 'center',
            align: 'center',
            flex: 0.4,
            headerClassName: 'header-tools',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem
                    color="primary"
                    label="Observe"
                    icon={
                        userRole === 'admin' ?
                        params.id === userEmail ?
                        <Link to={`/account`} ><Tooltip placement='right' title={t('admin.open')}><HomeWorkIcon /></Tooltip></Link> :
                        <Link to={`/account-admin/${params.id}`}><Tooltip placement='right' title={t('admin.open')}><HomeWorkIcon /></Tooltip></Link> 
                        : null
                    }
                />,
            ]
        }
    ];
}