import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
  const [currentUser, setCurrentUser] = React.useState({});
  const [infoTooltipData, setInfoTooltipData] = React.useState({});

  return (
    <div className="page">
      <CurrentUserContext.Provider value={ currentUser }>
        <Switch>
          <Route exact path="/">
            <MainHeader />
            <Main />
            <Footer />
          </Route>

          <Route path="/movies">
            <LoggedHeader />
            <Movies updateInfoTooltip = { setInfoTooltipData } />
            <Footer />
          </Route>

          <Route path="/saved-movies">
            <LoggedHeader />
            <SavedMovies updateInfoTooltip = { setInfoTooltipData } />
            <Footer />
          </Route>

          <Route path="/profile">
            <LoggedHeader />
            <Profile updateInfoTooltip = { setInfoTooltipData } />
          </Route>

          <Route path="/signup">
            <Register updateInfoTooltip = { setInfoTooltipData } />
          </Route>

          <Route path="/signin">
            <Login updateInfoTooltip = { setInfoTooltipData } />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip infoTooltipData={ infoTooltipData } updateInfoTooltip = { setInfoTooltipData } />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
