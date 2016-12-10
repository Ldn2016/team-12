import React from "react";
import styles from "./style.css";

import ReactList from 'react-list';
import { Router, Route, Link, browserHistory } from 'react-router';
import Lockr from 'Lockr';

export default class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      exercises: [
        {
          name: "Numbers to ",
          progress: 50,
          points: 32,
          url: "http://google.com/"
        },
        {
          name: "Chemistry",
          progress: 30,
          points: 12,
          url: "http://google.com/"
        },
        {
          name: "Physics",
          progress: 80,
          points: 44,
          url: "http://google.com/"
        }
    ],
    lessons: [
      {
        name: "Biology",
        exercises: [
          {
            name: "Numbers to 120",
            completed: true,
            url: "http://google.com/"
          },
          {
            name: "Make 10",
            completed: false,
            url: "http://google.com/"
          },
          {
            name: "Groups of ten",
            progress: 80,
            completed: true,
            url: "http://google.com/"
          },
          {
            name: "Groups of ten",
            progress: 80,
            completed: true,
            url: "http://google.com/"
          }
        ]
      },
      {
        name: "Chemistry",
        exercises: [
          {
            name: "Numbers to 120",
            completed: true,
            url: "http://google.com/"
          },
          {
            name: "Make 10",
            completed: false,
            url: "http://google.com/"
          },
          {
            name: "Groups of ten",
            progress: 80,
            completed: true,
            url: "http://google.com/"
          }
        ]
      },
      {
        name: "Physics",
        exercises: [
          {
            name: "Numbers to 120",
            completed: true,
            url: "http://google.com/"
          },
          {
            name: "Make 10",
            completed: false,
            url: "http://google.com/"
          },
          {
            name: "Groups of ten",
            progress: 80,
            completed: true,
            url: "http://google.com/"
          }
        ]
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
      return (
        <a key={exercise.name} href={exercise.url}>
          <section>
            <img src="http://placehold.it/150x150" />
            <h3>{exercise.name}</h3>
            <div className={styles.textWrap}>
              <p>{exercise.progress}% completed</p>
              <p>{exercise.points} points</p>
            </div>
          </section>
        </a>
      )
    });
    var lessonsDiv = this.state.lessons.map(lesson => {
      return (
        <Link to={"lesson/" + lesson.name.toLowerCase()} key={lesson.name}>
          <section>
            <img src="http://placehold.it/150x150" />
            <h3>{lesson.name}</h3>
            <div className={styles.textWrap}>
              <p>Completed: 2/{lesson.exercises.length}</p>
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
