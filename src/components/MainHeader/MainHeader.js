import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './MainHeader.css';

export default function MainHeader() {
  return (
    <Header type='main'>
      <div className="header__sign-container">
        <Link to="/signup" className="header__sign-button header__sign-button_type_up page__link">Регистрация</Link>
        <Link to="/signin" className="header__sign-button header__sign-button_type_in page__button">Войти</Link>
      </div>
    </Header>
  )
}
