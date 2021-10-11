import { reqRegister, reqLogin, reqUpdateUser } from "../api";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
} from "./action-types";

// 授權成功同步 action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
// 錯誤訊息同步 action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
// 接收使用者同步 action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user})
// 重置使用者同步 action
const resetUser = (msg) => ({ type: RESET_USER, data: msg})


// 註冊非同步 action
export const register = (user) => {
  const { username, password, checkPassword, userType } = user;
  // 前端驗證
  if (!username.trim()) {
    return errorMsg("請輸入帳號！");
  } else if (password !== checkPassword) {
    return errorMsg("確認密碼要一致！");
  }

  return async (dispatch) => {
    const response = await reqRegister({ username, password, userType });
    const result = response.data; // { code: 0/1, data: user, msg: ''};
    if (result.code === 0) {
      // 成功
      dispatch(authSuccess(result.data));
    } else {
      // 失敗
      dispatch(errorMsg(result.msg));
    }
  };
};

// 登入非同步 action
export const login = (user) => {
  const { username, password } = user;
  // 前端驗證
  if (!username.trim()) {
    return errorMsg("請輸入帳號！");
  } else if (!password.trim()) {
    return errorMsg("請輸入密碼！");
  }
  return async (dispatch) => {
    const response = await reqLogin(user);
    const result = response.data;
    if (result.code === 0) {
      // 成功
      dispatch(authSuccess(result.data));
    } else {
      // 失敗
      dispatch(errorMsg(result.msg));
    }
  };
};

// 更新使用者資料非同步 action
export const updateUser = (user) => {
  return async (dispatch) => {
    const response = await reqUpdateUser(user);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};
