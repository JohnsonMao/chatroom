/* API */
import ajax from './ajax';

/* 註冊 API */
export const reqRegister = (user) => ajax('/register', user, "POST");
/* 登入 API */
export const reqLogin = (user) => ajax('/login', user, "POST");
/* 更新資料 API */
export const reqUpdateUser = (user) => ajax('/update', user, "POST");