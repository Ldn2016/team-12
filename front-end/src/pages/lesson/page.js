import React from "react";
import styles from "./style.css";

import ReactList from 'react-list';

import { Router, Route, Link } from 'react-router';
import { Button } from 'react-bootstrap';

import Lockr from 'Lockr';

export default class LessonPage extends React.Component {
  constructor() {
    super();

    this.state = {
      exerciseId: "",
      exercises: [
        {
          name: "Numbers to 100",
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
        },
        {
          name: "Biology",
          progress: 80,
          points: 44,
          url: "http://google.com/"
        }
    ]
  };

    this.renderItem = this.renderItem.bind(this);
  }


  componentWillMount() {
    this.setState({
      exerciseName: this.props.params.lessonId
    });

    var exercises = JSON.parse(Lockr.get('exercises'));
    var tasks = [];

    console.log(exercises);

    for (var index in exercises) {
      var attr = exercises[index];
      if (attr == "one") continue;

      if (attr.name.toLowerCase() , " ", this.props.params.lessonId.toLowerCase()) {
        tasks = attr.tasks;
      }
    }

    this.setState({"exercises" : tasks});
  }

  renderItem(index, key) {
    return <div key={key}>{this.state.exercises[index].name}</div>;
  }

  render() {
    var countCompleted = 0;

    var exerciseDiv = this.state.exercises.map(exercise => {
      console.log(exercise);
      return (
        <a key={exercise.title} href={exercise.url}>
          <section style={{backgroundColor: "rgb(" + (255 - (255 * Math.round((exercise.progress / 100)))) + "," + (255 * Math.round((exercise.progress / 100))) + ", 0)"}}>
            <img src="http://placehold.it/150x150" />
            <h3>{exercise.title}</h3>
            <div className={styles.textWrap}>
              <p>{exercise.progress}% completed</p>
            </div>
          </section>
        </a>
      )
    });
    return (
      <div className={styles.content}>
        <div className={styles.back}><Link to={'/home'}><Button bsSize="large">Home</Button></Link></div>
        <h1>{this.state.exerciseName}:</h1>
        <div className={styles.verticalScroll}>
          {exerciseDiv}
        </div>
      </div>
    );
  }


}
