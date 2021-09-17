import mainApi from '../../utils/MainApi';
import Entry from '../Entry/Entry';

export default function Login(props) {
  const { signHandler, errorHandler } = props;

  function login(user) {
    mainApi.login(user)
      .then((res) => {
        if (res.status !== 200) {
          throw res;
        }

        return mainApi.getProfile()
          .then((data) => {
            data.msg = res.message;
            return data;
          });
      })
      .then((data) => signHandler(data, '/movies', data.msg))
      .catch(errorHandler)
  }

  return (
    <Entry
      submitHandler={ login }
      title="Рады видеть!"
      isNameRequired={false}
      buttonName="Войти"
      captionText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      linkPath="/signup"
    />
  )
}
