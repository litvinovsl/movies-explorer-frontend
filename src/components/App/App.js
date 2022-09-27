import { useState, useEffect } from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";
import api from "../../utils/MainApi";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { register, login, validToken } from "../../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setСurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesWithFilter, setSavedMoviesWithFilter] = useState([]);
  const [isLikedMovie, setIsLikedMovie] = useState(false);
  const [isDelLikedMovie, setIsDelLikedMovie] = useState(false);
  const [movies, setMovies] = useState([]);
  const [allInitilMovies, setAllInitilMovies] = useState([]);
  const [moviesFilterValue, setMoviesFilterValue] = useState('');
  const [renderedMovieCards, setRenderedMovieCards] = useState([]);
  const [savedMoviesFilterValue, setSavedMoviesFilterValue] = useState('');
  const [shortFilmsFilter, setShortFilmsFilter] = useState(false);
  const [shortSavedFilmsFilter, setShortSavedFilmsFilter] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [moviesWithLikeState, setMoviesWithLikeState] = useState([]);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  const [isGoodInfoTooltip, setIsGoodInfoTooltip] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    api
      .getMovies(token)
      .then((data) => {
        setSavedMovies(data);
        setSavedMoviesWithFilter(data);
      })
      .catch((err) => {
        // console.log(err)
      })
  }, [isLikedMovie, setIsLikedMovie, isDelLikedMovie, setIsDelLikedMovie, loggedIn]);

  useEffect(() => {
    setSavedMoviesFilterValue('');
    setShortSavedFilmsFilter(false);
    setSavedMoviesWithFilter(savedMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])


  useEffect(() => {
    const token = localStorage.getItem('jwt');

    api
      .getUserInfo(token)
      .then((data) => {
        setСurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function onRegister(email, password, name) {
    register(password, email, name)
      .then((res) => {
        if (res) {
          onLogin(email, password);
        }
      })
      .catch((err) => {
        setIsInfoTooltip(true);
        setIsGoodInfoTooltip(false);
        if (err === '409') {
          setInfoTooltipMessage('E-mail занят.')
          return
        } if (err === '400') {
          setInfoTooltipMessage('E-mail введен некорректно.')
          return
        } else {
          setInfoTooltipMessage('Сервер не отвечает, попробуйте позже.')
        }
      });
  }

  function onLogin(email, password) {
    login(password, email)
      .then((res) => {
        setLoggedIn(true);
        setIsInfoTooltip(true);
        setIsGoodInfoTooltip(true);
        setInfoTooltipMessage(`Добро пожаловать!`);
        if (res) {
          history.push('/movies');
          localStorage.setItem('jwt', res.token);
        }
      })
      .catch((err) => {
        setIsInfoTooltip(true);
        setIsGoodInfoTooltip(false);
        if (err === '401') {
          setInfoTooltipMessage('Пароль или E-mail не верный.')
          return
        } if (err === '400') {
          setInfoTooltipMessage('E-mail введен некорректно.')
          return
        } else {
          console.log(err)
          setInfoTooltipMessage('Сервер не отвечает, попробуйте позже.')
        }
        console.log(err);
      });
  }

  function checkToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      validToken(token)
        .then((res) => {
          setLoggedIn(true);
          setСurrentUser(res.data);
          history.push(location.pathname);
        })
        .then(() => {
          api
            .getMovies(token)
            .then((data) => {
              setSavedMovies(data);
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      logoutProfile();
    }
  }

  function logoutProfile() {
    console.log('bye')
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('moviesInputValue');
    localStorage.removeItem('shortFilmsCheckboxValue');
    setMovies([]);
    setMoviesFilterValue('');
    setSavedMoviesFilterValue('');
    setShortFilmsFilter(false);
    setShortSavedFilmsFilter(false);
    history.push('/');
    setLoggedIn(false);
  }
  function handleUpdateUser({ name, email }) {
    api
      .updateUserInfo({ name, email })
      .then(() => {
        setIsInfoTooltip(true);
        setIsGoodInfoTooltip(true);
        setInfoTooltipMessage('Профиль успешно обновлен.')
      })
      .catch((err) => {
        setIsInfoTooltip(true);
        setIsGoodInfoTooltip(false);
        if (err === '409 Conflict') {
          setInfoTooltipMessage('E-mail занят.')
          return
        } if (err === '400 Bad Request') {
          setInfoTooltipMessage('E-mail введен некорректно.')
          return
        } else {
          setInfoTooltipMessage('Сервер не отвечает, попробуйте позже.')
        }
        console.log(err)
      });
  }
  function handleCloseTooltip() {
    setIsInfoTooltip(false);
  }

  //===============================================//

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setСurrentUser,
        movies,
        setMovies,
        moviesFilterValue,
        savedMoviesFilterValue,
        setSavedMoviesFilterValue,
        setMoviesFilterValue,
        shortFilmsFilter,
        setShortFilmsFilter,
        shortSavedFilmsFilter,
        setShortSavedFilmsFilter,
        isPreloader,
        setIsPreloader,
        allInitilMovies,
        setAllInitilMovies,
        savedMovies,
        setSavedMovies,
        moviesWithLikeState,
        setMoviesWithLikeState,
        isLikedMovie,
        setIsLikedMovie,
        isDelLikedMovie,
        setIsDelLikedMovie,
        savedMoviesWithFilter,
        setSavedMoviesWithFilter,
        renderedMovieCards,
        setRenderedMovieCards
      }}>
      <div>
        <Switch>
          <Route path="/signup">
            {loggedIn ?
              <Redirect to="/" /> : (
                <Register
                  onRegister={onRegister} />
              )}
          </Route>
          <Route path="/signin">
            {loggedIn ?
              <Redirect to="/" /> : (
                <Login
                  onLogin={onLogin} />
              )}
          </Route>
          <Route exact path="/">
            <Header class='header_main' loggedIn={loggedIn} />
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
                onUpdateUser={handleUpdateUser}
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
        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={handleCloseTooltip}
          message={infoTooltipMessage}
          goodMessageTooltip={isGoodInfoTooltip} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
