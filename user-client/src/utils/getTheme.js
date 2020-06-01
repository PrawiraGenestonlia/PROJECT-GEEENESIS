import { TYPE_OF_THEME } from '../enum';

const theme = localStorage.getItem('TYPE_OF_THEME') || TYPE_OF_THEME.LIGHT_MODE;

export default theme;