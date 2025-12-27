import React from "react";
import { FiChevronRight } from "react-icons/fi";
import styles from "./CtaSection.module.scss";

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  targetId?: string;
  priceText?: string;
}

const CtaSection: React.FC<CtaSectionProps> = ({
  title = "Нас рекомендуют",
  subtitle = "потому что не подводим",
  buttonText = "Подобрать потолок",
  targetId = "contacts",
  priceText = "Монтаж от 1 700 ₸/м²",
}) => {
  const handleClick = () => {
    document.querySelector(`#${targetId}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <p className={styles.ctaText}>
          <strong>{title}</strong> - {subtitle}
          <span className={styles.ctaPrice}>{priceText}</span>
        </p>

        <button className={styles.ctaButton} onClick={handleClick}>
          <span>{buttonText}</span>
          <FiChevronRight className={styles.ctaIcon} />
        </button>
      </div>
    </div>
  );
};

export default CtaSection;
