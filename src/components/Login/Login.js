import Entry from '../Entry/Entry';

export default function Login() {
  return (
    <Entry
      title="Рады видеть!"
      isNameRequired={false}
      buttonName="Войти"
      captionText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      linkPath="/signup"
    />
  )
}
