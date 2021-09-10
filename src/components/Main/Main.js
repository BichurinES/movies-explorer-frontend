import React from 'react';
import { Route } from 'react-router-dom'; 
import Header from '../Header/Header';
import MainHeader from '../MainHeader/MainHeader';
import LoggedHeader from '../LoggedHeader/LoggedHeader';


export default function Main() {
  return (
    <>
      <Route path="/">
        <MainHeader />
      </Route>
      <Route path="/">
        <LoggedHeader />
      </Route>
      
      
      <main></main>
    </>
  )
}
