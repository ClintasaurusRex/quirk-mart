import './ContactUs.scss';

function ContactUs() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" placeholder="Enter your message"></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactUs;
