import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'ru',
        resources: {
            en: {
                translation: {
                    navbar: {
                        search: "Search...",
                        profile: "Profile",
                        account: 'Personal account',
                        login: 'Log In',
                        logout: 'Log Out',
                        admin: 'Admin-panel',
                        home: 'Home',
                        dashboard: 'Dashboard'
                    },
                    profile: {
                        welcome: 'Welcome, {{name}}',
                        email: 'Your email:',
                        name: 'Your name:',
                        creationDate: 'Registration date:',
                        rights: 'Your rights:',
                        cancel: 'Cancel',
                        save: 'Save',
                        close: 'Close',
                        edit: 'Edit',
                        input: 'Input new name',
                        inputError: 'Input at least 2 symbols'
                    },
                    account: {
                        delete: 'Delete the selected review/reviews',
                        tableTitle: 'The list of your reviews',
                        title: 'Review Title',
                        category: 'Category',
                        work: 'Name of the piece of art',
                        grade: 'Your grade',
                        createdAt: 'Review creation date',
                        tools: 'Tools',
                        edit: 'Edit the review',
                        open: 'Open the review',
                        create: 'Create a new review'
                    },
                    createReview: {
                        create: 'Creation the new review',
                        edit: 'Edit the review',
                        placeholder: 'Start writing your review...',
                        work: 'Piece of art',
                        title: 'Review name',
                        category: 'Category',
                        tags: 'Tags',
                        grade: 'Your grade',
                        selectFile: 'Select Image',
                        uploadFile: 'Upload Image',
                        dragDrop: 'Drag and Drop Images to Upload Or',
                        cancel: 'Cancel',
                        upload: 'Upload',
                        confirm: 'Confirm',
                    }
                }
            },
            ru: {
                translation: {
                    navbar: {
                        search: "Поиск...",
                        profile: "Профиль",
                        account: 'Личный кабинет',
                        login: 'Войти',
                        logout: 'Выйти',
                        admin: 'Админ-панель',
                        home: 'На главную',
                        dashboard: 'Панель управления'
                    },
                    profile: {
                        welcome: 'Добро пожаловать, {{name}}',
                        email: 'Ваша почта:',
                        name: 'Ваше имя:',
                        creationDate: 'Дата регистрации:',
                        rights: 'Ваши права:',
                        cancel: 'Отменить',
                        save: 'Сохранить',
                        close: 'Закрыть',
                        edit: 'Редактировать',
                        input: 'Введите новое имя',
                        inputError: 'Введите минимум 2 символа'
                    },
                    account: {
                        delete: 'Удалить выбранный обзор/обзоры',
                        tableTitle: 'Список ваших обзоров',
                        title: 'Название обзора',
                        category: 'Категория',
                        work: 'Название произведения',
                        grade: 'Ваш оценка',
                        createdAt: 'Дата создания обзора',
                        tools: 'Ред.',
                        edit: 'Ред. обзор',
                        open: 'Открыть обзор',
                        create: 'Создать новый обзор'
                    },
                    createReview: {
                        create: 'Создание нового обзора',
                        edit: 'Редактирование обзора',
                        placeholder: 'Начните ваш обзор...',
                        work: 'Произведение',
                        title: 'Название обзора',
                        category: 'Категория',
                        tags: 'Тэги',
                        grade: 'Ваша оценка',
                        selectFile: 'Выберите картинку',
                        uploadFile: 'Загрузите картинку',
                        dragDrop: 'Перетащите картинку для загрузки или',
                        cancel: 'Отменить',
                        upload: 'Загрузить',
                        confirm: 'Сохранить',
                    }
                }
            }
        }
    })

export default i18n;