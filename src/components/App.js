import Login from "./Login/Login";
import Register from "./Register/Register";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import Profile from "./Profile/Profile";
import Footer from "./Footer/Footer";
import { Route, Switch } from "react-router-dom";


function App() {
  return (
    <div>
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route exact path={['/', '/movies', '/saved-movies', '/profile']}>

          <Header />

          <Switch>

            <Route exact path="/">
              <Main />
            </Route>

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
						404 Page
				</Route>
      </Switch>



    </div>
  );
}

export default App;
