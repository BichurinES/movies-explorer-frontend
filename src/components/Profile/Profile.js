import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import './Profile.css';

export default function Profile(props) {
  const user = useContext(CurrentUserContext);
  const { logoutHandler, updateUser, checkStatus, errorHandler } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

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
        const newUserData = {...user};
        newUserData.name = res.name;
        newUserData.email = res.email;
        updateUser(newUserData);
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
      <form className="profile__form" onSubmit={ submitHandler }>
        <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
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
