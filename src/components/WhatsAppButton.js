"use client";

import { useContent } from "@/context/ContentContext";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  const { content } = useContent();

  if (!content?.whatsapp) return null;

  const message = "Olá! Gostaria de saber mais sobre os produtos da Damata Grow.";
  const link = `https://wa.me/${content.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn} title="Fale conosco no WhatsApp">
      <span className={styles.icon}>💬</span>
    </a>
  );
}
