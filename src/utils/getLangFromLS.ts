export const getLangFromLS = () => {
    const isLangInit = localStorage.getItem("languages");

    if (!isLangInit) {
        const currentLang = 'ua';

        localStorage.setItem("languages", JSON.stringify(currentLang));
        return currentLang;
    } else {
        const currentLang = JSON.parse(localStorage.getItem("languages")!);
        return currentLang;
    }
}