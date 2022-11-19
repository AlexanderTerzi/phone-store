import { getLangFromLS } from './../../utils/getLangFromLS';
import { RootState } from './../store';
import { createSlice } from "@reduxjs/toolkit";

import { enTranslation } from "../../translation/locales/en/translation";
import { geTranslation } from "../../translation/locales/ge/translation";
import { uaTranslation } from "../../translation/locales/ua/translation";
import { frTranslation } from "../../translation/locales/fr/translation";

interface ILanguageSliceState {
    lang: string;
    supportedLangs: {
        ua: string;
        en: string;
        ge: string;
        fr: string;
    };
    translations: any;
}

const initialState: ILanguageSliceState = {
    lang: getLangFromLS(),
    supportedLangs: {
        ua: "Українська",
        en: "English",
        ge: "Deutsch",
        fr: "Français",
    },
    translations: {
        ua: uaTranslation,
        en: enTranslation,
        ge: geTranslation,
        fr: frTranslation,
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

export const selectLanguages = (state: RootState) => state.language;
export const selectTranslations = (state: RootState) => state.language.translations[state.language.lang];
export default languageSlice.reducer;