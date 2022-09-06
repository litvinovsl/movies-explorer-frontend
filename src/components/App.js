import Header from "./Header/Header";
import Main from "./Main/Main";
import Movies from "./Movies/Movies";
import Profile from "./Profile/Profile";
import Footer from "./Footer/Footer";
import { Route, Switch } from "react-router-dom";


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route  path="/movies">
          <Movies />
        </Route>
        <Route  path="/saved-movies">
          <Movies />
        </Route>
        <Route  path="/profile">
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
