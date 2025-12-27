import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import {
  FiGrid,
  FiZoomIn,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiCheck,
} from "react-icons/fi";
import styles from "./Gallery.module.scss";
import shadowCelingImg from '../../../assets/shadowCeilings/shadowCeling.jpg';
import shadowCellingShowerImg from '../../../assets/shadowCeilings/shadow-celling-shower.jpg';
import shadowCeilingImg from '../../../assets/shadowCeilings/shadow-ceiling.jpg';
import disignImg from '../../../assets/TypesOFceilings/disign.jpg';
import flyImg from '../../../assets/ceilingLight/fly.jpg';
import lightImg from '../../../assets/ceilingLight/light.jpg';
import bedImg from '../../../assets/TypesOFceilings/bed.jpg';
import moreLevelImg from '../../../assets/TypesOFceilings/moreLevel.jpg';
import kitchenImg from '../../../assets/TypesOFceilings/kitchen.jpg';

const Gallery: React.FC<{ id: string }> = ({ id }) => {
  const [activeCategory, setActiveCategory] = useState<string>("shadow");
  const [selectedImage, setSelectedImage] = useState<{
    id: number;
    index: number;
  } | null>(null);
  const [isExpanded, setIsExpanded] = useState<string | null>(null);

  // Описания от клиента для каждого типа потолков
  const ceilingTypes = [
    {
      id: "shadow",
      title: "ТЕНЕВОЙ ПОТОЛОК",
      description:
        "Потолок без плинтусов, с аккуратным теневым зазором. Пространство выглядит чище, ровнее и визуально выше. Подходит для современных интерьеров.",
      features: ["📏 Бесплатный замер", "🛡 Гарантия"],
      price: "Цены: Теневой алюминий 8 000 ₸/м, Теневой ПВХ 6 000 ₸/м",
      longDescription:
        "Теневой потолок создает эффект парения, благодаря скрытому монтажу. Идеально для стилей минимализм, лофт и хай-тек. Скрывает все неровности базового потолка.",
    },
    {
      id: "floating",
      title: "ПАРЯЩИЙ ПОТОЛОК",
      description:
        "Световая линия по периметру подчёркивает геометрию и создаёт эффект «воздушного» потолка. Чистые линии, продуманный свет и современный стиль.",
      features: ["📏 Бесплатный замер", "🛡 Гарантия"],
      price: "Цена: Парящий 12 000 ₸/м",
      longDescription:
        "Парящий натяжной потолок — акцент интерьера. Подходит для спален, гостиных и дизайнерских интерьеров. Стили: minimalism, modern, contemporary.",
    },
    {
      id: "glow",
      title: "ПОТОЛКИ С ЗАСВЕТОМ",
      description:
        "Встроенная подсветка подчёркивает форму потолка, создаёт глубину и атмосферу. Мягкий или акцентный свет под интерьер и ваше настроение.",
      features: [
        "Чёткая геометрия",
        "Современный визуальный эффект",
        "Возможность выбрать цвет и яркость",
      ],
      price: "Цена: по запросу",
      longDescription:
        "Свет как часть дизайна. Возможность создания сложных световых сценариев, RGB-подсветка, управление через смартфон.",
    },
    {
      id: "full-light",
      title: "ПОЛНАЯ ПОДСВЕТКА",
      description:
        "Равномерное освещение по всей площади потолка через светопрозрачное полотно. Создает мягкий и комфортный свет без теней и точек.",
      features: [
        "Ровный свет",
        "Без видимых светильников",
        "Современный и аккуратный вид",
      ],
      price: "Цена: по запросу",
      longDescription:
        "Подходит для ванных комнат, коридоров, прихожих, кухонь и современных интерьеров. Не требует дополнительных светильников.",
    },
    {
      id: "other",
      title: "ДРУГИЕ ВАРИАНТЫ",
      description:
        "Мы также выполняем монтаж обычных натяжных потолков по доступным ценам.",
      features: [
        "Обычный ПВХ профиль: 300 ₸/м",
        "Магнитный трек: 25 000 ₸/м",
        "Световая линия: 20 000 ₸/м",
        "Накладной трек: 7 000 ₸/м",
      ],
      price: "Монтаж от 1 700 ₸/м²",
      longDescription:
        "Классические решения для любых помещений. Быстрый монтаж, большой выбор цветов и текстур.",
    },
  ];

  // Картинки для каждого типа потолков
const ceilingImages = {
  shadow: [
    { id: 1, src: shadowCelingImg, title: "Теневой потолок в коридоре" },
    { id: 2, src: shadowCellingShowerImg, title: "Теневой потолок в душевой" },
    { id: 3, src: shadowCeilingImg, title: "Теневой потолок в гостиной" },
    { id: 4, src: disignImg, title: "Теневой потолок в офисе" },
  ],
  floating: [
    { id: 1, src: flyImg, title: "Парящий потолок в зале" },
    { id: 2, src: lightImg, title: "Парящий потолок с подсветкой" },
    { id: 3, src: bedImg, title: "Парящий потолок в спальне" },
  ],
  glow: [
    { id: 1, src: bedImg, title: "Потолок с засветом в спальне" },
    { id: 2, src: moreLevelImg, title: "Многоуровневый потолок с подсветкой" },
    { id: 3, src: lightImg, title: "Потолок с RGB подсветкой" },
  ],
  "full-light": [
    { id: 1, src: lightImg, title: "Полная подсветка в коридоре" },
    { id: 2, src: flyImg, title: "Равномерное освещение в ванной" },
  ],
  other: [
    { id: 1, src: kitchenImg, title: "Обычный потолок на кухне" },
    { id: 2, src: shadowCeilingImg, title: "Матовый потолок в коридоре" },
    { id: 3, src: shadowCellingShowerImg, title: "Натяжной потолок в ванной" },
  ]
};

  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({
    shadow: 0,
    floating: 0,
    glow: 0,
    "full-light": 0,
    other: 0,
  });

  const activeImages =
    ceilingImages[activeCategory as keyof typeof ceilingImages];
  const currentIndex = currentImageIndex[activeCategory];
  const activeCeiling = ceilingTypes.find((type) => type.id === activeCategory);

  // Навигация по изображениям
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [activeCategory]:
        (prev[activeCategory] - 1 + activeImages.length) % activeImages.length,
    }));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [activeCategory]: (prev[activeCategory] + 1) % activeImages.length,
    }));
  };

  // Лайтбокс навигация
