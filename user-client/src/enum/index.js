import THEME from '../utils/getTheme';

export const TYPE_OF_LAYOUT = {
  "SIDE_BURGER": "SIDE_BURGER",
  "BOTTOM_TAB": "BOTTOM_TAB"
}

export const TYPE_OF_THEME = {
  "LIGHT_MODE": "LIGHT_MODE",
  "DARK_MODE": "DARK_MODE"
}

export const EVENT_BUTTON_OPTIONS = {
  "ADD_FAV": "ADD_FAV",
  "DEL_FAV": "DEL_FAV",
  "ADD_INT": "ADD_INT",
  "DEL_INT": "DEL_INT",
  "ADD_PART": "ADD_PART",
  "DEL_PART": "DEL_PART"
}

export const GLOBAL_COLOR = {
  "LIGHT_MODE": {
    BACKGROUND_C: '#f1f1f1',
    FONT_COLOR: '#000000',
    HOME_TAB_COVER: {
      BACKGROUND: 'rgb(0,218,255)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(0,218,255,1) 0%, rgba(161,68,237,1) 100%)'
    },
    CIRCLE_TAB_COVER: {
      BACKGROUND: 'rgb(255,226,89)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(255,226,89,1) 0%, rgba(255,167,81,1) 100%)'
    },
    CALENDAR_TAB_COVER: {
      BACKGROUND: '',
      BACKGROUND_GRADIENT: ''
    },
    CHAT_TAB_COVER: {
      BACKGROUND: '',
      BACKGROUND_GRADIENT: ''
    },
    ME_TAB_COVER: {
      BACKGROUND: '',
      BACKGROUND_GRADIENT: ''
    },
  },
  "DARK_MODE": {
    BACKGROUND_C: '#000000',
    FONT_COLOR: '#ffffff',
    HOME_TAB_COVER: {
      BACKGROUND: '',
      BACKGROUND_GRADIENT: ''
    },
    CIRCLE_TAB_COVER: {
      BACKGROUND: '',
      BACKGROUND_GRADIENT: ''
    },
    CALENDAR_TAB_COVER: {
      BACKGROUND: '',
      BACKGROUND_GRADIENT: ''
    },
    CHAT_TAB_COVER: {
      BACKGROUND: '',
      BACKGROUND_GRADIENT: ''
    },
    ME_TAB_COVER: {
      BACKGROUND: '',
      BACKGROUND_GRADIENT: ''
    },
  }
}

export const THEME_COLOR = GLOBAL_COLOR[THEME];