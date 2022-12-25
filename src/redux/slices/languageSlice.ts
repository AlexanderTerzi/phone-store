import { getLangFromLS } from './../../utils/getLangFromLS';
import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { enTranslation } from "../../translation/locales/en/translation";
import { deTranslation } from '../../translation/locales/de/translation';
import { uaTranslation } from "../../translation/locales/ua/translation";
import { frTranslation } from "../../translation/locales/fr/translation";
import { setLanguage } from '../../utils/setLanguage';

interface ILanguageSliceState {
    lang: string;
    supportedLangs: {
        ua: string;
        en: string;
        de: string;
        fr: string;
    };
    translations: any;
}

const initialState: ILanguageSliceState = {
    lang: getLangFromLS(),
    supportedLangs: {
        ua: "Українська",
        en: "English",
        de: "Deutsch",
        fr: "Français",
    },
    translations: {
        ua: uaTranslation,
        en: enTranslation,
        de: deTranslation,
        fr: frTranslation,
    },
};

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLang(state, action: PayloadAction<string>) {
            state.lang = action.payload;
            setLanguage(action.payload)
        },
    },
});

export const { setLang } = languageSlice.actions;

export const selectLanguages = (state: RootState) => state.language;
export const selectTranslations = (state: RootState) => state.language.translations[state.language.lang];
export default languageSlice.reducer;