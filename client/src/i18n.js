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
                    search: "Search...",
                    profile: "Profile",
                    account: 'Personal account',
                    login: 'Log In',
                    logout: 'Log Out'
                }
            },
            ru: {
                translation: {
                    search: "Поиск...",
                    profile: "Профиль",
                    account: 'Личный кабинет',
                    login: 'Войти',
                    logout: 'Выйти'
                }
            }
        }
    })

export default i18n;