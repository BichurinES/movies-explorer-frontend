import mainApi from '../../utils/MainApi';
import './Profile.css';

export default function Profile(props) {
  const { signHandler, errorHandler } = props;

  function logout(evt) {
    evt.preventDefault();
    mainApi.logout()
      .then((data) => signHandler(data, '/'))
      .catch(errorHandler)
  }

  return (
    <main className="profile">
      <form className="profile__form">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <fieldset className="profile__fields-container">
          <div className="profile__field-wrap">
            <label className="profile__field-name" htmlFor="name-field">Имя</label>
            <input id="name-field" className="profile__field" type="text" name="name" minLength="2" placeholder="Имя" noValidate required />
          </div>
          <span className="profile__error"></span>
          <div className="profile__field-wrap">
            <label className="profile__field-name" htmlFor="email-field">E-mail</label>
            <input id="email-field" className="profile__field" type="email" name="email" placeholder="E-mail" noValidate required />
          </div>
          <span className="profile__error"></span>
        </fieldset>
        <input className="profile__edit-button" type="submit" value="Редактировать" />
        <button className="profile__logout-button page__button" onClick={ logout }>Выйти из аккаунта</button>
      </form>
    </main>
  )
}
