"use client";

import { use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useBlog } from "@/context/BlogContext";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

export default function BlogPost({ params }) {
  const resolvedParams = use(params);
  const { getPostById } = useBlog();
  const post = getPostById(resolvedParams.id);

  if (!post) {
    // In a real app we would handle "loading" vs "not found" better
    // Since we rely on context which might be hydrating from localstorage,
    // we can return a loading state or notFound.
    // However, since useBlog initializes with default posts, it should be fine.
    // If it's a new post from localstorage, it syncs fast.
    return (
        <div className={styles.page}>
            <Header />
            <main className="container" style={{padding: '4rem 0', textAlign: 'center'}}>
                <p>Carregando ou post não encontrado...</p>
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className="container">
        <article className={styles.article}>
            <div className={styles.header}>
                <span className={styles.date}>{new Date(post.date).toLocaleDateString('pt-BR')} • {post.author}</span>
                <h1 className={styles.title}>{post.title}</h1>
            </div>
            
            <div className={styles.imageWrapper}>
                <img src={post.image} alt={post.title} className={styles.image} />
            </div>

            <div className={styles.content}>
                {post.content.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                ))}
            </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
