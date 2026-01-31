"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContent } from "@/context/ContentContext";
import styles from "./page.module.css";

export default function AboutUs() {
  const { content } = useContent();

  return (
    <div className={styles.page}>
      <Header />
      <main className="container">
        <div className={styles.container}>
            <h1 className={styles.title}>{content.aboutUsTitle}</h1>
            <div className={styles.content}>
                {content.aboutUsText.split('\n').map((p, i) => (
                     <p key={i} className={styles.paragraph}>{p}</p>
                ))}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
