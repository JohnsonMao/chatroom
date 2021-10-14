import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import BossInfo from '../Boss_info';
import FreelanceInfo from '../Freelance_info';
import Boss from '../Boss';
import Freelance from '../Freelance';
import Message from '../Message';
import User from '../User';
import Error from '../Error';

import HeaderNavbar from '../../components/HeaderNavbar';
import FooterNavbar from '../../components/FooterNavbar';
import navList from '../../config/navList';
import getRedirectTo from '../../utils/getRedirectTo';
import { getUser } from '../../redux/actions';

export default function Main() {

  // 讀取 redux 中的 user 資料
  const user = useSelector(state => state.user);
  // 讀取 cookie
  const userid = Cookies.get('userid');
  // 獲取當前路徑
  let path = useLocation().pathname;

  const dispatch = useDispatch();
  // 判斷自動登入
  useEffect(()=>{
    if (userid && !user._id) {
      dispatch(getUser());
    } 
  },[])

  // 為獲取到 cookie，跳轉登入頁面
  if (!userid) return <Redirect to="/login"/>

  // 獲取到 cookie，檢查 user._id，路由重新定向
  if (!user._id) {
    return null;
  } else {
    if (path === '/') {
      console.log(user)
      path = getRedirectTo(user.userType, user.name);
      return <Redirect to={ path }/>
    }
  }

  const currentNav = navList.find(nav => nav.path === path);

  return (
    <>
      {
        currentNav ? <HeaderNavbar title={currentNav.title}/> : null
      }
      <Switch>
        {
          navList.map( item => (
            <Route key={item.component} path={item.path} component={item.component}/>
          ))
        }
        <Route path="/bossinfo" component={BossInfo}/>
        <Route path="/freelanceinfo" component={FreelanceInfo}/>
        <Route component={Error}/>
      </Switch>
      {
        currentNav ? <FooterNavbar navList={navList}/> : null
      }
    </>
  )
}
