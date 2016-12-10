import React from "react";
import s from "./style.css";

import { Router, Route, Link } from 'react-router'

import { Button } from 'react-bootstrap';
5
import { browserHistory } from 'react-router';
import Lockr from 'Lockr';

export default class Header extends React.Component {
  render() {
    var score = <div></div>

    if (Lockr.get('username')) {
      score = <h2>{Lockr.get('username')}'s score is {Lockr.get('score')}!</h2>
    }

    return (
      <div className={s.header}>
        <div className={s.button}>
          <Link to={'/leaderboard'}><Button bsSize="large">Leaderboard</Button></Link>
        </div>
        <div className={s.score}>
          {score}
        </div>
      </div>
    );
  }
}
