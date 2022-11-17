import cookies from 'js-cookie';

export const defaultLang = cookies.get('i18next') || 'ua';

export const supportedLangs = {
    ua: "Українська",
    en: "English",
    ge: "Deutsch",
    fr: "Français",
};