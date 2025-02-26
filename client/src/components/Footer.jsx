import './Footer.scss';
import ThemeToggle from '../components/ThemeToggle';



function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Quirk Mart. All rights reserved.</p>
      <div className="footer__links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact Us</a>
        <ThemeToggle />
       </div>
    </footer>
  );
}

export default Footer;
