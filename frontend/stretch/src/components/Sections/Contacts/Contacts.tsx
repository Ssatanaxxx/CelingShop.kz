import React from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { FaWhatsapp, FaTelegram, FaInstagram, FaVk } from "react-icons/fa";
import styles from "./Contacts.module.scss";

interface ContactsProps {
  id: string;
}

const Contacts: React.FC<ContactsProps> = ({ id }) => {
  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: "Адрес",
      content: "г. Астана, ул. Примерная, 123",
      details: "Работаем по всему городу и области",
    },
    {
      icon: <FiPhone />,
      title: "Телефон",
      content: "+7 747 044 28 96",
      details: "Ежедневно с 9:00 до 21:00",
      link: "tel:+77470442896",
    },
    {
      icon: <FiMail />,
      title: "Email",
      content: "info@potolki-pro.kz",
      details: "Ответим в течение 2 часов",
      link: "mailto:info@potolki-pro.kz",
    },
    {
      icon: <FiClock />,
      title: "Режим работы",
      content: "Пн-Пт: 9:00-19:00",
      details: "Сб: 10:00-16:00, Вс: по записи",
    },
  ];

  const socialLinks = [
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      href: "https://wa.me/77470442896",
      color: "#25D366",
    },
    {
      icon: <FaTelegram />,
      label: "Telegram",
      href: "https://t.me/+77470442896",
      color: "#0088cc",
    },
    { icon: <FaInstagram />, label: "Instagram", href: "#", color: "#E1306C" },
    { icon: <FaVk />, label: "VKontakte", href: "#", color: "#4C75A3" },
  ];

  const handleMapButtonClick = () => {
    const address = "г. Астана, ул. Примерная, 123";
    const encodedAddress = encodeURIComponent(address);
    const yandexMapsUrl = `https://yandex.ru/maps/?text=${encodedAddress}`;
    window.open(yandexMapsUrl, "_blank");
  };

  return (
    <section className={styles.contacts} id={id}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Наши <span className={styles.highlight}>контакты</span>
          </h2>
          <p className={styles.subtitle}>
            Свяжитесь с нами любым удобным способом. Ответим на все вопросы!
          </p>
        </div>

        <div className={styles.content}>
          {/* Левая часть - контактная информация */}
          <div className={styles.leftSection}>
            <h3 className={styles.sectionTitle}>Контактная информация</h3>
            <div className={styles.contactCards}>
              {contactInfo.map((contact, index) => (
                <div key={index} className={styles.contactCard}>
                  <div className={styles.contactIcon}>{contact.icon}</div>
                  <div className={styles.contactContent}>
                    <h4 className={styles.contactTitle}>{contact.title}</h4>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        className={styles.contactLink}
                        target={
                          contact.link.startsWith("http") ? "_blank" : "_self"
                        }
                        rel={
                          contact.link.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {contact.content}
                      </a>
                    ) : (
                      <p className={styles.contactText}>{contact.content}</p>
                    )}
                    <p className={styles.contactDetails}>{contact.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая часть - социальные сети и карта */}
          <div className={styles.rightSection}>
            <div className={styles.socialSection}>
              <h3 className={styles.sectionTitle}>Мы в социальных сетях</h3>
              <p className={styles.socialSubtitle}>
                Подписывайтесь на наши соцсети и будьте в курсе акций и новостей
              </p>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    style={
                      { "--social-color": social.color } as React.CSSProperties
                    }
                    aria-label={social.label}
                  >
                    <span className={styles.socialIcon}>{social.icon}</span>
                    <span className={styles.socialLabel}>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Карта */}
            <div className={styles.mapSection}>
              <h3 className={styles.sectionTitle}>Мы на карте</h3>
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapContent}>
                  <FiMapPin className={styles.mapIcon} />
                  <p className={styles.mapAddress}>
                    г. Астана, ул. Примерная, 123
                  </p>
                  <button
                    className={styles.mapButton}
                    onClick={handleMapButtonClick}
                  >
                    Открыть в Яндекс.Картах
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
