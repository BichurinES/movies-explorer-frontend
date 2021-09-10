import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';
import ContentContainer from '../ContentContainer/ContentContainer'

export default function Header(props) {
  return (
    <header className={`header props.type ? header_type_${props.type} : ''`}>
      <ContentContainer>
        <div className="header-content">
          <Link to="/" className="header__logo page__button" />
          { props.children }
        </div>
      </ContentContainer>
    </header>
  )
}
