import Entry from '../Entry/Entry';

export default function Register() {
  return (
    <Entry
      title="Добро пожаловать!"
      isNameRequired={true}
      buttonName="Зарегистрироваться"
      captionText="Уже зарегистрированы?"
      linkText="Войти"
      linkPath="/signin"
    />
  )
}
