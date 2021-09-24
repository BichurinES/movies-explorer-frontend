import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from 'react';
import mainApi from '../../utils/MainApi';
import { SUCCESS_PROFILE_MSG, AUTO_NAME_ERROR_MSG, CORRECT_NAME_ERROR_MSG } from '../../utils/constants';
import ValidationForm from '../ValidationForm/ValidationForm';
import './Profile.css';

export default function Profile(props) {
  const user = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = ValidationForm();
  const [isSameUserData, setIsSameUserData] = useState(true);
  const [isReqInProgress, setIsReqInProgress] = useState(false);
  const { logoutHandler, updateUser, showSuccessMsg, checkStatus, errorHandler } = props;

  values.name = values.name === undefined ? user.name : values.name;
  values.email = values.email === undefined ? user.email : values.email;
  errors.name = errors.name === AUTO_NAME_ERROR_MSG ? CORRECT_NAME_ERROR_MSG : errors.name;

  function blockForm() {
    setIsReqInProgress(true);
  }

  function unblockForm() {
    setIsReqInProgress(false);
  }
  
  function submitHandler(evt) {
    evt.preventDefault();
    blockForm();
    mainApi.changeProfile(values)
      .then((res) => {
        checkStatus(res);
        updateUser(res);
        showSuccessMsg(SUCCESS_PROFILE_MSG);
        unblockForm();
      })
      .catch((err) => {
        errorHandler(err);
        unblockForm();
      })
  }

  function logout(evt) {
    evt.preventDefault();
    mainApi.logout()
      .then(logoutHandler)
      .catch(errorHandler)
  }

  useEffect(() => {
    setIsSameUserData(user.name === values.name && user.email === values.email);
  }, [values, user]);
  
  return (
    <main className="profile">
      <form className="profile__form" onSubmit={ submitHandler }  autoComplete="off">
        <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
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
              readOnly={ isReqInProgress ? "readonly" : false }
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
              readOnly={ isReqInProgress ? "readonly" : false }
              value={ values.email }
              onChange={ handleChange } 
            />
          </div>
          <span className={ `profile__error ${ errors.email ? 'profile__error_visible' : '' }` }>{ errors.email }</span>
        </fieldset>
        <input
          className={ `profile__edit-button page__button ${ isSameUserData || !isValid || isReqInProgress ? 'profile__edit-button_disable' : '' }` }
          type="submit"
          value="Редактировать"
          disabled={ isSameUserData || !isValid || isReqInProgress ? true : false } 
        />
      </form>
      <button className="profile__logout-button page__button" onClick={ logout }>Выйти из аккаунта</button>
    </main>
  )
}
