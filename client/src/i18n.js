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
                    locale: 'en',
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
                        tableTitleAdmin: 'The list of reviews of the user:',
                        title: 'Review Title',
                        category: 'Category',
                        work: 'Name of the piece of art',
                        grade: 'Your grade',
                        createdAt: 'Review creation date',
                        tools: 'Tools',
                        edit: 'Edit the review',
                        open: 'Open the review',
                        create: 'Create a new review',
                        refresh: 'Refresh your reviews',
                        refreshAdmin: 'Refresh the reviews'
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
                        review: 'Review',
                        errors: {
                            error: 'There are errors in the next fields:',
                            field: 'The field',
                            blank: 'can not be blanked',
                            twoSymbols: 'must contain at least 2 symbols',
                            manySymbols: 'must contain at least 20 symbols'
                        },
                        congrat: 'Congratulations!',
                        success: 'Your review has been saved!',
                        wentWrong: 'Something went wrong...',
                        again: 'Please, try again later.',
                        clear: 'Clear page'
                    },
                    excerpt: {
                        seemore: 'See More',
                        grade: 'Author`s grade',
                        evaluate: 'Evaluate the piece of art'
                    },
                    sorting: {
                        load: 'Download reviews by:',
                        sort: 'Sort by:',
                        date: 'Latest Date',
                        grade: 'Best Grade'
                    },
                    zerofound: 'Unfortunately, nothing has been found... \nPlease, try again with another request.',
                    admin: {
                        email: 'Email',
                        name: 'User`s name',
                        reviewCount: 'Reviews written',
                        likes: 'Likes received',
                        registration: 'Registration date',
                        lastLogin: 'Last Login date',
                        role: 'Role',
                        status: 'Status',
                        open: 'Go to the user`s account',
                        delete: 'Delete the user',
                        block: 'Block the user',
                        unblock: 'Unblock the user',
                        admin: 'Assign administrator rights',
                        user: 'Assign user rights',
                        refresh: 'Refresh list of authors',
                        tableTitle: 'The list of authors'
                    },
                    block: {
                        title: 'You have been blocked!',
                        prohibited: 'You are not allowed to:',
                        review: '- create and edit reviews;',
                        like: '- like and evaluate reviews and pieces of arts;',
                        comment: '- comment reviews.'
                    },
                    review: {
                        author: "Review's author:",
                        date: 'Review creation date:',
                        work: 'The piece of art: ',
                        rate: "The average user's rate:",
                        like: 'Like the review',
                        tags: 'Tags:',
                        commentsTitle: 'Comments:',
                        typeComment: 'Type in your comment...',
                        commentsBlank: 'There seem to be no comments... Would you like to be the first?'
                    }
                }
            },
            ru: {
                translation: {
                    locale: 'ru',
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
                        tableTitleAdmin: 'Список обзоров пользователя:',
                        title: 'Название обзора',
                        category: 'Категория',
                        work: 'Название произведения',
                        grade: 'Ваша оценка',
                        createdAt: 'Дата создания обзора',
                        tools: 'Ред.',
                        edit: 'Ред. обзор',
                        open: 'Открыть обзор',
                        create: 'Создать новый обзор',
                        refresh: 'Обновить ваши обзоры',
                        refreshAdmin: 'Обновить обзоры'
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
                        review: 'Обзор',
                        errors: {
                            error: 'Возникли ошибки в следующих полях:',
                            field: 'Поле',
                            blank: 'не должно быть пустым',
                            twoSymbols: 'должно содержать минимум 2 символа',
                            manySymbols: 'должно содержать минимум 20 символов'
                        },
                        congrat: 'Поздравляем!',
                        success: 'Ваш обзор был сохранен!',
                        wentWrong: 'Что-то пошло не так...',
                        again: 'Пожалуйста, попробуйте позже.',
                        clear: 'Очистить контент'
                    },
                    excerpt: {
                        seemore: 'Подробнее',
                        grade: 'Оценка автора',
                        evaluate: 'Оценить произведение'
                    },
                    sorting: {
                        load: 'Загрузить обзоры по:',
                        sort: 'Сортировка по:',
                        date: 'Последней дате',
                        grade: 'Лучшей оценке'
                    },
                    zerofound: `К сожалению, ничего не удалось найти...\n Пожалуйста, измените свой запрос.`,
                    admin: {
                        email: 'Почта',
                        name: 'Имя пользователя',
                        reviewCount: 'Написано обзоров',
                        likes: 'Получено лайков',
                        registration: 'Дата регистрации',
                        lastLogin: 'Дата последнего логина',
                        role: 'Права',
                        status: 'Статус',
                        open: 'Перейти в кабинет пользователя',
                        delete: 'Удалить пользователя',
                        block: 'Заблокировать пользователя',
                        unblock: 'Разблокировать пользователя',
                        admin: 'Присвоить права администратора',
                        user: 'Присвоить права пользователя',
                        refresh: 'Обновить список авторов',
                        tableTitle: 'Список пользователей'
                    },
                    block: {
                        title: 'Вы были заблокированы!',
                        prohibited: 'Вы не можете:',
                        review: '- создавать и редактировать обзоры;',
                        like: '- лайкать и оценивать обзоры и произведения;',
                        comment: '- комментировать обзоры.'
                    },
                    review: {
                        author: 'Автор обзора:',
                        date: 'Дата написания обзора:',
                        work: 'Произведение: ',
                        rate: 'Средняя оценка пользователей:',
                        like: 'Поставить лайк',
                        tags: 'Тэги:',
                        commentsTitle: 'Комментарии:',
                        typeComment: 'Напишите свой комментарий...',
                        commentsBlank: 'Похоже никто не оставил комментарий. Будете первым?'
                    }
                }
            }
        }
    })

export default i18n;