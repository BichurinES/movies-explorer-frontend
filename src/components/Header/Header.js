import React from 'react';
import Logo from '../Logo/Logo';
import './Header.css';

export default function Header(props) {
  const { type } = props;

  return (
    <header className={`header ${props.type ? 'header_type_' + type : ''}`}>
      <div className="header-content">
        <Logo />
        { props.children }
      </div>
    </header>
  )
}
