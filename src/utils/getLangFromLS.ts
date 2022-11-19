export const getLangFromLS = () => {
    const language = localStorage.getItem('language') || 'ua';

    return language;
}