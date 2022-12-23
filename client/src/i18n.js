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
                        admin: 'Admin-panel'
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
                        inputError: 'Input at least 2 symbols',
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
                        admin: 'Админ-панель'
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
                    }
                }
            }
        }
    })

export default i18n;