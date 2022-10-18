import { createSlice } from "@reduxjs/toolkit";

import { defaultLang, supportedLangs } from "../../translation/i18nConfig";
import { enTranslation } from "../../translation/locales/en/translation";
import { ruTranslation } from "../../translation/locales/ru/translation";
import { uaTranslation } from "../../translation/locales/ua/translation";

const initialState = {
    lang: defaultLang,
    supportedLangs: { ...supportedLangs },
    translations: {
        ua: uaTranslation,
        en: enTranslation,
        ru: ruTranslation,
    },
};

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLang(state, action) {
            state.lang = action.payload;
        },
    },
});

export const { setLang } = languageSlice.actions;

export const selectTranslations = (state) => state.language.translations[state.language.lang];
export default languageSlice.reducer;