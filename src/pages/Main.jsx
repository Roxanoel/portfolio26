import { useRef } from "react";
import { Grain } from "../components/Grain";
import { WorkGrid } from "../components/WorkGrid";
import { MOTIFS } from "../utils/motifs";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";
import { useParallax } from "../hooks/useParallax";
import styles from "./Main.module.css";
import portrait from "../assets/portrait.png";

const MARQUEE_WORDS = [
  "Product Design",
  "Front-end Engineering",
  "Design Systems",
  "User Experience",
  "Research",
];

export function Main() {
  const pageRef = useRef(null);
  useRevealOnScroll(pageRef);
  useParallax();

  const marqueeContent = [...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
    <span key={i}>{w}</span>
  ));

  return (
    <div ref={pageRef} className={styles.page}>
      <Grain />

      <nav className={styles.nav}>
        <div className="wrap">
          <div className={styles.brand}>
            <span className={styles.dot} />
            Roxane Noel
          </div>
          <ul className={styles.navList}>
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>{marqueeContent}</div>
      </div>

      <header className={styles.hero}>
        <div className={styles.heroHaze} aria-hidden="true" />
        <div className={styles.heroGrain} aria-hidden="true" />
        <div className={`wrap ${styles.heroGrid}`}>
          <div data-reveal>
            <span className={styles.kicker}>PRODUCT DESIGNER + ENGINEER</span>
            <h1 className={styles.h1}>
              <span className={styles.hi}>Hi, I'm Roxane!</span>
              I build the
              <br />
              <em>things</em> I design.
            </h1>
            <p className={styles.lede}>
              A designer who codes and an engineer who sweats the kerning —
              making playful, considered products end to end.
            </p>
            <div className={styles.cta}>
              <a href="#work" className={styles.btn}>
                See the work
              </a>
              <a href="#contact" className={`${styles.btn} ${styles.ghost}`}>
                Get in touch
              </a>
            </div>
          </div>

          <div
            className={styles.heroArt}
            data-reveal
            style={{ "--reveal-delay": "120ms" }}
          >
            <div className={styles.photoCircle}>
              <img src={portrait} alt="Roxane" className={styles.portrait} />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="work" className="wrap">
          <div className={styles.secHead} data-reveal>
            <h2>
              <span className={styles.sq} />
              Selected Work
            </h2>
            <span className={styles.count}>Six projects · 2022—25</span>
          </div>
          <WorkGrid motifs={MOTIFS} />
        </section>

        <section id="about" className="wrap">
          <div className={styles.about}>
            <div data-reveal>
              <span className={styles.aboutLabel}>About</span>
            </div>
            <div>
              <p data-reveal>
                I work where <em>design and engineering</em> overlap —
                prototyping in real code, sweating typographic detail, and
                treating a build pipeline with the same care as a layout grid.
              </p>
              <p data-reveal style={{ "--reveal-delay": "80ms" }}>
                Lately I'm drawn to interfaces with a little analogue warmth:
                grain, rhythm, and a sense of play.
              </p>
              <div
                className={styles.meta}
                data-reveal
                style={{ "--reveal-delay": "160ms" }}
              >
                <div>
                  <b>Based in</b>
                  <span>San Francisco, remote-friendly</span>
                </div>
                <div>
                  <b>Toolkit</b>
                  <span>Figma · React · Vue · Rails · Tailwind CSS ·</span>
                </div>
                <div>
                  <b>Focus</b>
                  <span>0→1 product, design systems</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className={styles.footer}>
        <div className="wrap">
          <div className={styles.footTop}>
            <h3>
              Let's make
              <br />
              something <em>fun.</em>
            </h3>
            <a className={styles.mail} href="mailto:hello@roxane.studio">
              hello@roxane.studio
            </a>
          </div>
          <ul className={styles.socials}>
            <li>
              <a href="#">GitHub</a>
            </li>
            <li>
              <a href="#">Read.cv</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
            <li>
              <a href="#">Are.na</a>
            </li>
          </ul>
          <div className={styles.footBottom}>
            <span>© {new Date().getFullYear()} Roxane. Made with play.</span>
            <span>Roxane — Portfolio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
