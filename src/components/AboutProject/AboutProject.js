import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__content">
        <SectionTitle>О проекте</SectionTitle>
          <ul className="about-project__description">
            <li className="about-project__description-item">
              <h3 className="about-project__description-title">Дипломный проект включал 5 этапов</h3>
              <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </li>
            <li className="about-project__description-item">
              <h3 className="about-project__description-title">На выполнение диплома ушло 5 недель</h3>
              <p className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </li>
        </ul>
        <ul className="about-project__diagram">
          <li className="about-project__diagram-part">
            <p className="about-project__diagram-period about-project__diagram-period_type_week">1 неделя</p>
            <p className="about-project__diagram-subtitle">Back-end</p>
          </li>
          <li className="about-project__diagram-part">
            <p className="about-project__diagram-period about-project__diagram-period_type_four-week">4 недели</p>
            <p className="about-project__diagram-subtitle">Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
