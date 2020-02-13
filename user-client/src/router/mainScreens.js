import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute';

import {
  HOME_URL, CLUBS_URL, SINGLE_CLUB_URL, CHATS_URL,
  SINGLE_CHAT_URL, CALENDAR_URL, PROFILES_URL, SINGLE_PROFILE_URL
} from './constants.router';

import HomeScreen from '../pages/homeScreen';
import ClubsScreen from '../pages/clubsScreen';
import SingleClubScreen from '../pages/individualClubScreen';
import ChatsScreen from '../pages/chatSummaryScreen';
import SingleChatScreen from '../pages/individualChatScreen';
import CalendarScreen from '../pages/calendarScreen';
import ProfilesScreen from '../pages/profileScreen';
import SingleProfileScreen from '../pages/individualProfileScreen';

export default () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={() => <Redirect to={HOME_URL} />} />
      <PrivateRoute exact path={HOME_URL} component={HomeScreen} />
      <PrivateRoute exact path={CLUBS_URL} component={ClubsScreen} />
      <PrivateRoute exact path={SINGLE_CLUB_URL + "/:club_id"} component={SingleClubScreen} />
      <PrivateRoute exact path={CHATS_URL} component={ChatsScreen} />
      <PrivateRoute exact path={SINGLE_CHAT_URL + "/:target_id"} component={SingleChatScreen} />
      <PrivateRoute exact path={CALENDAR_URL} component={CalendarScreen} />
      <PrivateRoute exact path={PROFILES_URL} component={ProfilesScreen} />
      <PrivateRoute exact path={SINGLE_PROFILE_URL + "/:student_id"} component={SingleProfileScreen} />
      <PrivateRoute path component={() => <Redirect to={HOME_URL} />} />
    </Switch>
  )
}