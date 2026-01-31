"use client";

import styles from './Footer.module.css';
import { useContent } from '@/context/ContentContext';

export default function Footer() {
  const { content } = useContent();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
            <div className={styles.section}>
                <h3 className={styles.title}>Quem somos nós</h3>
                <p>
                    A Da Mata Artesanal nasceu do desejo de conectar moda e natureza. 
                    Nossas peças são criações únicas, inspiradas na biodiversidade e 
                    produzidas com respeito ao meio ambiente.
                </p>
            </div>
            <div className={styles.section}>
                <h3 className={styles.title}>Localização</h3>
                <p>📍 Florianópolis, SC</p>
                <p>Ilha da Magia</p>
            </div>
            <div className={styles.section}>
                <h3 className={styles.title}>Siga-nos</h3>
                <div className={styles.socials}>
                    {content?.socials?.instagram && (
                        <a href={content.socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            Instagram 📸
                        </a>
                    )}
                    {content?.socials?.facebook && (
                        <a href={content.socials.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            Facebook 👥
                        </a>
                    )}
                </div>
            </div>
        </div>
        <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} Da Mata Artesanal. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
