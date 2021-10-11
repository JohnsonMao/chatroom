import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER} from './action-types';

import getRedirectTo from '../utils/getRedirectTo';

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
      const { userType, name } = action.data;
      return {...action.data, redirectTo: getRedirectTo(userType, name)};
    case ERROR_MSG:       // data: msg
      return {...state, msg: action.data};
    case RECEIVE_USER:    // data: user
      return action.data;
    case RESET_USER:       // data: msg，初始化狀態
      return {...initUser, msg: action.data};
    default:
      return state;
  }
}

export default combineReducers({
  user
})
