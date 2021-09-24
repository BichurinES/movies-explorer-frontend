import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

export default function LoggedHeader(props) {
  const { type } = props;

  return (
    <Header type={ type }>
      <Navigation type={ type } />
    </Header>
  )
}
