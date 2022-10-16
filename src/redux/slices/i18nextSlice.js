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

export const i18nSlice = createSlice({
    name: "i18n",
    initialState,
    reducers: {
        setLang(state, action) {
            state.lang = action.payload;
        },
    },
});

export const { setLang } = i18nSlice.actions;

export const selectTranslations = (state) => state.i18n.translations[state.i18n.lang];
export default i18nSlice.reducer;