import { Link } from 'react-router-dom'; 
import Logo from '../Logo/Logo';
import './Entry.css';

export default function Entry(props) {
  const { title, isNameRequired, buttonName, captionText, linkText, linkPath } = props;
  return (
    <main className="entry">
      <form className="entry__form">
        <Logo className="entry__logo" />
        <h1 className="entry__title">{ title }</h1>
        <fieldset className="entry__fields-container">
          { isNameRequired ? (
            <>
              <label className="entry__field-name" htmlFor="name-field">Имя</label>
              <input id="name-field" className="entry__field" type="text" name="name" minLength="2" placeholder="Имя" noValidate required />
              <span className="entry__error"></span>
            </>
          ) : '' }
          <label className="entry__field-name" htmlFor="email-field">E-mail</label>
          <input id="email-field" className="entry__field" type="email" name="email" placeholder="E-mail" noValidate required />
          <span className="entry__error"></span>
          <label className="entry__field-name" htmlFor="password-field">Пароль</label>
          <input id="password-field" className="entry__field entry__field_type_error" placeholder="Пароль" type="password" name="password" noValidate required />
          <span className="entry__error entry__error_visible">Что-то пошло не так...</span>
        </fieldset>
        <input className="entry__signup-button" type="submit" value={ buttonName } />
        <p className="entry__caption">{ captionText }<Link className="entry__caption-link page__link" to={ linkPath }>{ linkText }</Link></p>
      </form>
    </main>
  )
}
