"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlog } from "@/context/BlogContext";
import styles from "./page.module.css";

export default function Blog() {
  const { posts } = useBlog();

  return (
    <div className={styles.page}>
      <Header />
      <main className="container">
        <h1 className={styles.title}>Blog Da Mata</h1>
        <p className={styles.subtitle}>Histórias, natureza e inspiração.</p>
        
        <div className={styles.grid}>
            {posts.map(post => (
                <article key={post.id} className={styles.card}>
                    <div className={styles.imageWrapper}>
                        <img src={post.image} alt={post.title} className={styles.image} />
                    </div>
                    <div className={styles.content}>
                        <span className={styles.date}>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                        <h2 className={styles.postTitle}>
                            <Link href={`/blog/${post.id}`} className={styles.link}>
                                {post.title}
                            </Link>
                        </h2>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <Link href={`/blog/${post.id}`} className={styles.readMore}>
                            Ler mais &rarr;
                        </Link>
                    </div>
                </article>
            ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
