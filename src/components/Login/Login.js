import Entry from '../Entry/Entry';

export default function Login(props) {
  const { submitHandler, errorHandler } = props;

  function login(user, cb) {
    return submitHandler(user)
      .catch((err) => errorHandler(err, cb))
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
