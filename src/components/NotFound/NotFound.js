import { useHistory } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const history = useHistory();

  return (
    <main className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        
      </div>
      <button className="not-found__back-button page__button" onClick={ history.goBack }>Назад</button>
    </main>
  )
}
