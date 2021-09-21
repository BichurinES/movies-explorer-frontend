import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import './Profile.css';

export default function Profile(props) {
  let startUserData = localStorage.getItem('user');
  startUserData = startUserData ? JSON.parse(startUserData) : {};
  const { logoutHandler, updateUser, checkStatus, errorHandler } = props;
  const [name, setName] = useState(startUserData.name);
  const [email, setEmail] = useState(startUserData.email);

  function changeNameHandler(evt) {
    setName(evt.target.value);
  }

  function changeEmailHandler(evt) {
    setEmail(evt.target.value);
  }

  function submitHandler(evt) {
    evt.preventDefault();
    mainApi.changeProfile({ name, email })
      .then((res) => {
        checkStatus(res);
        setName(res.name);
        setEmail(res.email);
        updateUser(res);
      })
      .catch(errorHandler)
  }

  function logout(evt) {
    evt.preventDefault();
    mainApi.logout()
      .then(logoutHandler)
      .catch(errorHandler)
  }

  return (
    <main className="profile">
      <form className="profile__form" onSubmit={ submitHandler } autocomplete="off">
        <h1 className="profile__title">{`Привет, ${startUserData.name}!`}</h1>
        <fieldset className="profile__fields-container">
          <div className="profile__field-wrap">
            <label className="profile__field-name" htmlFor="name-field">Имя</label>
            <input id="name-field" className="profile__field" type="text" name="name" minLength="2" placeholder="Имя" noValidate required value={name} onChange={changeNameHandler} />
          </div>
          <span className="profile__error"></span>
          <div className="profile__field-wrap">
            <label className="profile__field-name" htmlFor="email-field">E-mail</label>
            <input id="email-field" className="profile__field" type="email" name="email" placeholder="E-mail" noValidate required value={email} onChange={changeEmailHandler} />
          </div>
          <span className="profile__error"></span>
        </fieldset>
        <input className="profile__edit-button page__button" type="submit" value="Редактировать" />
      </form>
      <button className="profile__logout-button page__button" onClick={ logout }>Выйти из аккаунта</button>
    </main>
  )
}
