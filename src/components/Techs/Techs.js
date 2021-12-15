import SectionTitle from '../SectionTitle/SectionTitle';
import './Techs.css';

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__content">
        <SectionTitle>Технологии</SectionTitle>
        <h3 className="techs__description-title">7 технологий</h3>
        <p className="techs__description-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__container">
          <li className="techs__tech-name">HTML</li>
          <li className="techs__tech-name">CSS</li>
          <li className="techs__tech-name">JS</li>
          <li className="techs__tech-name">React</li>
          <li className="techs__tech-name">Git</li>
          <li className="techs__tech-name">Express.js</li>
          <li className="techs__tech-name">mongoDB</li>
        </ul>
      </div>
    </section>
  )
}
