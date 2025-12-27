import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "О нас", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Галерея", href: "#gallery" },
    { label: "Калькулятор", href: "#calculator" },
    { label: "Гарантии", href: "#guarantees" },
    { label: "Контакты", href: "#contacts" },
  ];

  // Блокировка прокрутки при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menuOpen");
    } else {
      document.body.classList.remove("menuOpen");
    }

    return () => {
      document.body.classList.remove("menuOpen");
    };
  }, [isMenuOpen]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        {/* Логотип */}
        <div className={styles.logo}>
          <Link
            className={styles.logoText}
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setIsMenuOpen(false);
            }}
          >
            <span>
              Натяжка<span className={styles.logoAccent}> 24</span>
            </span>
          </Link>
        </div>

        {/* Десктопная навигация */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.label} className={styles.navItem}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  onClick={(e) => scrollToSection(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Контакты для десктопа */}
        <div className={styles.contacts}>
          <a href="tel:+77470442896" className={styles.phone}>
            <FiPhone className={styles.phoneIcon} />
            <span>+7 747 044 28 96</span>
          </a>
          <button
            className={`btn ${styles.orderBtn}`}
            onClick={() => {
              const calculator = document.querySelector("#calculator");
              if (calculator) {
                calculator.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Бесплатный замер
          </button>
        </div>

        {/* Мобильные кнопки */}
        <div className={styles.mobileControls}>
          <a
            href="tel:+77470442896"
            className={styles.mobilePhoneButton}
            aria-label="Позвонить"
          >
            <FiPhone />
          </a>

          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Мобильное меню */}
        <div
          className={`${styles.mobileNav} ${
            isMenuOpen ? styles.mobileNavOpen : ""
          }`}
        >
          <ul className={styles.mobileNavList}>
            {navItems.map((item) => (
              <li key={item.label} className={styles.mobileNavItem}>
                <a
                  href={item.href}
                  className={styles.mobileNavLink}
                  onClick={(e) => scrollToSection(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Контакты в мобильном меню */}
          <div className={styles.mobileContacts}>
            <a href="tel:+77470442896" className={styles.phone}>
              <FiPhone className={styles.phoneIcon} />
              <span>+7 747 044 28 96</span>
            </a>
            <button
              className={`btn ${styles.orderBtn}`}
              onClick={() => {
                const calculator = document.querySelector("#calculator");
                if (calculator) {
                  calculator.scrollIntoView({ behavior: "smooth" });
                }
                setIsMenuOpen(false);
              }}
            >
              Бесплатный замер
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
