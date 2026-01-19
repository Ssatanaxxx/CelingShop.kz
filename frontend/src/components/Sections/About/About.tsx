import React from "react";
import {
  FiCheck,
  FiUsers,
  FiShield,
  FiClock,
  FiAward,
  FiHome,
} from "react-icons/fi";
import styles from "./About.module.scss";

const About: React.FC<{ id: string }> = ({ id }) => {
  const features = [
    {
      icon: <FiCheck />,
      title: "Ответственность за каждый проект",
      description:
        "Мы несём полную ответственность за качество выполненных работ",
    },
    {
      icon: <FiUsers />,
      title: "Профессиональные мастера",
      description: "Опытные специалисты с многолетним стажем работы",
    },
    {
      icon: <FiHome />,
      title: "Решаем сложные задачи",
      description: "Берёмся за проекты любой сложности и конфигурации",
    },
    {
      icon: <FiShield />,
      title: "Честный сервис без скрытых условий",
      description: "Прозрачное ценообразование, никаких доплат",
    },
    {
      icon: <FiClock />,
      title: "Монтаж за 1 день",
      description: "Быстрая установка без лишних неудобств",
    },
    {
      icon: <FiAward />,
      title: "Гарантия 5 лет",
      description: "Даём расширенную гарантию на все работы",
    },
  ];

  return (
    <section className={styles.about} id={id}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            Мы работаем честно и профессионально{" "}
            <span className={styles.highlight}>без лишних обещаний</span>
          </h2>
          <p className={styles.subtitle}>
            То, что другие называют «особыми условиями», у нас по умолчанию. Нас
            рекомендуют — потому что не подводим.
          </p>
        </div>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>10+</div>
            <div className={styles.statLabel}>лет опыта</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>выполненных проектов</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>довольных клиентов</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>24/7</div>
            <div className={styles.statLabel}>поддержка</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
