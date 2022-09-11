import Register from "./Register/Register";
import Login from "./Login/Login";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import Profile from "./Profile/Profile";
import Footer from "./Footer/Footer";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound/NotFound";


function App() {
  return (
    <div>
      <Switch>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>

        <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>
          <Route exact path="/">
            <Header
            class='header_main' />
            <Main />
          </Route>
          <Header />

          <Switch>

            {/* <Route exact path="/">
              <Main />
            </Route> */}

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
