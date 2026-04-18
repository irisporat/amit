'use client';

import './ContactSection.css';

export default function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const contactEmail = 'iris.porat@gmail.com';
    const subject = encodeURIComponent('פנייה מאתר עמית פרידמן - ' + name);
    const body = encodeURIComponent(
      'שם: ' + name + '\n' +
      'אימייל: ' + email + '\n' +
      'טלפון: ' + phone + '\n\n' +
      'הודעה:\n' + message
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="contact-header">
          <h2>צור קשר</h2>
          <p>נשמח לשמוע מכם</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contact-name">שם</label>
            <input type="text" id="contact-name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="contact-email">דוא&quot;ל *</label>
            <input type="email" id="contact-email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="contact-phone">טלפון</label>
            <input type="tel" id="contact-phone" name="phone" />
          </div>
          <div className="form-group">
            <label htmlFor="contact-message">הודעה</label>
            <textarea id="contact-message" name="message"></textarea>
          </div>
          <button type="submit" className="submit-btn">שלח</button>
        </form>
      </div>
    </section>
  );
}
