
export const TYPE_OF_LAYOUT = {
  "SIDE_BURGER": "SIDE_BURGER",
  "BOTTOM_TAB": "BOTTOM_TAB",
  "DEFAULT": "BOTTOM_TAB"
}

export const TYPE_OF_THEME = {
  "LIGHT_MODE": "LIGHT_MODE",
  "DARK_MODE": "DARK_MODE",
  "DEFAULT": "DARK_MODE"
}

export const EVENT_BUTTON_OPTIONS = {
  "ADD_FAV": "ADD_FAV",
  "DEL_FAV": "DEL_FAV",
  "ADD_INT": "ADD_INT",
  "DEL_INT": "DEL_INT",
  "ADD_PART": "ADD_PART",
  "DEL_PART": "DEL_PART"
}

// Filter Generator
// https://codepen.io/sosuke/pen/Pjoqqp?__cf_chl_jschl_tk__=a3daf962d32c9077f30de11d9081ba85e525be17-1584092724-0-AQQYPMLlxSVWr9GUmkUjYk2Qm9aTBb8Lkk5timAm2V0j8B5ME81ufiUF3JBiBvF7Vw2WSu4dyzns1h0WZGzRqwg6qp-oBlD9qBZDhoRHZc5RRXQqJT9thMkcC7dqsr4jCvCo0JibIAgwjTCHvDhba9G7qXwWC5XipGWiPhzQH9QkHzd1IZHY3BpVkv_QnjHjt2j-pb4mG52B-Zd1Vxw9Nb3utQf3ca_DOqfthsoLrUQUa6t0HnztTcLn_9zgOy8UozJZPGB_RAJ4ebvwGRwBulMiWBFK1ohlyVshR67SioNr0I2mGvSkvtqq2pkVqkSP-lvHWMfL99Fgm3tFg9F14LO_L6yCY1EtZofssWIDSxjg

export const GLOBAL_COLOR = {
  "LIGHT_MODE": {
    BACKGROUND_C: '#f1f1f1',
    BACKGROUND_SECONDARY: '#ffffff',
    FONT: '#000000',
    DIVIDER: '#bdc0c7',
    ICON_FILTER: 'invert(0%) sepia(0%) saturate(7489%) hue-rotate(69deg) brightness(116%) contrast(100%)',
    HOME_TAB_COVER: {
      BACKGROUND: 'rgb(164,141,255)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(164,141,255,1) 0%, rgba(144,235,247,1) 100%)'
    },
    CIRCLE_TAB_COVER: {
      BACKGROUND: 'rgb(231,240,111)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(231,240,111,1) 0%, rgba(115,222,140,1) 100%)'
    },
    CALENDAR_TAB_COVER: {
      BACKGROUND: 'rgb(255,148,148)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(255,148,148,1) 0%, rgba(255,220,100,1) 100%)'
    },
    CHAT_TAB_COVER: {
      BACKGROUND: 'rgb(135,255,184)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(135,255,184,1) 0%, rgba(118,254,255,1) 100%)'
    },
    ME_TAB_COVER: {
      BACKGROUND: 'rgb(255,194,252)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(255,194,252,1) 0%, rgba(255,171,171,1) 100%)'
    },
  },
  "DARK_MODE": {
    BACKGROUND_C: '#000000',
    BACKGROUND_SECONDARY: '#202020',
    FONT: '#ffffff',
    DIVIDER: '#202020',
    ICON_FILTER: 'invert(100%) sepia(0%) saturate(30%) hue-rotate(102deg) brightness(106%) contrast(106%)',
    HOME_TAB_COVER: {
      BACKGROUND: 'rgb(30,26,47)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(30,26,47,1) 0%, rgba(27,45,47,1) 100%)'
    },
    CIRCLE_TAB_COVER: {
      BACKGROUND: 'rgb(44,46,21)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(44,46,21,1) 0%, rgba(27,52,33,1) 100%)'
    },
    CALENDAR_TAB_COVER: {
      BACKGROUND: 'rgb(57,33,33)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(57,33,33,1) 0%, rgba(56,48,21,1) 100%)'
    },
    CHAT_TAB_COVER: {
      BACKGROUND: 'rgb(29,55,39)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(29,55,39,1) 0%, rgba(21,46,46,1) 100%)'
    },
    ME_TAB_COVER: {
      BACKGROUND: 'rgb(55,42,54)',
      BACKGROUND_GRADIENT: 'linear-gradient(135deg, rgba(55,42,54,1) 0%, rgba(55,37,37,1) 100%)'
    },
  }
}

export const THEME_COLOR = GLOBAL_COLOR[localStorage.getItem('TYPE_OF_THEME') || TYPE_OF_THEME.LIGHT_MODE];