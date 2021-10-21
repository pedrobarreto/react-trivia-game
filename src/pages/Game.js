import React from 'react';
import Header from '../components/Header';
import { fetchQuestions } from '../services';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
    this.addingQuestion = this.addingQuestion.bind(this);
  }

  componentDidMount() {
    this.addingQuestion();
  }

  addingQuestion() {
    const { state } = this;
    this.setState({ ...state }, async () => {
      const token = localStorage.getItem('token');
      const questions = await fetchQuestions(token);
      this.setState({
        questions,
      });
    });
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

  renderButtons(answer, id, correct) {
    return answer === correct
      ? <button data-testid="correct-answer" type="button">{answer}</button>
      : <button data-testid={ `wrong-answer-${id}` } type="button">{answer}</button>;
  }

  render() {
    const { questions: { results } } = this.state;
    return (
      <>
        <Header />
        {!results
          ? null
          : results.map((result, index) => (
            <div key={ index }>
              <p data-testid="question-category">{result.category}</p>
              <p data-testid="question-text">{result.question}</p>
              {
                this.shuffleQuestions([
                  results.correct_answer,
                  ...results.incorrect_answers,
                ]).map((answer, id) => (
                  this.renderButtons(answer, id, results.correct_answer)
                ))
              }
            </div>
          ))}
      </>
    );
  }
}

export default Game;
