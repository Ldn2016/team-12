import React from "react";
import styles from "./style.css";

import ReactList from 'react-list';
import { Router, Route, Link, browserHistory } from 'react-router';
import Lockr from 'Lockr';

var request = require('superagent');

export default class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      exercises: [
        {
          name: "Maths",
          tasks: [{
            "title": "title 1",
             "completed": false,
             "progress": 0,
             "recommendation": 0,
             "url": 'http://198.199.112.173:8008/api/topic_tree/khan?parent=',
             "score": Math.floor((Math.random() * 10) + 1),
          }],
          recommendation: 32
        },
        {
          name: "Geog",
          tasks: [{
            "title": "title 2",
             "completed": false,
             "progress": 0,
             "recommendation": 0,
             "url": 'http://198.199.112.173:8008/api/topic_tree/khan?parent=',
             "score": Math.floor((Math.random() * 10) + 1),
          }],
          recommendation: 32
        },
        {
          name: "Bio",
          tasks: [{
            "title": "title 3",
             "completed": false,
             "progress": 0,
             "recommendation": 0,
             "url": 'http://198.199.112.173:8008/api/topic_tree/khan?parent=',
             "score": Math.floor((Math.random() * 10) + 1),
          }],
          recommendation: 32
        }
    ]
    };
  }

  componentWillMount() {
    if (!Lockr.get('username')) {
      browserHistory.push('/login');
    }
  }

  render() {
    var countCompleted = 0;

    var exerciseDiv = this.state.exercises.map(exercise => {
      return exercise.tasks.map(lesson => {
        return (
          <a key={lesson.title} href={lesson.url}>
            <section>
              <img src="http://placehold.it/150x150" />
              <h3>{lesson.title}</h3>
              <div className={styles.textWrap}>
                <p>{lesson.progress}% completed</p>
                <p>{lesson.score} points</p>
              </div>
            </section>
          </a>
        )
      })
    });
    var lessonsDiv = this.state.exercises.map(exercise => {
      return (
        <Link to={"lesson/" + exercise.name.toLowerCase()} key={exercise.name}>
          <section>
            <img src="http://placehold.it/150x150" />
            <h3>{exercise.name}</h3>
            <div className={styles.textWrap}>
              <p>Lesson Score: {exercise.recommendation}</p>
            </div>
          </section>
        </Link>
      )
    });
    return (
      <div className={styles.content}>
        <h1>Lessons:</h1>
        <div className={styles.horizontalScroll}>
          {lessonsDiv}
        </div>
        <h1>Contine with progress:</h1>
        <div className={styles.horizontalScroll}>
          {exerciseDiv}
        </div>
      </div>
    );
  }


}
