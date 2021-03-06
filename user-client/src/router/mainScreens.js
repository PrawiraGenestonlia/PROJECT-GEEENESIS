import React from 'react';
import { Switch, Redirect, useLocation } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import '../transition/transition.css';
import {
  HOME_URL, CLUBS_URL, SINGLE_CLUB_URL, CHATS_URL, ME_URL, SINGLE_EVENT_C_URL,
  SINGLE_CHAT_URL, CALENDAR_URL, PROFILES_URL, SINGLE_EVENT_URL, SETTINGS_URL,
  MYEVENTS_URL, MYCIRCLE_URL, SEARCH_URL, ABOUT_URL, SEARCH_PROFILE_URL
} from './constants.router';

import HomeScreen from '../pages/homeScreen';
import ClubsScreen from '../pages/clubsScreen';
import SingleClubScreen from '../pages/individualClubScreen';
import ChatsScreen from '../pages/chatSummaryScreen';
import SingleChatScreen from '../pages/individualChatScreen';
import CalendarScreen from '../pages/calendarScreen';
import ProfilesScreen from '../pages/profileScreen';
import SingleProfileScreen from '../pages/individualProfileScreen';
import MyEventsScreen from '../pages/myEventsScreen';
import myCircleScreen from '../pages/myCircleScreen';
import SearchScreen from '../pages/searchScreen';
import AboutScreen from '../pages/aboutScreen';
import setingsScreen from '../pages/settingsScreen';
import MeScreen from '../pages/meScreen';
import SingleEventScreen from '../pages/individualEventScreen';

export default () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={500} >
        <Switch location={location}>
          <PrivateRoute exact path="/" component={() => <Redirect to={HOME_URL} />} />
          <PrivateRoute exact path={HOME_URL} component={HomeScreen} />
          <PrivateRoute exact path={CLUBS_URL} component={ClubsScreen} />
          <PrivateRoute exact path={SINGLE_CLUB_URL + "/:club_id/:club_name"} component={SingleClubScreen} />
          <PrivateRoute exact path={CHATS_URL} component={ChatsScreen} />
          <PrivateRoute exact path={SINGLE_CHAT_URL + "/:target_id/:name"} component={SingleChatScreen} />
          <PrivateRoute exact path={SEARCH_PROFILE_URL + "/:target_id/:name"} component={SingleProfileScreen} />
          <PrivateRoute exact path={SINGLE_EVENT_URL + "/:from_page/:event_id/:event_name"} component={SingleEventScreen} />
          <PrivateRoute exact path={SINGLE_EVENT_C_URL + "/:from_page/:event_id/:event_name"} component={SingleEventScreen} />
          <PrivateRoute exact path={CALENDAR_URL} component={CalendarScreen} />
          <PrivateRoute exact path={PROFILES_URL} component={ProfilesScreen} />
          <PrivateRoute exact path={MYEVENTS_URL} component={MyEventsScreen} />
          <PrivateRoute exact path={MYCIRCLE_URL} component={myCircleScreen} />
          <PrivateRoute exact path={SEARCH_URL} component={SearchScreen} />
          <PrivateRoute exact path={ABOUT_URL} component={AboutScreen} />
          <PrivateRoute exact path={SETTINGS_URL} component={setingsScreen} />
          <PrivateRoute exact path={ME_URL} component={MeScreen} />
          <PrivateRoute path component={() => <Redirect to={HomeScreen} />} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}