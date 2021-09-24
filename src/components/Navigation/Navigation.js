import Menu from '../Menu/Menu';
import './Navigation.css';

export default function Navigation(props) {
  const { type } = props;
  
  return (
    <div className="navigation">
      <Menu isMobile={ true } />
      <Menu isMobile={ false } type={ type } />
    </div>
  )
}