const handleLightboxPrev = useCallback(() => {
  if (selectedImage) {
    const newIndex =
      (selectedImage.index - 1 + activeImages.length) % activeImages.length;
    setSelectedImage({ id: activeImages[newIndex].id, index: newIndex });
  }
}, [selectedImage, activeImages]);

const handleLightboxNext = useCallback(() => {
  if (selectedImage) {
    const newIndex = (selectedImage.index + 1) % activeImages.length;
    setSelectedImage({ id: activeImages[newIndex].id, index: newIndex });
  }
}, [selectedImage, activeImages]);

  // Открытие лайтбокса
  const handleImageClick = (index: number) => {
    setSelectedImage({ id: activeImages[index].id, index });
  };

  // Закрытие лайтбокса
  const handleLightboxClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
      if (selectedImage) {
        if (e.key === "ArrowLeft") handleLightboxPrev();
        if (e.key === "ArrowRight") handleLightboxNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleLightboxNext, handleLightboxPrev, selectedImage]);

  const selectedImageData = selectedImage
    ? activeImages[selectedImage.index]
    : null;

  return (
    <section className={styles.gallery} id={id}>
      <div className="container">
        <div className={styles.header}>
          <FiGrid className={styles.headerIcon} />
          <h2 className={styles.title}>
            Наши <span className={styles.highlight}>работы</span>
          </h2>
          <p className={styles.subtitle}>
            Реализованные проекты натяжных потолков. Убедитесь в качестве наших
            работ.
          </p>
        </div>

        {/* Категории для навигации */}
        <div className={styles.categoryTabs}>
          {ceilingTypes.map((type) => (
            <button
              key={type.id}
              className={`${styles.categoryTab} ${
                activeCategory === type.id ? styles.categoryTabActive : ""
              }`}
              onClick={() => setActiveCategory(type.id)}
            >
              {type.title}
            </button>
          ))}
        </div>

        {/* Контент для активной категории */}
        <div className={styles.categoryContent}>
          <div className={styles.descriptionSection}>
            <div className={styles.descriptionHeader}>
              <h3 className={styles.ceilingTitle}>{activeCeiling?.title}</h3>
              <span className={styles.ceilingPrice}>
                {activeCeiling?.price}
              </span>
            </div>

            <p className={styles.ceilingDescription}>
              {activeCeiling?.description}
            </p>

            <div className={styles.featuresList}>
              {activeCeiling?.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <FiCheck className={styles.featureIcon} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Развернутое описание */}
            {isExpanded === activeCategory ? (
              <div className={styles.expandedContent}>
                <p className={styles.longDescription}>
                  {activeCeiling?.longDescription}
                </p>
                <button
                  className={styles.expandButton}
                  onClick={() => setIsExpanded(null)}
                >
                  <span>Скрыть подробности</span>
                  <FiChevronUp className={styles.expandIcon} />
                </button>
              </div>
            ) : (
              <button
                className={styles.expandButton}
                onClick={() => setIsExpanded(activeCategory)}
              >
                <span>Подробнее о {activeCeiling?.title.toLowerCase()}</span>
                <FiChevronDown className={styles.expandIcon} />
              </button>
            )}

            {/* Статистика */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{activeImages.length}</span>
                <span className={styles.statLabel}>Примеров работ</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Довольных клиентов</span>
              </div>
            </div>
          </div>

          {/* Слайдер с картинками */}
          <div className={styles.sliderSection}>
            <div className={styles.sliderWrapper}>
              <button
                className={styles.sliderNav}
                onClick={handlePrevImage}
                aria-label="Предыдущее фото"
              >
                <FiChevronLeft />
              </button>

              <div className={styles.imageContainer}>
                <img
                  src={activeImages[currentIndex].src}
                  alt={activeImages[currentIndex].title}
                  className={styles.sliderImage}
                  onClick={() => handleImageClick(currentIndex)}
                />
                <button
                  className={styles.zoomButton}
                  onClick={() => handleImageClick(currentIndex)}
                  aria-label="Увеличить фото"
                >
                  <FiZoomIn />
                </button>

                <div className={styles.imageInfo}>
                  <h4 className={styles.imageTitle}>
                    {activeImages[currentIndex].title}
                  </h4>
                  <div className={styles.imageCounter}>
                    {currentIndex + 1} / {activeImages.length}
                  </div>
                </div>
              </div>

              <button
                className={styles.sliderNav}
                onClick={handleNextImage}
                aria-label="Следующее фото"
              >
                <FiChevronRight />
              </button>
            </div>

            {/* Миниатюры */}
            <div className={styles.thumbnails}>
              {activeImages.map((image, index) => (
                <button
                  key={image.id}
                  className={`${styles.thumbnail} ${
                    index === currentIndex ? styles.thumbnailActive : ""
                  }`}
                  onClick={() =>
                    setCurrentImageIndex((prev) => ({
                      ...prev,
                      [activeCategory]: index,
                    }))
                  }
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Лайтбокс */}
        {selectedImageData && (
          <div className={styles.lightbox} onClick={handleLightboxClose}>
            <div className={styles.lightboxContent}>
              <button
                className={styles.lightboxClose}
                onClick={() => setSelectedImage(null)}
                aria-label="Закрыть"
              >
                <FiX />
              </button>

              <button
                className={styles.lightboxNav}
                onClick={handleLightboxPrev}
                aria-label="Предыдущее фото"
              >
                <FiChevronLeft />
              </button>

              <div className={styles.lightboxImageWrapper}>
                <img
                  src={selectedImageData.src}
                  alt={selectedImageData.title}
                  className={styles.lightboxImage}
                />
                <div className={styles.lightboxInfo}>
                  <h3 className={styles.lightboxTitle}>
                    {selectedImageData.title}
                  </h3>
                  <p className={styles.lightboxDescription}>
                    {activeCeiling?.title} • {selectedImage!.index + 1} /{" "}
                    {activeImages.length}
                  </p>
                </div>
              </div>

              <button
                className={styles.lightboxNav}
                onClick={handleLightboxNext}
                aria-label="Следующее фото"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}

        {/* Призыв к действию */}
        <div className={styles.cta}>
          <div className={styles.ctaContent}>
            <p className={styles.ctaText}>
              <strong>Нас рекомендуют</strong> - потому что не подводим
              <span className={styles.ctaPrice}>Монтаж от 1 700 ₸/м²</span>
            </p>
            <button
              className={styles.ctaButton}
              onClick={() =>
                document
                  .querySelector("#contacts")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>Заказать потолок</span>
              <FiChevronRight className={styles.ctaIcon} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
