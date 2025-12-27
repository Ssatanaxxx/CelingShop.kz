import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import styles from "./Hero.module.scss";

import shadowCeilingImg from "../../../assets/shadowCeilings/shadow-ceiling.jpg";
import floatingCeilingImg from "../../../assets/SoaringСeilings/floating-ceiling.jpg";
import glowCeilingImg from "../../../assets/TypesOFceilings/glow-ceiling.jpg";
import fullLightCeilingImg from "../../../assets/ceilingLight/full-light-ceiling.jpg";
import CtaSection from "../CtaSection/CtaSection";

const Hero: React.FC<{ id: string }> = ({ id }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const ceilingTypes = [
    {
      id: 1,
      title: "ТЕНЕВОЙ ПОТОЛОК",
      price: "от 6 000 ₸/м²",
      fullDesc:
        "Потолок без плинтусов, с аккуратным теневым зазором. Пространство выглядит чище, ровнее и визуально выше. Подходит для современных интерьеров.",
      features: ["Бесплатный замер", "Гарантия 5 лет"],
      image: shadowCeilingImg,
    },
    {
      id: 2,
      title: "ПАРЯЩИЙ ПОТОЛОК",
      price: "от 12 000 ₸/м²",
      fullDesc:
        "Световая линия по периметру подчёркивает геометрию и создаёт эффект «воздушного» потолка. Чистые линии, продуманный свет и современный стиль.",
      features: [
        "Для спален и гостиных",
        "Дизайнерские интерьеры",
        "Minimalism/Modern",
      ],
      image: floatingCeilingImg,
    },
    {
      id: 3,
      title: "С ЗАСВЕТОМ",
      price: "по запросу",
      fullDesc:
        "Встроенная подсветка подчёркивает форму потолка, создаёт глубину и атмосферу. Мягкий или акцентный свет под интерьер и ваше настроение.",
      features: [
        "Чёткая геометрия",
        "Современный эффект",
        "Выбор цвета и яркости",
      ],
      image: glowCeilingImg,
    },
    {
      id: 4,
      title: "ПОЛНАЯ ПОДСВЕТКА",
      price: "по запросу",
      fullDesc:
        "Равномерное освещение по всей площади потолка через светопрозрачное полотно. Без теней и точек, современный и аккуратный вид.",
      features: [
        "Для ванных комнат",
        "Кухни и коридоры",
        "Без видимых светильников",
      ],
      image: fullLightCeilingImg,
    },
  ];

  const handleCardClick = (id: number) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <section className={styles.hero} id={id}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.mainTitle}>
              ПОДНИМАЕМ{" "}
              <span className={styles.highlight}>ПЛАНКУ КАЧЕСТВА</span> В
              НАТЯЖНЫХ ПОТОЛКАХ!
            </h1>

            <p className={styles.subtitle}>
              Мы подбираем натяжные потолки под ваш интерьер: от лаконичной
              классики до современных решений с эффектом и подсветкой.
            </p>
          </div>

          <div className={styles.cardsGrid}>
            {ceilingTypes.map((type) => (
              <div
                key={type.id}
                className={`${styles.card} ${
                  activeCard === type.id ? styles.cardActive : ""
                }`}
                onClick={() => handleCardClick(type.id)}
                style={{
                  backgroundImage: `url(${type.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{type.title}</h3>
                  <span className={styles.cardPrice}>{type.price}</span>
                </div>

                <button
                  className={`${styles.cardButton} ${
                    activeCard === type.id ? styles.cardButtonActive : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(type.id);
                  }}
                >
                  {activeCard === type.id ? "Скрыть" : "Подробнее"}
                  <span className={styles.cardButtonArrow}>→</span>
                </button>

                <div
                  className={`${styles.cardDescription} ${
                    activeCard === type.id ? styles.cardDescriptionActive : ""
                  }`}
                >
                  <p className={styles.cardFullDesc}>{type.fullDesc}</p>

                  <ul className={styles.cardFeatures}>
                    {type.features.map((feature, index) => (
                      <li key={index} className={styles.cardFeature}>
                        <FiCheck className={styles.featureCheck} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.overlay}>
          <CtaSection />
        </div>
      </div>
    </section>
  );
};

export default Hero;
