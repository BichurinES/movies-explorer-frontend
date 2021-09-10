import React from 'react';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom'; 
import './LoggedHeader.css';

export default function LoggedHeader() {
  return (
    <Header>
      <button className="header__menu-button page__button"></button>
      <div className="header__menu-cover"></div>
      <div className="header__menu">
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-list-item header__nav-list-item_type_main">
              <NavLink to="/" activeClassName="header__nav-link_active" className="header__nav-link page__link">Главная</NavLink>
            </li>
            <li className="header__nav-list-item">
              <NavLink to="/movies" activeClassName="header__nav-link_active" className="header__nav-link page__link">Фильмы</NavLink>
            </li>
            <li className="header__nav-list-item">
              <NavLink to="/my-movies" activeClassName="header__nav-link_active" className="header__nav-link page__link">Сохранённые фильмы</NavLink>
            </li>
          </ul>
        </nav>
        <button className="header__profile page__button">Аккаунт</button>
        <button className="header__menu-close-button page__button"></button>
      </div>
    </Header>
  )
}
