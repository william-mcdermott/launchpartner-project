import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../components/NotFoundPage'
import LoginPage from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import DashboardPage from '../components/DashboardPage'
import AddUserPage from '../components/AddUserPage'
import EditUserPage from '../components/EditUserPage'
import ViewUserPage from '../components/ViewUserPage'

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true}/>
        <PrivateRoute path="/dashboard" component={DashboardPage}/>
        <PrivateRoute path="/create" component={AddUserPage}/>
        <PrivateRoute path="/edit/:id" component={EditUserPage}/>
        <PrivateRoute path="/view/:id" component={ViewUserPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>
)

export default AppRouter;
