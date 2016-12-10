import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';

import Lockr from 'Lockr';

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
    Lockr.set('username', this.state.username);
    browserHistory.push('/home');
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
