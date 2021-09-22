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
  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged') === 'true');
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [infoTooltipData, setInfoTooltipData] = useState({});
  
  function updateSavedCards(movies) {
    localStorage.setItem('savedMovies', JSON.stringify(movies));
    setSavedMovies(movies);
  }

  function updateCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  }

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
    if (!data || !data.status) {
      return;
    }
    if (data.status !== 200) {
      throw data;
    }
    delete data.status;
  }

  function getUserData(data) {
    checkStatus(data);
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
        updateSavedCards(res);
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
    
    updateCurrentUser(data);
    localStorage.setItem('isLogged', true);
    setIsLogged(localStorage.getItem('isLogged'));
    history.push("/movies");
  }

  function logoutHandler(data) {
    checkStatus(data);
    updateCurrentUser({});
    localStorage.setItem('isLogged', false);
    setIsLogged(localStorage.getItem('isLogged'));
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('searchedMovies');
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
    if (isLogged) {
      getUserData()
        .then(addSavedMovies)
        .then(updateCurrentUser)
        .catch(errorHandler)
    }
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={ currentUser }>
        <SavedMoviesContext.Provider value={{ savedMovies, updateSavedCards }}>
          <Switch>
            <Route exact path="/">
              <MainHeader />
              <Main />
              <Footer />
            </Route>

            <ProtectedRoute path="/movies" isLogged={isLogged}>
              <LoggedHeader />
              <Movies checkStatus={ checkStatus } errorHandler={ errorHandler } />
              <Footer />
            </ProtectedRoute>

            <ProtectedRoute path="/saved-movies" isLogged={isLogged}>
              <LoggedHeader />
              <SavedMovies checkStatus={ checkStatus } errorHandler={ errorHandler } />
              <Footer />
            </ProtectedRoute>

            <ProtectedRoute path="/profile" isLogged={isLogged}>
              <LoggedHeader />
              <Profile logoutHandler={ logoutHandler } updateUser={ updateCurrentUser } checkStatus={ checkStatus } errorHandler={ errorHandler } />
            </ProtectedRoute>

            <Route path="/signup">
              <Register submitHandler={ loginHandler } checkStatus={ checkStatus } errorHandler={ errorHandler } />
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
