import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';

import Lockr from 'Lockr';

export default class LoginPage extends React.Component {
  componentWillMount() {
    Lockr.flush();
    browserHistory.push('/login');
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
