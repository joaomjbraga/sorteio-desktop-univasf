import logo from '../assets/logo.png';
import './Logo.css';

export function Logo() {
  return (
    <div className="logo-container">
      <img src={logo} alt="Logo UNIVASF" className="logo" />
    </div>
  );
}
