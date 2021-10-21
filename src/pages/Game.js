import React from 'react';
import Header from '../components/Header';
import { fetchQuestions } from '../services';
import '../style/game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      curQuestion: 0,
      showAnswers: false,
    };
    this.addingQuestion = this.addingQuestion.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.addingQuestion();
  }

  async addingQuestion() {
    const token = localStorage.getItem('token');
    const questions = await fetchQuestions(token);
    this.setState({ questions });
  }

  handleClick({ target: { name } }) {
    console.log(name); // remover
    this.setState({ showAnswers: true });
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
    const { showAnswers } = this.state;
    if (answer === correct) {
      return (
        <button
          data-testid="correct-answer"
          type="button"
          name="correct"
          onClick={ this.handleClick }
          className={ showAnswers ? 'game-correct' : null }
        >
          {answer}
        </button>
      );
    }
    return (
      <button
        data-testid={ `wrong-answer-${id}` }
        type="button"
        name="wrong"
        onClick={ this.handleClick }
        className={ showAnswers ? 'game-incorrect' : null }
      >
        {answer}
      </button>);
  }

  render() {
    const { questions, curQuestion } = this.state;
    const result = questions[curQuestion];
    return (
      <>
        <Header />
        {questions.length === 0
          ? null
          : (
            <div>
              <p data-testid="question-category">{result.category}</p>
              <p data-testid="question-text">{result.question}</p>
              {
                this.shuffleQuestions([
                  result.correct_answer,
                  ...result.incorrect_answers,
                ]).map((answer, id) => (
                  this.renderButtons(answer, id, result.correct_answer)
                ))
              }
            </div>
          )}
      </>
    );
  }
}

export default Game;
