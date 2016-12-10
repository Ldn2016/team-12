import React from "react";
import styles from "./style.css";

import { Router, Route, Link } from 'react-router'

import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';

export default class Leaderboard extends React.Component {
  constructor() {
    super();

    this.state = {
      users: [
          {
            username: "John",
            score: 12
          },
          {
            username: "Mary",
            score: 22
          },
          {
            username: "Zane",
            score: 2
          }
        ]
    }
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
