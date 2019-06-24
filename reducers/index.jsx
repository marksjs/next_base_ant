import {combineReducers} from "redux";
// import {timeline} from './timeline';
// import {notificacao} from './header';


const rootReducer = (state = {email: '', password: '', loading: false}, action) => {
  switch (action.type) {
    case 'PROFILE':
      return {...state, profile: action.profile};
    case 'ERROR':
      return {loading: false};
    case 'PROCESSING':
      return {loading: true};
    default:
      return state
  }
};
//const rootReducer = combineReducers({timeline,notificacao});

export default rootReducer;

