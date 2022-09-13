import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import { Route, Switch, useHistory } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

import {register} from "../../utils/auth"


function App() {

  const history = useHistory();
  
  function onRegister(email, password, name) {
    register(password, email, name)
      .then((res) => {
        if(res) {
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Switch>
        <Route path="/signup">
          <Register
            onRegister={onRegister} />
        </Route>
        <Route path="/signin">
          <Login />
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
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/saved-movies">
              <Movies />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
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
