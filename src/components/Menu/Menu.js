import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Menu.css';

export default function Menu(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isMobile, type } = props;

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="menu">
      { isMobile ? <button className="menu__button page__button" type="button" name="menu-button" onClick={ openMenu }></button> : '' }
      { isMobile ? <div className={ `menu__cover ${isMenuOpen ? 'menu__cover_active' : '' }` }></div> : '' }
      
      <div className={ `menu__container ${ isMobile ? 'menu__container_type_mobile' : 'menu__container_type_desktop' }  ${ isMenuOpen ? 'menu__container_type_active' : '' }` }>
        <nav className="menu__nav">
          <ul className="menu__nav-list">
            { isMobile ?
              (
                <li className="menu__nav-list-item">
                  <NavLink exact to="/" activeClassName="menu__nav-link_active" className="menu__nav-link page__link">Главная</NavLink>
                </li>
              ) :
              ''
            }
            <li className="menu__nav-list-item">
              <NavLink to="/movies" activeClassName="menu__nav-link_active" className="menu__nav-link page__link">Фильмы</NavLink>
            </li>
            <li className="menu__nav-list-item">
              <NavLink to="/saved-movies" activeClassName="menu__nav-link_active" className="menu__nav-link page__link">Сохранённые фильмы</NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/profile" className={ `menu__profile ${ type === 'main' ? 'menu__profile_type_main' : '' } page__button` }>Аккаунт</Link>
        { isMobile ? <button className="menu__close-button page__button" type="button" name="close-button"  onClick={ closeMenu }></button> : '' }
      </div>
    </div>
  )
}
