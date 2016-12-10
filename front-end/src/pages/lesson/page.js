import React from "react";
import styles from "./style.css";

import ReactList from 'react-list';

export default class LessonPage extends React.Component {
  constructor() {
    super();

    this.state = {
      exerciseName: this.props.params.lessonId,
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
    ]
  };

    this.renderItem = this.renderItem.bind(this);
  }

  componentWillMount() {

  }

  renderItem(index, key) {
    return <div key={key}>{this.state.exercises[index].name}</div>;
  }

  render() {
    var countCompleted = 0;

    var exerciseDiv = this.state.exercises.map(exercise => {
      return (
        <a  key={exercise.name} href={exercise.url}>
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
    return (
      <div className={styles.content}>
        <h1>Contine with progress:</h1>
        <div className={styles.horizontalScroll}>
          {exerciseDiv}
        </div>
      </div>
    );
  }


}
