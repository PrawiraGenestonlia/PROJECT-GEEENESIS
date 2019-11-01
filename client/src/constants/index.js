/*
* ==========================================================
*                                                          |
*                     Client ROUTES                        |
*                 (Prawira Genestonlia)                    |
*                                                          |
* ==========================================================
*/

//SERVER EXTENDED URL
export const SERVER_BASE_URL = "/geeenesis/";

//PUBLIC ROUTE
export const CLUB_STANDALONE_URL = "/club/";

//TODO
export const CLUB_INFO_URL = "/club-information/";
export const CALENDAR_OF_EVENTS = "/calendar-of-events/";

//ADMIN APP ROUTE
export const ADMIN_LOGIN_URL = "/admin/login/";
export const ADMIN_DASHBOARD_URL = "/admin/dashboard/";
export const ADMIN_USERMANAGEMENT_URL = "/admin/user-management/";
export const ADMIN_EVENTMANAGEMENT_URL = "/admin/event-management/";
export const ADMIN_MENTORING_URL = "/admin/mentoring/";
export const ADMIN_INFORMATION_URL = "/admin/information/";
export const ADMIN_PROFILE_URL = "/admin/profile/";
export const EDITOR_URL = "/admin/editor/";

//STUDENT PWA ROUTE


/*
* ==========================================================
*                                                          |
*                       API ROUTES                         |
*                 (Prawira Genestonlia)                    |
*                                                          |
* ==========================================================
*/

//SERVER URL
export const SERVERURL = "https://server.thexdream.net/geeenesis-api";

//PUBLIC API - NON TOKEN
export const LOGIN = "/user/login";

//PUBLIC API - TOKEN
export const GETROLE = "/get-user/role";

//ADMIN - USER API
export const ADDUSER = "/admin-user/add-user";          //C
export const GETALLUSERS = "/admin-user/get-all-user";  //R
export const UPDATEUSER = "/admin-user/update-user";    //U
export const DELETEUSER = "/admin-user/delete-user";    //D

//ADMIN - CLUB API
export const CREATECLUB = "/club-admin/create-club";    //C
export const GETCLUB = "/club-admin/get-clubs";         //R
export const UPDATECLUB = "/club-admin/edit-club";      //U
