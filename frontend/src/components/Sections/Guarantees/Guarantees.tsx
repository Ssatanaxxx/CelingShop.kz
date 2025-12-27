import React from 'react';
import { 
  FiCheckCircle, 
  FiClipboard, 
//   FiRuler, 
  FiFileText,
  FiTool,
  FiShield,
  FiThumbsUp
} from 'react-icons/fi';
import styles from './Guarantees.module.scss';

const Guarantees: React.FC<{ id: string }> = ({ id }) => {
  const stages = [
    {
      step: 1,
      icon: <FiClipboard />,
      title: 'Консультация',
      description: 'Бесплатная консультация по телефону или на объекте',
      duration: '30 минут'
    },
    {
      step: 2,
    //   icon: <FiRuler />,
      title: 'Бесплатный замер',
      description: 'Выезд специалиста для точных замеров помещения',
      duration: '1-2 часа'
    },
    {
      step: 3,
      icon: <FiFileText />,
      title: 'Договор и расчёт',
      description: 'Составление договора и окончательный расчёт стоимости',
      duration: '30 минут'
    },
    {
      step: 4,
      icon: <FiTool />,
      title: 'Производство и монтаж',
      description: 'Изготовление потолка и профессиональный монтаж',
      duration: '1 день'
    },
    {
      step: 5,
      icon: <FiCheckCircle />,
      title: 'Сдача работы',
      description: 'Проверка качества и подписание акта выполненных работ',
      duration: '1 час'
    }
  ];

  const guarantees = [
    {
      icon: <FiShield />,
      title: 'Гарантия 5 лет',
      description: 'На все виды работ и материалы. Бесплатное устранение недостатков.',
      details: ['На полотно - 12 лет', 'На монтаж - 5 лет', 'На электрику - 3 года']
    },
    {
      icon: <FiCheckCircle />,
      title: 'Качество материалов',
      description: 'Используем только сертифицированные материалы европейского качества.',
      details: ['Безопасные материалы', 'Сертификаты качества', 'Экологичность']
    },
    {
      icon: <FiThumbsUp />,
      title: 'Профессионализм',
      description: 'Опытные мастера с профильным образованием и стажем от 5 лет.',
      details: ['Обученные специалисты', 'Современное оборудование', 'Аккуратность']
    }
  ];

  return (
    <section className={styles.guarantees} id={id}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>
            Гарантии и <span className={styles.highlight}>этапы работы</span>
          </h2>
          <p className={styles.subtitle}>
            Чёткая организация процесса от замера до сдачи объекта. Мы контролируем каждый этап.
          </p>
        </div>

        <div className={styles.content}>
          {/* Этапы работы */}
          <div className={styles.stagesSection}>
            <h3 className={styles.sectionTitle}>Как мы работаем</h3>
            <div className={styles.stages}>
              {stages.map((stage) => (
                <div key={stage.step} className={styles.stage}>
                  <div className={styles.stepIndicator}>
                    <div className={styles.stepNumber}>{stage.step}</div>
                    <div className={styles.stepIcon}>{stage.icon}</div>
                  </div>
                  <div className={styles.stageContent}>
                    <h4 className={styles.stageTitle}>{stage.title}</h4>
                    <p className={styles.stageDescription}>{stage.description}</p>
                    <div className={styles.stageDuration}>
                      <span className={styles.durationLabel}>Время:</span>
                      <span className={styles.durationValue}>{stage.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Гарантии */}
          <div className={styles.guaranteesSection}>
            <h3 className={styles.sectionTitle}>Наши гарантии</h3>
            <div className={styles.guaranteesList}>
              {guarantees.map((guarantee, index) => (
                <div key={index} className={styles.guaranteeCard}>
                  <div className={styles.guaranteeIcon}>{guarantee.icon}</div>
                  <h4 className={styles.guaranteeTitle}>{guarantee.title}</h4>
                  <p className={styles.guaranteeDescription}>{guarantee.description}</p>
                  <ul className={styles.guaranteeDetails}>
                    {guarantee.details.map((detail, idx) => (
                      <li key={idx} className={styles.detailItem}>
                        <FiCheckCircle className={styles.detailIcon} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className={styles.additionalInfo}>
          <div className={styles.infoCard}>
            <h4 className={styles.infoTitle}>Что входит в стоимость?</h4>
            <ul className={styles.infoList}>
              <li>Выезд замерщика и консультация</li>
              <li>Доставка материалов</li>
              <li>Монтаж потолка и освещения</li>
              <li>Уборка после работ</li>
              <li>Гарантийное обслуживание</li>
            </ul>
          </div>
          
          <div className={styles.infoCard}>
            <h4 className={styles.infoTitle}>Наши обязательства</h4>
            <ul className={styles.infoList}>
              <li>Соблюдение сроков</li>
              <li>Аккуратность при монтаже</li>
              <li>Использование качественных материалов</li>
              <li>Честная цена без скрытых платежей</li>
              <li>Консультация после монтажа</li>
            </ul>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className={styles.cta}>
          <h3 className={styles.ctaTitle}>Готовы начать?</h3>
          <p className={styles.ctaText}>
            Оставьте заявку и получите бесплатный замер с подробным расчётом стоимости.
          </p>
          <button 
            className={styles.ctaButton}
            onClick={() => document.querySelector('#calculator')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Получить расчёт
          </button>
        </div>
      </div>
    </section>
  );
};

export default Guarantees;