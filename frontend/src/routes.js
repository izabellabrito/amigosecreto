import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/login';
import Main from './pages/main';
import Details from './pages/details';
import New from './pages/new';
import SignUp from './pages/signUp';
import Header from './components/header';
import { isAuthenticate } from './helpers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticate() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signUp" component={SignUp} />
      <PrivateRoute path="/main" component={Main} />
      <PrivateRoute path="/details/:group" component={Details} />
      <PrivateRoute path="/new" component={New} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
