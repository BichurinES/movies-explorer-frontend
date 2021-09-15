import React from 'react';
import { Switch, Route } from 'react-router-dom'; 
import './App.css';
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

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <MainHeader />
          <Main />
          <Footer />
        </Route>

        <Route path="/movies">
          <LoggedHeader />
          <Movies />
          <Footer />
        </Route>

        <Route path="/saved-movies">
          <LoggedHeader />
          <SavedMovies />
          <Footer />
        </Route>

        <Route path="/profile">
          <LoggedHeader />
          <Profile />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
