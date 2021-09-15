import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutMe.css';
import photoPath from '../../images/about-me__photo.jpg';

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__content">
        <SectionTitle>Студент</SectionTitle>
        <div className="about-me__container">
          <img src={photoPath} alt="Моё фото" className="about-me__photo" />
          <article className="about-me__info">
            <h3 className="about-me__name">Егор</h3>
            <p className="about-me__description">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__story">
              Я родился и живу в Уфе, закончил факультет экономики УГАТУ. Я люблю путешествовать, читать, а ещё увлекаюсь баскетболом. 
              Последние 10 лет проработал в банковской сфере, 6 из них в роли руководителя.
              Но помимо карьеры, мне всегда была интересна сфера IT и особенно - web-разработка,
              с которым впервые столкнулся ещё в школе.
              Недавно начал кодить. После того, как прошёл курс по веб-разработке, 
              начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <address className="about-me__contacts">
              <ul className="about-me__contacts-list">
                <li className="about-me__contact">
                  <a href="https://www.facebook.com/profile.php?id=100001750455596" className="about-me__contact-link page__link" target="_blank" rel="noreferrer">Facebook</a>
                </li>
                <li className="about-me__contact">
                  <a href="https://github.com/BichurinES" className="about-me__contact-link page__link" target="_blank" rel="noreferrer">Github</a>
                </li>
              </ul>
            </address>
          </article>
        </div>
      </div>
    </section>
  )
}
