import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setConfig as setConfigAction, resetConfig as resetConfigAction } from '../actions';
import { getCategories as getCategoriesFetch } from '../services';
import { ShieldExclamationIcon, SaveIcon } from '@heroicons/react/solid';
import ListBox from '../components/ListBox';
import logo from '../trivia.png';

const DEFAULT_DIFFICULTY = {
  Todas: 'Todas',
  hard: 'Dificil',
  medium: 'Medio',
  easy: 'Facil',
}

const DEFAULT_TYPES = {
  Todos: 'Todos',
  multiple: 'Multipla Escolha',
  boolean: 'Verdadeiro ou Falso'
}

const DEFAULT_NUMBER = [
  { id: 5, name: 5 },
  { id: 7, name: 7 },
  { id: 10, name: 10 },
  { id: 15, name: 15 },
  { id: 20, name: 20 },
];

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [], 
      settings: {
        amount: 5,
        difficulty: 'Todas',
        category: 0,
        type: 'Todos',
      },
    };
    this.getCategories = this.getCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetDefault = this.resetDefault.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { settings } = this.props;
    this.getCategories();
    this.setState({ settings })
  }

  async getCategories() {
    const categories = await getCategoriesFetch();
    this.setState({
      categories: [{ id: 0, name: 'Todas'}, ...categories],
    });
  }

  handleChange(value, name) {
    this.setState((prevState) => ({
      settings: {
        ...prevState.settings,
        [name]: value,
      }
    }))
  }

  resetDefault() {
    const { resetConfig, history } = this.props;
    resetConfig();
    history.push('/react-trivia-game');
  }

  handleSubmit(event) {
    event.preventDefault();
    const { settings } = this.state;
    const { setSettings, history } = this.props;
    setSettings(settings);
    history.push('/react-trivia-game');
  }

  render() {
    const { settings: { amount, difficulty, category, type }, categories } = this.state;
    return (
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 sm:border-solid sm:border-gray-200 sm:p-3 sm:border-2 sm:rounded-xl sm:shadow-md">
          <div className="relative mt-3">
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Configurações</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={this.handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <ListBox
                  value={amount}
                  name="amount"
                  label="Quantidade de perguntas"
                  curDisplay={amount}
                  array={DEFAULT_NUMBER}
                  onChange={this.handleChange}
                />
                <ListBox
                  value={difficulty}
                  name="difficulty"
                  label="Dificuldade"
                  curDisplay={DEFAULT_DIFFICULTY[difficulty]}
                  array={[
                    { name: 'Todas', id: 'Todas' },
                    { name: 'Dificil', id: 'hard' },
                    { name: 'Medio', id: 'medium' },
                    { name: 'Facil', id: 'easy' },
                  ]}
                  onChange={this.handleChange}
                />
                <ListBox
                  value={category}
                  name="category"
                  label="Categoria"
                  curDisplay={categories.length > 0 ? categories.find((cur) => Number(cur.id) === category).name : 'Todas'}
                  array={categories}
                  onChange={this.handleChange}
                />
                <ListBox
                  value={type}
                  name="type"
                  label="Tipo"
                  curDisplay={DEFAULT_TYPES[type]}
                  array={[
                    { name: 'Todos', id: 'Todos' },
                    { name: 'Multipla Escolha', id: 'multiple' },
                    { name: 'Verdadeiro ou Falso', id: 'boolean' }
                  ]}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-60 mb-1"
                data-testid="btn-play"
                onClick={this.resetDefault}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <ShieldExclamationIcon className="h-5 w-5 text-white group-hover:text-red-200" aria-hidden="true" />
                </span>
                Resetar Configurações
              </button>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 mb-1"
                data-testid="btn-play"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <SaveIcon className="h-5 w-5 text-white group-hover:text-indigo-200" aria-hidden="true" />
                </span>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => ({
  settings,
});

const mapDispatchToProps = (dispatch) => ({
  setSettings: (settings) => dispatch(setConfigAction(settings)),
  resetConfig: () => dispatch(resetConfigAction()),
});

Config.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  settings: PropTypes.shape({
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    difficulty: PropTypes.string.isRequired,
    category: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  setSettings: PropTypes.func.isRequired,
  resetConfig: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Config);
