'use client';

import Navigation from '@/components/Navigation';
import BodyClass from '@/components/BodyClass';
import './contact.css';

export default function ContactPage() {
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
    <>
      <BodyClass className="contact-page" />
      <div id="navigation-root">
        <Navigation pageTitle="צור קשר" />
      </div>
      <main className="main-content-scroll">
        <div className="contact-wrapper">
          <div className="contact-header">
            <h2>צור קשר</h2>
            <p>נשמח לשמוע מכם</p>
          </div>

          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">שם</label>
              <input type="text" id="name" name="name" />
            </div>

            <div className="form-group">
              <label htmlFor="email">דוא&quot;ל *</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">טלפון</label>
              <input type="tel" id="phone" name="phone" />
            </div>

            <div className="form-group">
              <label htmlFor="message">הודעה</label>
              <textarea id="message" name="message"></textarea>
            </div>

            <button type="submit" className="submit-btn">שלח</button>
          </form>
        </div>
      </main>
    </>
  );
}
