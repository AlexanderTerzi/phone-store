import cookies from 'js-cookie';
import i18next from 'i18next';

export const defaultLang = cookies.get('i18next') || 'ua';

export const supportedLangs = {
    ua: "Українська",
    en: "English",
    ru: "Русский",
};