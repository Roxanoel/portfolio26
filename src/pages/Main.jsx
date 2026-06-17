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
              I bridge the gap between
              <br />
              <em>ideas</em> and <em>reality</em>
            </h1>
            <p className={styles.lede}>
              I’m a designer who started coding back when people still asked,
              <em>"Why would a creative need to learn that?"</em>
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
            <span className={styles.count}>Sample projects · 2022—2026</span>
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
                As a design engineer, I find inspiration at the intersection of
                beauty and function. My journey into building began coding video
                games, evolved into frontend engineering and product design, and
                expanded outside the world of software through sewing. Whether I
                am writing clean components or constructing a garment, I am
                fascinated by the challenge of translating creative vision into
                something usable and practical.
              </p>
              <p data-reveal style={{ "--reveal-delay": "80ms" }}>
                Today, I translate that conceptual framework into product My PhD
                in Philosophy from the University of Cambridge provides the
                analytical anchor for this balance of creativity and structure.
                My years training in analytical rigor and logic gave me a
                framework for deconstructing complex, ambiguous systems, while
                specializing in medieval philosophy taught me a profound lesson
                in empathy: how to step into a completely different worldview
                and deeply understand how people think, feel, and navigate their
                realities.
              </p>
              <p data-reveal style={{ "--reveal-delay": "160ms" }}>
                This unique toolkit allows me to comfortably translate abstract
                user needs into a product with precise technical execution. I
                thrive on small, agile teams where I can wear many hats and
                adapt quickly to shifting demands. Moving fluidly between B2B
                SaaS and the nonprofit sector has made me deeply attentive to
                context; instead of relying on ready-made formulas, I know how
                to balance business-driven efficiency with mission-driven
                empathy depending on the problem at hand.
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
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className={styles.footer}>
        <div className="wrap">
          <div className={styles.footTop}>
            <h3>Let's chat!</h3>
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
