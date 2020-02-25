/*
* ==========================================================
*                                                          |
*                     API ROUTES                        |
*                 (Prawira Genestonlia)                    |
*                                                          |
* ==========================================================
*/

// ********** SERVER CONSTANTS **********
export const API_SERVER = "https://server.thexdream.net/geeenesis-api"

export const LOGIN_URI = API_SERVER + "/user/login";
export const CHANGE_PASSWORD_URI = API_SERVER + "/user/changepasswordwithoutemail";

//club api
export const GETCLUBS = API_SERVER + "/club-admin/get-clubs";

//event api
export const GETEVENT = API_SERVER + "/event/get-events";
export const GETEVENTFROMTODAY = API_SERVER + "/event/get-events-from-today";

//profile api
export const GETMYPROFILE = API_SERVER + "/profile/get-my-profile";
export const GETMYCHATLIST = API_SERVER + "/profile/get-my-chat-list";
