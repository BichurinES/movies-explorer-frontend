import './Footer.css';

export default function Footer() {
  return (
    <section className="footer">
      <div className="footer__content">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__container">
          <address className="footer__contacts">
            <ul className="footer__contacts-list">
              <li className="footer__contact"><a href="https://practicum.yandex.ru" className="footer__contact-link page__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
              <li className="footer__contact"><a href="https://github.com/BichurinES" className="footer__contact-link page__link" target="_blank" rel="noreferrer">Github</a></li>
              <li className="footer__contact"><a href="https://www.facebook.com/profile.php?id=100001750455596" className="footer__contact-link page__link" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </address>
          <p className="footer__copyright">&copy;<span className="footer__copyright-space"> </span>{new Date().getFullYear()}</p>
        </div>
      </div>
    </section>
  )
}
