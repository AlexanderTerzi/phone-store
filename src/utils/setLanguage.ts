export const setLanguage = (lang: string) => {
    localStorage.setItem("languages", JSON.stringify(lang));
};