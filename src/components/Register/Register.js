import mainApi from '../../utils/MainApi';
import Entry from '../Entry/Entry';
import { SUCCESS_REGISTER_MSG } from '../../utils/constants';

export default function Register(props) {
  const { signHandler, errorHandler } = props;

  function register(user) {
    mainApi.register(user)
      .then((data) => signHandler(data, '/movies', SUCCESS_REGISTER_MSG))
      .catch(errorHandler)
  }

  return (
    <Entry
      submitHandler={ register }
      title="Добро пожаловать!"
      isNameRequired={ true }
      buttonName="Зарегистрироваться"
      captionText="Уже зарегистрированы?"
      linkText="Войти"
      linkPath="/signin"
    />
  )
}
