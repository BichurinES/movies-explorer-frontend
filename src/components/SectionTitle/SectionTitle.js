import './SectionTitle.css';

export default function SectionTitle(props) {
  return (
    <h2 className="section-title">{props.children}</h2>
  )
}
