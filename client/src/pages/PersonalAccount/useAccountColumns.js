import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import { format, parseISO } from 'date-fns';

import { GridActionsCellItem } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

export const useAccountColumns = () => {
    const locale = {
        ru: ruLocale,
        en: enLocale
    }
    const { t } = useTranslation();

    return [
        { field: "id", headerName: "ID", headerAlign: 'center', align: 'center', flex: 0.1 },
        {
            field: "title",
            headerName: t('account.title'),
            flex: 1.5,
        },
        {
            field: 'category',
            headerName: t('account.category'),
            flex: 0.6,
            valueFormatter: (params) => (params.value[0].toUpperCase() + params.value.slice(1))
        },
        {
            field: "work",
            headerName: t('account.work'),
            flex: 1.5,
            valueFormatter: (params) => (params.value[0].toUpperCase() + params.value.slice(1))
        },
        { field: "grade", headerName: t('account.grade'), headerAlign: 'center', align: 'center', flex: 0.6 },
        {
            field: "createdAt",
            headerName: t('account.createdAt'),
            headerAlign: 'center',
            align: 'center',
            flex: 1.3,
            valueFormatter: (params) => format(parseISO(params.value), 'HH:mm, dd/MMM/yy', { locale: locale[t('locale')] })
        },
        {
            field: 'buttons',
            headerName: t('account.tools'),
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            headerClassName: 'header-tools',
            type: 'actions',
            getActions: (params) => [
                <GridActionsCellItem
                    color="primary"
                    label="Observe"
                    icon={<Link to={`/review/${params.id}`}><Tooltip placement='left' title={t('account.open')}><SearchIcon /></Tooltip></Link>}
                />,
                <GridActionsCellItem
                    color="error"
                    label="Edit"
                    icon={<Link to={`/edit-review/${params.id}`}><Tooltip placement='right' title={t('account.edit')}><EditIcon /></Tooltip></Link>}
                />
            ]
        }
    ];

}

