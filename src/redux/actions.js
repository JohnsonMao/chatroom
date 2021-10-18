import io from "socket.io-client";
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg,
} from "../api";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
} from "./action-types";

function initSocketIO() {
  if (!io.socket) {
    io.socket = io("ws://localhost:4000");

    // 接收訊息
    io.socket.on("receiveMsg", function (chatMsg) {
      console.log("接收訊息", chatMsg);
    });
  }
}

// 獲取訊息列表
async function getMsgList (dispatch) {
  initSocketIO();   // 初始化 socket
  const response = await reqChatMsgList();
  const result = response.data;
  if (result.code === 0) {
    const { users, chatMsgs } = result.data;
    dispatch( receiveMsgList({users, chatMsgs}));
  }
}

// 發送訊息的非同步 action
export const sendMsg = ({ from, to, content }) => {
  return (dispatch) => {
    console.log("發送訊息", { from, to, content });
    io.socket.emit("sendMsg", { from, to, content });
  };
};

// 授權成功同步 action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user });
// 錯誤訊息同步 action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg });
// 接收使用者同步 action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user });
// 重置使用者同步 action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg });
// 接收使用者列表同步 action
export const receiveUserList = (userList) => ({
  type: RECEIVE_USER_LIST,
  data: userList,
});
// 接收訊息列表的同步 action
export const receiveMsgList = ({ users, chatMsgs }) => ({
  type: RECEIVE_MSG_LIST,
  data: { users, chatMsgs },
});

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
      getMsgList(dispatch);
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
      getMsgList(dispatch);
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

// 獲取使用者資料非同步 action
export const getUser = () => {
  return async (dispatch) => {
    const response = await reqUser();
    const result = response.data;
    if (result.code === 0) {
      getMsgList(dispatch);
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser(result.msg));
    }
  };
};

// 獲取使用者列表非同步 action
export const getUserList = (type) => {
  return async (dispatch) => {
    const response = await reqUserList(type);
    const result = response.data;
    if (result.code === 0) {
      dispatch(receiveUserList(result.data));
    }
  };
};
