import styles from './WhoIAm.module.css';

export default function WhoIAm() {
  return (
    <section className={styles.section} id="about">
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.tag}>cat ~/about.txt</div>
            <h2 className={styles.title}>I rebuild one site a week.</h2>
            <p className={styles.body}>
              I&apos;m Geri. I run smartflowdev solo — no sales team, no account managers. I audit your current site, build you three concepts, and ship the one you pick in 5–10 days. Last year I did it for <span className={styles.highlight}>140+ small businesses</span> across the UK, US, and EU.
            </p>
            <p className={styles.body}>
              Flat pricing. Fixed delivery window. You own the code at the end. If it doesn&apos;t match the mockups, you don&apos;t pay.
            </p>
            <div className={styles.linkRow}>
              <a href="#work">see work →</a>
              <a href="#pricing">pricing →</a>
              <a href="#contact">get in touch →</a>
            </div>
          </div>
          <div className={styles.avatar}>G</div>
        </div>
      </div>
    </section>
  );
}
