import { combineReducers } from "redux";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
} from "./action-types";

import getRedirectTo from "../utils/getRedirectTo";

const initUser = {
  username: "",
  type: "",
  msg: "",
  redirectTo: "", // 重新指定路由
};

// 產生 user 狀態的 reducer
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: // data: user
      const { userType, name } = action.data;
      return { ...action.data, redirectTo: getRedirectTo(userType, name) };
    case ERROR_MSG: // data: msg
      return { ...state, msg: action.data };
    case RECEIVE_USER: // data: user
      return action.data;
    case RESET_USER: // data: msg，初始化狀態
      return { ...initUser, msg: action.data };
    default:
      return state;
  }
}

const initUserList = [];

// 產生 user list 狀態的 reducer
function userList(state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state;
  }
}

const initChat = {
  users: {},
  chatMsgs: [],
  unReadCound: 0
}

// 產生聊天狀態的 reducer

function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:  // data: {users, chatMsgs}
      const { users, chatMsgs } = action.data;
      return {
        users,
        chatMsgs,
        unReadCound: 0
      }
    case RECEIVE_MSG:
      return 
    default:
      return state;
  }
}

export default combineReducers({
  user,
  userList,
  chat
});
