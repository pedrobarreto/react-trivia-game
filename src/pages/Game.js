import React from 'react';
import { connect } from 'react-redux';
import Countdown from 'react-countdown';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../services';
import { saveScoreInStorage, addRanking, generateInfos } from '../utils/localStorage';
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
    this.formatText = this.formatText.bind(this);
  }

  componentDidMount() {
    this.addingQuestion();
  }

  async addingQuestion() {
    const { updateScore, amount, difficulty, type, category } = this.props;
    const difficultyRes = difficulty === 'Todas' ? '' : difficulty;
    const categoryRes = category == 0 ? '' : category;
    const typeRes = type === 'Todos' ? '' : type;
    saveScoreInStorage();
    updateScore({ score: 0, assertions: 0 });
    const token = localStorage.getItem('token');
    const result = await fetchQuestions(token, amount, categoryRes, difficultyRes, typeRes);
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

  formatText(string) {
    // função do Lucas Rodrigues Turma 08
    // encodeURIComponent faz tudo oq nao é letra e numero ficar no formato Percent Encoding ex: ' ' = %20
    // referencia https://www.w3schools.com/tags/ref_urlencode.ASP
    // unescape faz o Percent Encoding virar caracteres
    // https://www.geeksforgeeks.org/javascript-unescape/#:~:text=The%20unescape()%20function%20in,when%20decoded%20via%20unescape().
    const stringUTF = unescape(encodeURIComponent(string));
    return stringUTF.replace(/&quot;|&#039;/gi, '\'');
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
        const { hash, name, score } = generateInfos();
        const picture = `https://www.gravatar.com/avatar/${hash}`;
        addRanking(name, score, picture);
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
    const { seconds, completed, api: { start } } = props;
    if (startCountdown) {
      timer = seconds;
      if (completed) {
        this.setState({ startCountdown: false });
      }
    }
    if (completed) start();
    if (timer === 0) return (<span>Tempo acabou</span>)
    return (<span>{timer}</span>);
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
          {this.formatText(answer)}
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
        {this.formatText(answer)}
      </button>);
  }

  render() {
    const { questions, curQuestion } = this.state;
    const result = questions[curQuestion];
    return (
      <>
        <Header />
        <div className="min-h-full flex md:items-center md:justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 sm:border-solid sm:border-gray-200 sm:p-3 sm:border-2 sm:rounded-xl sm:shadow-md">

          </div>
          <div className="max-w-md w-full space-y-8 sm:border-solid sm:border-gray-200 sm:p-3 sm:border-2 sm:rounded-xl sm:shadow-md">

          </div>
        </div>




        {questions.length === 0 || curQuestion - 1 >= questions.length
          ? null
          : (
            <div>
              <div>
                <p data-testid="question-category">{result.category}</p>
                <p data-testid="question-text">{this.formatText(result.question)}</p>
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

const mapStateToProps = ({ user, settings: { amount, difficulty, category, type } }) => ({
  score: user.score,
  assertions: user.assertions,
  amount,
  difficulty,
  category,
  type,
});

Game.propTypes = {
  updateScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  difficulty: PropTypes.string.isRequired,
  category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
