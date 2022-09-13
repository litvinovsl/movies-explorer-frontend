import { useState, useEffect } from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { Route, Switch, useHistory } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { register, login, validToken } from "../../utils/auth";


function App() {
  // const [name, setName] = useState(false);
  // const [email, setEmail] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
    checkToken();
  });

  function onRegister(email, password, name) {
    register(password, email, name)
      .then((res) => {
        if (res) {
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function onLogin(email, password) {
    login(password, email)
      .then((res) => {
        setLoggedIn(true);
        if (res) {
          history.push('/movies');
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkToken() {
    const token = localStorage.getItem('jwt');
    if(token) {
      validToken(token)
      .then((res) => {
        if(res) {
          console.log(res.data)
          setLoggedIn(true);
          history.push('/movies');
        };
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function logoutProfile() {
    console.log('bye')
    localStorage.removeItem('jwt');
    history.push('/');
    setLoggedIn(false);
  }

  return (
    <div>
      <Switch>
        <Route path="/signup">
          <Register
            onRegister={onRegister} />
        </Route>
        <Route path="/signin">
          <Login
            onLogin={onLogin} />
        </Route>
        <Route exact path="/">
          <Header
            class='header_main' />
          <Main />
          <Footer />
        </Route>
        <Route exact path={['/movies', '/saved-movies', '/profile']}>
          <Header />
          <Switch>
            <ProtectedRoute
              component={Movies}
              loggedIn={loggedIn}
              exact
              path='/movies' />
            <ProtectedRoute
              component={Movies}
              loggedIn={loggedIn}
              exact
              path='/saved-movies' />
            <ProtectedRoute
              logoutProfile={logoutProfile}
              component={Profile}
              loggedIn={loggedIn}
              exact
              path='/profile' />
          </Switch>
          <Route exact path={['/', '/movies', '/saved-movies']}>
            <Footer />
          </Route>
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
