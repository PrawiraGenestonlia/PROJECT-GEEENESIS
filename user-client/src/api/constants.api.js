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
export const FORGET_PASSWORD_URI = API_SERVER + "/user/forgetpassword";

//club api
export const GETCLUBS = API_SERVER + "/club-admin/get-clubs";

//event api
export const GETEVENT = API_SERVER + "/event/get-events";
export const GETEVENTFROMTODAY = API_SERVER + "/event/get-events-from-today";

//profile api
export const GETMYPROFILE = API_SERVER + "/profile/get-my-profile";
export const GETMYCHATLIST = API_SERVER + "/profile/get-my-chat-list";

//upload api 
export const CHANGEAVATAR = API_SERVER + "/upload-image/avatar-image";

//chat api 
export const GETCHATS = API_SERVER + "/chat/get-chats";
export const POSTCHATS = API_SERVER + "/chat/post-chats";
export const CLEAR_CHAT = API_SERVER + "/chat/clear-chats/";

//mentor api
export const SEACH_MENTOR_PROFILE = API_SERVER + "/mentor/mentor-profile";