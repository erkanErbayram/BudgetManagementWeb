import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import MainRoutes from './routes/MainRoutes';
import NavRoutes from './routes/NavRoutes';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './components/Main';
import Accounts from './pages/Accounts';
import Profile from './pages/Profile';
import NotFound from './components/NotFound';
import IncomeExpense from './pages/IncomeExpense';
import Reports from './pages/Reports';
import Rate from './pages/Rate';

import { useSelector } from 'react-redux';
import { loadUser } from './redux/actions/authAction'
import store from "./redux/store";
import setAuthToken from './utils/setAuthToken';
function App() {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: "LOGOUT" });
    });
    if (isAuthenticated) {
      return <Redirect to="/main" />;
    } else {
      return <Redirect to="/login" />;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <NavRoutes exact path="/" component={Home} />
        <NavRoutes exact path="/login" component={Login} />
        <NavRoutes exact path="/signup" component={Signup} />
        <MainRoutes exact path="/main" component={Main} />
        <MainRoutes exact path="/Accounts" component={Accounts} />
        <MainRoutes exact path="/IncomeExpense" component={IncomeExpense} />
        <MainRoutes exact path="/Reports" component={Reports} />
        <MainRoutes exact path="/Rate" component={Rate} />
        <MainRoutes exact path="/Profile" component={Profile} />
        <NavRoutes component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;