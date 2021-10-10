import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BossInfo from '../Boss_info';
import FreelanceInfo from '../Freelance_info';

export default function Main() {
  return (
    <Switch>
      <Route path="/bossinfo" component={BossInfo}/>
      <Route path="/freelanceinfo" component={FreelanceInfo}/>
    </Switch>
  )
}
