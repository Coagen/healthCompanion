import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Introduction from "@/components/intro/Intro";
import Navbar from "@/components/navbar/Navbar";

import styles from "./page.module.css";
export default function Home() {
  return (
    <div className={styles.application}>
      <Hero />
      <Introduction />
    </div>
  );
}
