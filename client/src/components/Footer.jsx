import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Quirk Mart. All rights reserved.</p>
      <div className="footer__links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact Us</a>
      </div>
    </footer>
  );
}

export default Footer;