import Image from "next/image";

import heroImg from "../../../public/hero.jpg";

import styles from "./Hero.module.css";
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h1>Your Personal AI-Powered Health Companion</h1>
        <p>
          Analyze, Understand, and Improve your health with the power of AI.
        </p>
      </div>
      <Image
        src={heroImg}
        alt="Health Hero"
        className={styles.image}
        priority
      />
    </section>
  );
}
