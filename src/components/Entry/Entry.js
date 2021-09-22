import { useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Logo from '../Logo/Logo';
import ValidationForm from '../ValidationForm/ValidationForm';
import { AUTO_NAME_ERROR_MSG, CORRECT_NAME_ERROR_MSG } from '../../utils/constants';
import './Entry.css';

export default function Entry(props) {
  const { submitHandler, title, isNameRequired, buttonName, captionText, linkText, linkPath } = props;
  const { values, handleChange, errors, isValid } = ValidationForm();

  errors.name = errors.name === AUTO_NAME_ERROR_MSG ? CORRECT_NAME_ERROR_MSG : errors.name;
  function submitForm(evt) {
    evt.preventDefault();
    const userData = values;
    submitHandler(userData);
  }

  return (
    <main className="entry">
      <form className="entry__form" onSubmit={ submitForm }>
        <Logo className="entry__logo" />
        <h1 className="entry__title">{ title }</h1>
        <fieldset className="entry__fields-container">
          { isNameRequired ? (
            <>
              <label className="entry__field-name" htmlFor="name-field">Имя</label>
              <input id="name-field" className={ `entry__field ${ errors.name ? 'entry__field_type_error' : '' }` } type="text" name="name" minLength="2" maxLength="30" pattern="[a-zA-Zа-яА-Я -]+" placeholder="Имя" noValidate required onChange={ handleChange }/>
              <span className={ `entry__error ${ errors.name ? 'entry__error_visible' : '' }` }>{ errors.name }</span>
            </>
          ) : '' }
          <label className="entry__field-name" htmlFor="email-field">E-mail</label>
          <input id="email-field" className={ `entry__field ${ errors.email ? 'entry__field_type_error' : '' }` } type="email" name="email" placeholder="E-mail" noValidate required onChange={ handleChange } />
          <span className={ `entry__error ${ errors.email ? 'entry__error_visible' : '' }` }>{ errors.email }</span>
          <label className="entry__field-name" htmlFor="password-field">Пароль</label>
          <input id="password-field" className={ `entry__field ${ errors.password ? 'entry__field_type_error' : '' }` } placeholder="Пароль" type="password" name="password" minLength={ isNameRequired ? 8 : 0 } noValidate required onChange={ handleChange } />
          <span className={ `entry__error ${ errors.password ? 'entry__error_visible' : '' }` }>{ errors.password }</span>
        </fieldset>
        <input className={ `entry__signup-button ${ !isValid ? 'entry__signup-button_disable' : '' }` } type="submit" value={ buttonName } disabled={ !isValid ? true : false } />
        <p className="entry__caption">{ captionText }<Link className="entry__caption-link page__link" to={ linkPath }>{ linkText }</Link></p>
      </form>
    </main>
  )
}
