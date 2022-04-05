import { SET_CONFIG, RESET_CONFIG } from "../actions/types";

const INITIAL_STATE = {
  amount: 5,
  difficulty: 'Todas',
  category: 0,
  type: 'Todos',
}

const settingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CONFIG:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_CONFIG:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  };
};

export default settingsReducer;
