import React from "react";
import s from "./style.css";

import { Router, Route, Link } from 'react-router'

import { Button } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <div className={s.header}>
        <div className={s.button}>
          <Link to={'/leaderboard'}><Button bsSize="large" blockLeaderboard>Leaderboard</Button></Link>
        </div>
      </div>
    );
  }
}
