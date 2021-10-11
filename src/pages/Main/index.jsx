import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BossInfo from '../Boss_info';
import FreelanceInfo from '../Freelance_info';

export default function Main() {

  // 路由重新定向
  const user = useSelector(state => state.user);
  console.log( user)
  if (!user._id) return <Redirect to="/login"/>
  if (user.name) return <Redirect to={"/" + user.userType}/>

  return (
    <Switch>
      <Route path="/bossinfo" component={BossInfo}/>
      <Route path="/freelanceinfo" component={FreelanceInfo}/>
    </Switch>
  )
}
