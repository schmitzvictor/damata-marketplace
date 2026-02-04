"use client";

import styles from './Footer.module.css';
import { useContent } from '@/context/ContentContext';
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

// Map social network keys to their icons and labels
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

  // Get active social links from content
  const activeSocials = content?.socials 
    ? Object.entries(content.socials).filter(([key, value]) => value && socialIcons[key])
    : [];

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
            <div className={styles.section}>
                <h3 className={styles.title}>Quem somos nós</h3>
                <p>
                    A Damata Grow nasceu do desejo de conectar moda e natureza. 
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
                    {activeSocials.map(([key, url]) => {
                      const SocialIcon = socialIcons[key].icon;
                      return (
                        <a 
                          key={key}
                          href={url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={styles.socialLink}
                          title={socialIcons[key].label}
                        >
                          <SocialIcon className={styles.socialIcon} />
                          <span>{socialIcons[key].label}</span>
                        </a>
                      );
                    })}
                    {activeSocials.length === 0 && (
                      <p className={styles.noSocials}>Nenhuma rede social configurada</p>
                    )}
                </div>
            </div>
        </div>
        <div className={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} Damata Grow. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
