import React from 'react';
import { connect } from 'react-redux';
import Countdown from 'react-countdown';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services';
import { ArrowRightIcon } from '@heroicons/react/outline';
import { saveScoreInStorage, addRanking, generateInfos } from '../utils/localStorage';
import { setScore as setScoreAction } from '../actions';
import '../style/game.css';
import { Link } from 'react-router-dom';

const TIMER = 30000;
const ONE_SECOND = 1000;
let timer = 0;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
    if (questions.length === 0) return;
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
      <div className="w-full flex justify-center">
        <button
          type="button"
          onClick={this.nextQuestionState}
          data-testid="btn-next"
          className="group relative w-11/12 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 my-4"
          disabled={!next}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <ArrowRightIcon className="h-5 w-5 text-white group-hover:text-indigo-200" aria-hidden="true" />
          </span>
          Próxima Pergunta
        </button>
      </div>
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
    if (timer === 0) return (<p className="text-center font-bold text-xl text-red-600">Tempo acabou</p>)
    return (<p className={classNames(timer > 10 ? 'text-blue-800' : 'text-red-600', 'text-center font-bold text-2xl')}>{timer} s</p>);
  }

  timer() {
    return (
      <Countdown
        intervalDelay={ ONE_SECOND }
        date={ Date.now() + TIMER }
        onComplete={ () => this.setState({ showAnswers: true, next: true }) }
        renderer={ this.updateTimer }
      />
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
          className={classNames(showAnswers ? 'bg-green-500 hover:bg-green-600 focus:ring-green-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500', 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2')}
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
        className={classNames(showAnswers ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500', 'group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2')}
        disabled={ showAnswers }
      >
        {this.formatText(answer)}
      </button>);
  }

  render() {
    const { questions, curQuestion } = this.state;
    const result = questions[curQuestion];
    return (
      <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
        {questions.length === 0 || curQuestion - 1 >= questions.length
          ? <div className="lg:min-w-mincontainer md:min-w-mincontainersm flex flex-col md:flex-row items-center md:justify-center shadow-md rounded-xl border-solid border-gray-200 border-2 font-serif font-bold text-xl py-6">Nao foi possivel encontrar questoes, arrume as<Link to="/settings" className="ml-2 text-blue-700 underline">Configurações</Link></div>
          : (
            <div className="lg:min-w-mincontainer md:min-w-mincontainersm flex flex-col md:flex-row items-center md:justify-center shadow-md rounded-xl border-solid border-gray-200 border-2">
              <div className="min-w-md w-full md:h-container border-solid border-b-2 border-gray-200 md:border-r-2 md:border-b-0">
                <p data-testid="question-category" className="font-serif font-semibold text-xl text-purple-700 rounded-t-xl md:rounded-t-none md:rounded-tl-xl overflow-hidden bg-gradient-to-r from-indigo-50 to-indigo-100 text-center p-4">{result.category}</p>
                <p data-testid="question-text" className="mx-3 mt-2 md:h-16 font-mono antialiased leading-tight font-semibold overflow-auto">{this.formatText(result.question)}</p>
                {this.timer()}
                {this.nextQuestion()}
              </div>
              <div className="max-w-md w-full md:h-container flex flex-col items-center md:justify-center space-y-5 p-3">
                {
                  result.alternatives.map((answer, id) => (
                    this.renderButtons(answer, id, result.correct_answer)
                  ))
                }
              </div>
            </div>
          )}
      </div>
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
