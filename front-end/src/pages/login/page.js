import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';


export default class LoginPage extends React.Component {
  signUp() {
    browserHistory.push('/home');
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.form}>
          <h1 className={styles.heading}>Login</h1>
          <form className={styles.loginForm}>
            <input type="text" placeholder="username"/>
            <input className={styles.password} type="password" placeholder="password" />
            <button>login</button>
            <p className="message">Admin or coach? <a href="#">Log in here</a></p>
          </form>
      </div>
      </div>
    );
  }
}
