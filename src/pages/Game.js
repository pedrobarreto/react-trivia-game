import React from 'react';
import { connect } from 'react-redux';
import Countdown from 'react-countdown';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../services';
import { saveScoreInStorage } from '../utils/localStorage';
import { setScore as setScoreAction } from '../actions';
import '../style/game.css';

const TIMER = 30000;
const ONE_SECOND = 1000;
let timer = 0;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      curQuestion: 0,
      showAnswers: false,
      difficulty: 1,
      next: false,
      startCountdown: false,
    };
    this.addingQuestion = this.addingQuestion.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.timer = this.timer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.nextQuestionState = this.nextQuestionState.bind(this);
  }

  componentDidMount() {
    this.addingQuestion();
  }

  async addingQuestion() {
    const token = localStorage.getItem('token');
    const result = await fetchQuestions(token);
    const questions = result.map((cur) => {
      const res = { ...cur };
      res.alternatives = this.shuffleQuestions(
        [cur.correct_answer, ...cur.incorrect_answers],
      );
      return res;
    });
    this.setState({
      questions,
      difficulty: questions[0].difficulty,
      showAnswers: false,
      next: false,
      startCountdown: true });
  }

  handleClick({ target: { name } }) {
    const { updateScore, score, assertions } = this.props;
    const { difficulty } = this.state;
    const TEN = 10;
    const points = { hard: 3, medium: 2, easy: 1 };
    if (name === 'correct') {
      const result = TEN + (Number(timer) * points[difficulty]);
      saveScoreInStorage(assertions + 1, score + result);
      updateScore({ score: score + result, assertions: assertions + 1 });
    }
    this.setState({ showAnswers: true, next: true, startCountdown: false });
  }

  nextQuestion() {
    const { next } = this.state;
    return (
      <button
        type="button"
        onClick={ this.nextQuestionState }
        data-testid="btn-next"
        style={ next ? { display: 'block' } : { display: 'none' } }
      >
        Próxima Pergunta
      </button>
    );
  }

  nextQuestionState() {
    const { history } = this.props;
    this.setState((state) => {
      if (state.questions.length <= state.curQuestion + 1) {
        history.push('/feedback');
        return;
      }
      return {
        curQuestion: state.curQuestion + 1,
        next: false,
        showAnswers: false,
        difficulty: state.questions[state.curQuestion + 1].difficulty,
        startCountdown: true,
      };
    });
  }

  shuffleQuestions(array) {
    const { showAnswers } = this.state;
    if (showAnswers) return array;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const random = Math.round(Math.random() * (i));
      const arrayIndex = array[i];
      const arrayRandom = array[random];
      array[random] = arrayIndex;
      array[i] = arrayRandom;
    }
    return array;
  }

  updateTimer(props) {
    const { startCountdown } = this.state;
    const { seconds } = props;
    if (startCountdown) {
      timer = seconds;
    }
    return (<div>{timer}</div>);
  }

  timer() {
    return (
      <Countdown
        intervalDelay={ ONE_SECOND }
        date={ Date.now() + TIMER }
        onComplete={ () => this.setState({ showAnswers: true, next: true }) }
        renderer={ this.updateTimer }
      >
        <span>Tempo acabou</span>
      </Countdown>
    );
  }

  renderButtons(answer, id, correct) {
    const { showAnswers } = this.state;
    if (answer === correct) {
      return (
        <button
          key={ id }
          data-testid="correct-answer"
          type="button"
          name="correct"
          onClick={ this.handleClick }
          className={ showAnswers ? 'game-correct' : null }
          disabled={ showAnswers }
        >
          {answer}
        </button>
      );
    }
    return (
      <button
        key={ id }
        data-testid={ `wrong-answer-${id}` }
        type="button"
        name="wrong"
        onClick={ this.handleClick }
        className={ showAnswers ? 'game-incorrect' : null }
        disabled={ showAnswers }
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
        {questions.length === 0 || curQuestion - 1 >= questions.length
          ? null
          : (
            <div>
              <div>
                <p data-testid="question-category">{result.category}</p>
                <p data-testid="question-text">{result.question}</p>
                {
                  result.alternatives.map((answer, id) => (
                    this.renderButtons(answer, id, result.correct_answer)
                  ))
                }
              </div>
              {this.timer()}
            </div>
          )}
        { this.nextQuestion() }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(setScoreAction(score)),
});

const mapStateToProps = ({ user }) => ({
  score: user.score,
  assertions: user.assertions,
});

Game.propTypes = {
  updateScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
