import Menu from '../Menu/Menu';
import './Navigation.css';

export default function Navigation() {
  return (
    <div className="navigation">
      <Menu isMobile={true} />
      <Menu isMobile={false} />
    </div>
  )
}
