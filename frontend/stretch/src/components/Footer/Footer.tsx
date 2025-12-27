import React from "react";
import {
  FiPhone,
  FiMapPin,
  FiClock,
  FiMail,
  FiInstagram,
  FiFacebook,
} from "react-icons/fi";
import { FaWhatsapp, FaTelegram, FaVk } from "react-icons/fa";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    { icon: <FiPhone />, text: "+7 747 044 28 96", href: "tel:+77470442896" },
    {
      icon: <FiMail />,
      text: "info@potolki-pro.kz",
      href: "mailto:info@potolki-pro.kz",
    },
    { icon: <FiMapPin />, text: "г. Астана, ул. Примерная, 123" },
    { icon: <FiClock />, text: "Пн-Пт: 9:00-19:00, Сб: 10:00-16:00" },
  ];

  const socialLinks = [
    {
      icon: <FaWhatsapp />,
      href: "https://wa.me/77470442896",
      label: "WhatsApp",
      color: "#25D366",
    },
    {
      icon: <FaTelegram />,
      href: "https://t.me/+77470442896",
      label: "Telegram",
      color: "#0088cc",
    },
    {
      icon: <FiInstagram />,
      href: "#",
      label: "Instagram",
      color: "#E1306C",
    },
    {
      icon: <FaVk />,
      href: "#",
      label: "VKontakte",
      color: "#4C75A3",
    },
    {
      icon: <FiFacebook />,
      href: "#",
      label: "Facebook",
      color: "#1877F2",
    },
  ];

  const quickLinks = [
    { label: "О нас", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Галерея", href: "#gallery" },
    { label: "Калькулятор", href: "#calculator" },
    { label: "Гарантии", href: "#guarantees" },
    { label: "Контакты", href: "#contacts" },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Лого и описание */}
          <div className={styles.footerSection}>
            <div className={styles.logo}>
              <span className={styles.logoText}>
                Натяжка<span className={styles.logoAccent}> 24</span>
              </span>
            </div>
            <p className={styles.description}>
              Профессиональный монтаж натяжных потолков в Астане. Качество,
              гарантия, индивидуальный подход к каждому клиенту.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                  style={
                    { "--social-color": social.color } as React.CSSProperties
                  }
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Навигация</h3>
            <ul className={styles.linksList}>
              {quickLinks.map((link, index) => (
                <li key={index} className={styles.linksItem}>
                  <a
                    href={link.href}
                    className={styles.linksLink}
                    onClick={(e) => scrollToSection(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Контакты</h3>
            <ul className={styles.contactList}>
              {contactInfo.map((contact, index) => (
                <li key={index} className={styles.contactItem}>
                  <div className={styles.contactIcon}>{contact.icon}</div>
                  {contact.href ? (
                    <a
                      href={contact.href}
                      className={styles.contactText}
                      target={
                        contact.href.startsWith("http") ? "_blank" : "_self"
                      }
                      rel={
                        contact.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {contact.text}
                    </a>
                  ) : (
                    <span className={styles.contactText}>{contact.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Кнопка заказа */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Бесплатный замер</h3>
            <p className={styles.callToAction}>
              Оставьте заявку прямо сейчас и получите бесплатный замер и
              консультацию специалиста
            </p>
            <button
              className={styles.orderButton}
              onClick={() =>
                document
                  .querySelector("#calculator")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Заказать расчёт
            </button>
          </div>
        </div>

        {/* Копирайт */}
        <div className={styles.copyright}>
          <p>© {currentYear} Натяжка 24. Все права защищены.</p>
          <p className={styles.developer}>
            Разработано с ❤️ для вашего комфорта
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
