import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG} from './action-types';

const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo: ''  // 重新指定路由
}

// 產生 user 狀態的 reducer
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:    // data: user
      return {...action.data, redirectTo: '/'};
    case ERROR_MSG:       // data: msg
      return {...state, msg: action.data};
    default:
      return state;
  }
}

export default combineReducers({
  user
})