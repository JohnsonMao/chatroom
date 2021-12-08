import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

import UserInfo from "../User_info";
import Partner from "../Partner";
import Message from "../Message";
import Chat from "../Chat";
import User from "../User";
import Error from "../Error";

import HeaderNavbar from "../../components/HeaderNavbar";
import FooterNavbar from "../../components/FooterNavbar";
import getRedirectTo from "../../utils/getRedirectTo";
import { getUser } from "../../redux/actions";

export default function Main() {
  // 讀取 redux 中的 user 資料
  const user = useSelector((state) => state.user);
  const unReadCount = useSelector((state) => state.chat.unReadCount);
  // 讀取 cookie
  const userid = Cookies.get("userid");
  // 獲取當前路徑
  let path = useLocation().pathname;

  const dispatch = useDispatch();
  // 判斷自動登入
  useEffect(() => {
    if (userid && !user._id) {
      dispatch(getUser());
    }
  }, [dispatch, user._id, userid]);

  // route
  const navList = [
    {
      path: "/femalepartner",
      component: () => <Partner userListType="malePartner" />,
      title: "尋找女伴",
      icon: "user-friends",
      text: "女伴",
    },
    {
      path: "/malepartner",
      component: () => <Partner userListType="femalePartner" />,
      title: "尋找男伴",
      icon: "user-friends",
      text: "男伴",
    },
    {
      path: "/message",
      component: Message,
      title: "聊天訊息",
      icon: "comment-dots",
      text: "訊息",
    },
    {
      path: "/user",
      component: User,
      title: "設定個人資料",
      icon: "user-cog",
      text: "個人",
    },
  ];

  // 為獲取到 cookie，跳轉登入頁面
  if (!userid) return <Redirect to="/login" />;

  // 獲取到 cookie，檢查 user._id，路由重新定向
  if (!user._id) {
    return null;
  } else {
    if (path === "/") {
      console.log(user);
      path = getRedirectTo(user.userType, user.name);
      return <Redirect to={path} />;
    }
  }

  const currentNav = navList.find((nav) => nav.path === path);

  // 根據用戶類型過濾 FooterNavbar 的 navList
  if (currentNav) {
    if (user.userType === "malePartner") {
      navList[0].hide = true;
    } else {
      navList[1].hide = true;
    }
  }


  return (
    <>
      {currentNav ? <HeaderNavbar title={currentNav.title} /> : null}
      <Switch>
        {navList.map((item) => (
          <Route
            key={item.component}
            path={item.path}
            component={item.component}
          />
        ))}
        <Route path="/userinfo" component={UserInfo} />
        <Route path="/chat/:userid" component={Chat} />
        <Route component={Error} />
      </Switch>
      {currentNav ? (
        <FooterNavbar navList={navList} unReadCount={unReadCount} />
      ) : null}
    </>
  );
}
