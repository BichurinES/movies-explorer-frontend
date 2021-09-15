import NavTab from '../NavTab/NavTab';
import logoPath from '../../images/promo__logo.svg';
import './Promo.css';


export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <img src={logoPath} alt="Промо-логотип страницы" className="promo__logo" />
        <div className="promo__container">
          <h1 className="promo__title">Учебный проект студента факультета <span className="promo__title-faculty">Веб-разработки.</span></h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <NavTab />
        </div>
      </div>
    </section>
  )
}
