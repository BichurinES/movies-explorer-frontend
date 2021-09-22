import { useState, useEffect } from 'react';
import mainApi from '../../utils/MainApi';
import { AUTO_NAME_ERROR_MSG, CORRECT_NAME_ERROR_MSG } from '../../utils/constants';
import ValidationForm from '../ValidationForm/ValidationForm';
import './Profile.css';

export default function Profile(props) {
  let startUserData = localStorage.getItem('user');
  startUserData = startUserData ? JSON.parse(startUserData) : {};
  const { values, handleChange, errors, isValid, resetForm } = ValidationForm();
  const [isSameUserData, setIsSameUserData] = useState(true);
  const { logoutHandler, updateUser, checkStatus, errorHandler } = props;

  values.name = values.name === undefined ? startUserData.name : values.name;
  values.email = values.email === undefined ? startUserData.email : values.email;
  errors.name = errors.name === AUTO_NAME_ERROR_MSG ? CORRECT_NAME_ERROR_MSG : errors.name;
  
  function submitHandler(evt) {
    evt.preventDefault();
    mainApi.changeProfile(values)
      .then((res) => {
        checkStatus(res);
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

  useEffect(() => {
    setIsSameUserData(startUserData.name === values.name && startUserData.email === values.email);
  }, [values, startUserData]);
  
  return (
    <main className="profile">
      <form className="profile__form" onSubmit={ submitHandler }  autoComplete="off">
        <h1 className="profile__title">{`Привет, ${startUserData.name}!`}</h1>
        <fieldset className="profile__fields-container">
          <div className="profile__field-wrap">
            <label className="profile__field-name" htmlFor="name-field">Имя</label>
            <input
              className={ `profile__field ${ errors.name ? 'profile__field_type_error' : '' }` }
              name="name"
              placeholder="Имя"
              type="text"
              pattern="[a-zA-Zа-яА-Я -]+"
              minLength="2"
              maxLength="30"
              noValidate
              required
              value={ values.name }
              onChange={ handleChange } 
            />
          </div>
          <span className={ `profile__error ${ errors.name ? 'profile__error_visible' : '' }` }>{ errors.name }</span>
          <div className="profile__field-wrap">
            <label className="profile__field-name" htmlFor="email-field">E-mail</label>
            <input
              className={ `profile__field ${ errors.email ? 'profile__field_type_error' : '' }` }
              name="email"
              placeholder="E-mail"
              type="email"
              noValidate
              required
              value={ values.email }
              onChange={ handleChange } 
            />
          </div>
          <span className={ `profile__error ${ errors.email ? 'profile__error_visible' : '' }` }>{ errors.email }</span>
        </fieldset>
        <input
          className={ `profile__edit-button page__button ${ isSameUserData || !isValid ? 'profile__edit-button_disable' : '' }` }
          type="submit"
          value="Редактировать"
          disabled={ isSameUserData || !isValid ? true : false } 
        />
      </form>
      <button className="profile__logout-button page__button" onClick={ logout }>Выйти из аккаунта</button>
    </main>
  )
}
