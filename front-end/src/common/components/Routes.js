import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import LoginPage from '../../pages/login/page';
import HomePage from '../../pages/home/page';
import Leaderboard from '../../pages/leaderboard/page';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="home" component={HomePage} />
    <Route path="leaderboard" component={Leaderboard} />
  </Route>
);