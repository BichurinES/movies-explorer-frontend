import React from 'react';
import Header from '../Header/Header';
import './MainHeader.css';

export default function MainHeader() {
  return (
    <Header type='main'>
      <div className="header__sign-container">
        <button className="header__sign-up-button page__link">Регистрация</button>
        <button className="header__sign-in-button page__button">Войти</button>
      </div>
    </Header>
  )
}
