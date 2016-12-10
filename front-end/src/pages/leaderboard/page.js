import React from "react";
import styles from "./style.css";

import { Router, Route, Link } from 'react-router'

import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';

import Lockr from 'Lockr';
var request = require('superagent');

export default class Leaderboard extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [
          {
            username: "John",
            score: 22
          },
          {
            username: "Mary",
            score: 12
          },
          {
            username: "Zane",
            score: 2
          }
        ]
    }
  }

  componentWillMount() {
    request
      .post('https://sturdy-abstract.herokuapp.com/leaderboardrequest')
      .send({ requestType: 'leaderboard' })
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Credentials', 'true')
      .end((err, res) => {
          console.log(res);
      });
  }

  render() {
    var statsDiv = this.state.users.map(user => {
      return <ListGroupItem key={user.username}><h4>{user.score}:</h4> <h5>{user.username}</h5></ListGroupItem>;
    })

    return (
      <div className={styles.content}>
        <div className={styles.back}><Link to={'/home'}><Button bsSize="large">Home</Button></Link></div>
        <h1>Leaderboard</h1>
        <ListGroup>
          {statsDiv}
        </ListGroup>
      </div>
    );
  }
}
