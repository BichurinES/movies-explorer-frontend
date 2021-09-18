import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'; 
import { useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainHeader from '../MainHeader/MainHeader';
import LoggedHeader from '../LoggedHeader/LoggedHeader';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged'));
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({});
  
  function openPopup(data) {
    setInfoTooltipData(data);
    setIsPopupOpened(true);
  }

  function closePopup() {
    setIsPopupOpened(false);
  }

  function errorHandler(err) {
    openPopup({
      isSuccess: false,
      title: err.message,
    });
  }

  function checkStatus(data) {
    if (!data.status) {
      return;
    }
    if (data.status !== 200) {
      throw data;
    }
    delete data.status;
  }

  function getUserData() {
    return mainApi.getProfile()
      .then((data) => {
        checkStatus(data);
        return data;
      });
  }

  function addSavedMovies(data) {
    return mainApi.getSavedMovies()
      .then((res) => {
        checkStatus(res);
        setSavedMovies(res);
        return data;
      });
  }

  function login(data, successMsg='') {
    checkStatus(data);
    if (successMsg) {
      openPopup({
        isSuccess: true,
        title: successMsg,
      });
    }
    
    setCurrentUser(data);
    localStorage.setItem('isLogged', true);
    setIsLogged(localStorage.getItem('isLogged'));
    history.push("/movies");
  }

  function logoutHandler(data) {
    checkStatus(data);
    setCurrentUser({});
    localStorage.setItem('isLogged', false);
    setIsLogged(localStorage.getItem('isLogged'));
    history.push("/");
  }

  function loginHandler(user, successMsg) {
    return mainApi.login(user)
      .then(getUserData)
      .then(addSavedMovies)
      .then((data) => {
        login(data, successMsg);
      })
  }

  useEffect(() => {
    if (localStorage.getItem('isLogged') === 'true') {
      getUserData()
        .then(addSavedMovies)
        .then(setCurrentUser)
        .catch(errorHandler)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={ currentUser }>
        <SavedMoviesContext.Provider value={ savedMovies }>
          <Switch>
            <Route exact path="/">
              <MainHeader />
              <Main />
              <Footer />
            </Route>

            <ProtectedRoute path="/movies" isLogged={isLogged}>
              <LoggedHeader />
              <Movies errorHandler={ errorHandler } />
              <Footer />
            </ProtectedRoute>

            <ProtectedRoute path="/saved-movies" isLogged={isLogged}>
              <LoggedHeader />
              <SavedMovies errorHandler={ errorHandler } />
              <Footer />
            </ProtectedRoute>

            <ProtectedRoute path="/profile" isLogged={isLogged}>
              <LoggedHeader />
              <Profile logoutHandler={ logoutHandler } updateUser={ setCurrentUser } checkStatus={ checkStatus } errorHandler={ errorHandler } />
            </ProtectedRoute>

            <Route path="/signup">
              <Register submitHandler={ loginHandler } errorHandler={ errorHandler } />
            </Route>

            <Route path="/signin">
              <Login submitHandler={ loginHandler } errorHandler={ errorHandler } />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          <InfoTooltip isPopupOpened={ isPopupOpened } infoTooltipData={ infoTooltipData } closePopup = { closePopup } />
        </SavedMoviesContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
