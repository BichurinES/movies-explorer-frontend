import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__content">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__list-item"><a href="https://bichurines.github.io/how-to-learn/" className="portfolio__link page__link" target="_blank" rel="noreferrer">Статичный сайт</a></li>
          <li className="portfolio__list-item"><a href="https://bichurines.github.io/russian-travel/" className="portfolio__link page__link" target="_blank" rel="noreferrer">Адаптивный сайт</a></li>
          <li className="portfolio__list-item"><a href="https://mestogram.nomoredomains.monster" className="portfolio__link page__link" target="_blank" rel="noreferrer">Одностраничное приложение</a></li>
        </ul>
      </div>
    </section>
  )
}
