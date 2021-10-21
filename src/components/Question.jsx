import React from 'react';
import { fetchQuestions } from '../services';
import { getTokenFromStorage } from '../utils/localStorage';

class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      curQuestion: 0,
    };
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
  }

  componentDidMount() {
    const token = getTokenFromStorage();
    fetchQuestions(token)
      .then((res) => this.setState({ questions: res, curQuestion: 0 }));
  }

  shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const random = Math.round(Math.random() * (i));
      const arrayIndex = array[i];
      const arrayRandom = array[random];
      array[random] = arrayIndex;
      array[i] = arrayRandom;
    }
    return array;
  }

  render() {
    const { questions, curQuestion } = this.state;
    if (questions.length === 0) return (<div>Carregando...</div>);
    const {
      category,
      // type,
      // difficulty,
      question,
      correct_answer: correct,
      incorrect_answers: incorrect,
    } = questions[curQuestion];
    const answers = this.shuffleQuestions([...incorrect, correct]);
    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        {answers.map((cur) => {
          if (cur === correct) {
            return (
              <button
                key={ cur }
                type="button"
                data-testid="correct-answer"
              >
                {cur}
              </button>
            );
          }
          const incorrectIndex = incorrect.indexOf(cur);
          return (
            <button
              key={ incorrectIndex }
              type="button"
              data-testid={ `wrong-answer-${incorrectIndex}` }
            >
              {cur}
            </button>
          );
        })}
      </div>
    );
  }
}

export default Question;
