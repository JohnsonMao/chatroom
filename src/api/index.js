/* API */
import ajax from './ajax';

/* 註冊 API */
export const reqRegister = (user) => ajax('/register', user, "POST");
/* 登入 API */
export const reqLogin = (user) => ajax('/login', user, "POST");
/* 更新資料 API */
export const reqUpdateUser = (user) => ajax('/update', user, "POST");
/* 獲取使用者資料 API */
export const reqUser = () => ajax('/user');
/* 獲取用戶列表 API */
export const reqUserList = (type) => ajax('/userlist', {type});
/* 獲取聊天列表 API */
export const reqChatMsgList = () => ajax('/msglist');
/* 已讀 API */
export const reqReadMsg = (from) => ajax('/readmsg', { from }, "POST");