import * as actionTypes from './actionTypes';

const changeTheme = (theme) => {
  return {
    type: actionTypes.CHANGE_THEME,
    theme,
  };
};

const changeFont = (font) => {
  return {
    type: actionTypes.CHANGE_FONT,
    font,
  };
};

const forceTheme = (force_dark) => {
  return {
    type: actionTypes.FORCE_APPEARANCE,
    force_dark,
  };
};

const changeLanguage = (language) => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    language,
  };
};

export const setIntro = (intro) => {
  return {
    type: actionTypes.SET_INTRO,
    intro,
  };
};

export const onChangeTheme = (theme) => (dispatch) => {
  dispatch(changeTheme(theme));
};

export const onForceTheme = (mode) => (dispatch) => {
  dispatch(forceTheme(mode));
};

export const onChangeFont = (font) => (dispatch) => {
  dispatch(changeFont(font));
};

export const onChangeLanguage = (language) => (dispatch) => {
  dispatch(changeLanguage(language));
};
