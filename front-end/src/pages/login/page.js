import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';
var rp = require('request-promise');
import Lockr from 'Lockr';

var jquery = require('jquery');

var request = require('superagent');

export default class LoginPage extends React.Component {
  constructor() {
    super();

    this.state = {
      username: ""
    }

    this.handleUsername = this.handleUsername.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleUsername(event) {
    this.setState({username: event.target.value});
  }

  componentWillMount() {
    if (Lockr.get('username')) {
      browserHistory.push('/home');
    }
  }

  handleClick(e) {
    e.preventDefault();
    request
      .post('https://sturdy-abstract.herokuapp.com/leaderboardrequest')
      .send({ requestType: 'score', userid: this.state.username })
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Credentials', 'true')
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        //
        // Lockr.set('username', this.state.username);
        // Lockr.set('score', res.body.score);
        // browserHistory.push('/home');

        request
          .get('http://sturdy-so.herokuapp.com/exercises')

          .end((err2, res2) => {
            console.log(res2);
          });
      });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <h1 className={styles.heading}>Login</h1>
          <form action="" className={styles.loginForm}>
            <input type="text" onChange={this.handleUsername} placeholder="username"/>
            <input className={styles.password} type="password" placeholder="password" />
            <button onClick={this.handleClick}>login</button>
            <p className="message">Admin or coach - <a href="#">Log in here</a></p>
          </form>
        </div>
        <div className={styles.container}>
        </div>
        <ul className={styles.bgBubbles}>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      		<li></li>
      	</ul>
      </div>
    );
  }
}
