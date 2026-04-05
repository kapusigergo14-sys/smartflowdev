'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContact } from '@/app/actions/contact';
import styles from './ContactForm.module.css';

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.submitBtn} disabled={pending}>
      {pending ? 'sending...' : '> send.sh'}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useFormState(submitContact, null);

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.tag}>./contact --new</div>
          <h2 className={styles.title}>Let&apos;s talk about your site.</h2>
          <p className={styles.subtitle}>
            Drop a message. I reply within 12 hours — usually faster. No automated responders, no sales funnels.
          </p>

          {state?.ok ? (
            <div className={styles.statusOk}>message sent. talk soon.</div>
          ) : (
            <form className={styles.form} action={formAction}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>name</label>
                <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" />
              </div>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>email</label>
                <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" />
              </div>
              <div className={styles.field}>
                <label htmlFor="website" className={styles.label}>website (optional)</label>
                <input id="website" name="website" type="text" maxLength={300} placeholder="your-site.com" />
              </div>
              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>message</label>
                <textarea id="message" name="message" required minLength={10} maxLength={2000} rows={5} />
              </div>
              {state?.error && <div className={styles.statusErr}>{state.error}</div>}
              <SubmitBtn />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
