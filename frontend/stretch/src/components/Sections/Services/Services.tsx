import React from "react";
import { FiCheck, FiChevronRight } from "react-icons/fi";
import styles from "./Services.module.scss";

const Services: React.FC<{ id: string }> = ({ id }) => {
  const services = [
    {
      id: 1,
      title: "Теневой потолок",
      description:
        "Потолок без плинтусов, с аккуратным теневым зазором. Пространство выглядит чище, ровнее и визуально выше.",
      price: "от 6 000 ₸/пог.м + 1 700 ₸/м²",
      features: ["Современный вид", "Без плинтусов", "Визуально выше"],
      badge: "Популярно",
    },
    {
      id: 2,
      title: "Парящий потолок",
      description:
        "Световая линия по периметру подчёркивает геометрию и создаёт эффект «воздушного» потолка.",
      price: "от 12 000 ₸/пог.м + 1 700 ₸/м²",
      features: ["Световая линия", "Эффект воздушности", "Дизайнерский вид"],
      badge: "Премиум",
    },
    {
      id: 3,
      title: "Потолки с засветом",
      description:
        "Встроенная подсветка подчёркивает форму потолка, создаёт глубину и атмосферу.",
      price: "по запросу",
      features: [
        "Встроенная подсветка",
        "Атмосферное освещение",
        "Современный дизайн",
      ],
    },
    {
      id: 4,
      title: "Обычный натяжной потолок",
      description:
        "Классическое решение по доступной цене. Идеально для любых помещений.",
      price: "от 2 000 ₸/м²",
      features: ["Доступная цена", "Быстрый монтаж", "Любые помещения"],
      badge: "Эконом",
    },
  ];

  const handleServiceClick = (serviceId: number) => {
    const calculator = document.querySelector("#calculator");
    if (calculator) {
      calculator.scrollIntoView({ behavior: "smooth" });
      console.log("Выбрана услуга:", serviceId);
    }
  };

  return (
    <section className={styles.services} id={id}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            Наши <span className={styles.highlight}>решения</span>
          </h2>
          <p className={styles.subtitle}>
            Подбираем натяжные потолки под ваш интерьер: от лаконичной классики
            до современных решений с эффектом и подсветкой.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceHeader}>
                <div className={styles.titleWrapper}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  {service.badge && (
                    <span
                      className={`${styles.serviceBadge} ${
                        service.badge === "Премиум"
                          ? styles.badgePremium
                          : service.badge === "Популярно"
                          ? styles.badgePopular
                          : styles.badgeEconomy
                      }`}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>
                <div className={styles.servicePrice}>{service.price}</div>
              </div>

              <div className={styles.serviceContent}>
                <p className={styles.serviceDescription}>
                  {service.description}
                </p>

                <div className={styles.serviceFeatures}>
                  {service.features.map((feature, index) => (
                    <div key={index} className={styles.feature}>
                      <FiCheck className={styles.featureIcon} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={styles.serviceButton}
                  onClick={() => handleServiceClick(service.id)}
                >
                  <span>Рассчитать стоимость</span>
                  <FiChevronRight className={styles.buttonIcon} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.note}>
          <div className={styles.noteIcon}>💡</div>
          <p>
            <strong>Все услуги включают:</strong> бесплатный замер,
            профессиональный монтаж, гарантию на работы и материалы.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
