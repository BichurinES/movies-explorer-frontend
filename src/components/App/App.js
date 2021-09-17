import { useState } from 'react';
import { Switch, Route } from 'react-router-dom'; 
import { useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
  const [isLogged, setIsLogged] = useState(false);
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

  function signHandler(data, path, successMsg='') {
    if (data.status !== 200) {
      throw data;
    }
    if (successMsg) {
      openPopup({
        isSuccess: true,
        title: successMsg,
      });
    }
    setCurrentUser(data);
    setIsLogged(path !== '/' ? true : false);
    history.push(path);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={ currentUser }>
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
            <Profile signHandler={ signHandler } errorHandler={ errorHandler } />
          </ProtectedRoute>

          <Route path="/signup">
            <Register signHandler={ signHandler } errorHandler={ errorHandler } />
          </Route>

          <Route path="/signin">
            <Login signHandler={ signHandler } errorHandler={ errorHandler } />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip isPopupOpened={ isPopupOpened } infoTooltipData={ infoTooltipData } closePopup = { closePopup } />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
