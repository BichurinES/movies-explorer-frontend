import { Link } from 'react-router-dom'; 
import './Logo.css';

export default function Logo() {
  return (
    <Link to="/" className="header__logo page__button" />
  )
}
