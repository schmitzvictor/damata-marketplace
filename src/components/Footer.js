"use client";

import Link from 'next/link';
import styles from './Footer.module.css';
import { useContent } from '@/context/ContentContext';
import { useProducts } from '@/context/ProductContext';
import { 
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaYoutube, 
  FaTiktok, 
  FaLinkedinIn,
  FaWhatsapp,
  FaPinterestP
} from "react-icons/fa";

// Map social network keys to their icons
const socialIcons = {
  instagram: { icon: FaInstagram, label: "Instagram" },
  facebook: { icon: FaFacebookF, label: "Facebook" },
  twitter: { icon: FaTwitter, label: "Twitter / X" },
  youtube: { icon: FaYoutube, label: "YouTube" },
  tiktok: { icon: FaTiktok, label: "TikTok" },
  linkedin: { icon: FaLinkedinIn, label: "LinkedIn" },
  whatsapp: { icon: FaWhatsapp, label: "WhatsApp" },
  pinterest: { icon: FaPinterestP, label: "Pinterest" }
};

export default function Footer() {
  const { content } = useContent();
  const { products } = useProducts();

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))].slice(0, 5);

  // Get active social links from content
  const activeSocials = content?.socials 
    ? Object.entries(content.socials).filter(([key, value]) => value && socialIcons[key])
    : [];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.column}>
            <Link href="/" className={styles.logo}>
              <span className="material-symbols-outlined">eco</span>
              Damata Grow
            </Link>
            <p className={styles.description}>
              Roupas feitas com a alma da natureza. Estilo, conforto e consciência ambiental em cada peça.
            </p>
            <div className={styles.socialIcons}>
              {activeSocials.map(([key, url]) => {
                const SocialIcon = socialIcons[key].icon;
                return (
                  <a 
                    key={key}
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.socialIconLink}
                    title={socialIcons[key].label}
                  >
                    <SocialIcon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Categories Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Categorias</h4>
            <nav className={styles.links}>
              <Link href="/produtos">Ver Todos</Link>
              {categories.map(cat => (
                <Link key={cat} href={`/produtos?categoria=${encodeURIComponent(cat)}`}>
                  {cat}
                </Link>
              ))}
            </nav>
          </div>

          {/* Institutional Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Institucional</h4>
            <nav className={styles.links}>
              <Link href="/quem-somos">Quem Somos</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contato">Contato</Link>
            </nav>
          </div>

          {/* Help Column */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Ajuda</h4>
            <nav className={styles.links}>
              <Link href="/meus-pedidos">Meus Pedidos</Link>
              <Link href="/minha-conta">Minha Conta</Link>
              {content?.whatsapp && (
                <a 
                  href={`https://wa.me/${content.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fale pelo WhatsApp
                </a>
              )}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Damata Grow. Todos os direitos reservados.</p>
          <div className={styles.bottomLinks}>
            <Link href="/politica-privacidade">Política de Privacidade</Link>
            <Link href="/termos-uso">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
