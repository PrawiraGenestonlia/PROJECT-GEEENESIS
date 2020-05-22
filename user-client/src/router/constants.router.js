/*
* ==========================================================
*                                                          |
*                     Client ROUTES                        |
*                 (Prawira Genestonlia)                    |
*                                                          |
* ==========================================================
*/

//SERVER EXTENDED URL

export const SERVER_BASE_URL = "/geeenesis-user";


//PUBLIC ROUTE
export const LOGIN_URL = "/login";
export const REDIRECT_URL = "/load-role";

//APP ROUTE
export const APP_URL = "/app";
export const HOME_URL = "/app/home";
export const CLUBS_URL = "/app/clubs";
export const SINGLE_CLUB_URL = "/app/clubs";
export const CHATS_URL = "/app/chats";
export const SINGLE_CHAT_URL = "/app/chats";
export const CALENDAR_URL = "/app/calendar";
export const PROFILES_URL = "/app/profiles";
export const MYEVENTS_URL = "/app/myevents";
export const MYCIRCLE_URL = "/app/mycircle";
export const SEARCH_URL = "/app/search";
export const ABOUT_URL = "/app/about";
export const SINGLE_PROFILE_URL = "/app/profiles";

//STANDALONE ROUTES
export const HOST_URL = "https://server.thexdream.net"
export const ADMIN_BASE_URL = "/geeenesis";
export const CLUB_STANDALONE_URL = "/club/";
export const FULL_CLUB_URL = HOST_URL + ADMIN_BASE_URL + CLUB_STANDALONE_URL;
export const EVENT_STANDALONE_URL = HOST_URL + ADMIN_BASE_URL + "/event/";