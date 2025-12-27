import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiDollarSign, FiCheck, FiPlus, FiMinus } from "react-icons/fi";
import {
  calculatePrice,
  getServices,
  getExtras,
  createOrder,
} from "../../../utils/api";
import type { Service, Extra } from "../../../utils/api";
import styles from "./Calculator.module.scss";

const Calculator: React.FC<{ id: string }> = ({ id }) => {
  // Состояния для формы
  const [selectedService, setSelectedService] = useState<number>(1);
  const [length, setLength] = useState<number>(5);
  const [width, setWidth] = useState<number>(4);
  const [calculationMethod, setCalculationMethod] = useState<
    "perSquare" | "perimeterAndSquare"
  >("perSquare");
  const [selectedExtras, setSelectedExtras] = useState<Record<number, number>>(
    {}
  );
  const [result, setResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Состояния для формы заявки
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Загружаем данные с API
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const { data: extras = [] } = useQuery({
    queryKey: ["extras"],
    queryFn: getExtras,
  });

  // Рассчитываем периметр и площадь
  const perimeter = (length + width) * 2;
  const area = length * width;

  // Функция расчёта стоимости
  const handleCalculate = async () => {
    if (!selectedService || !length || !width) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setIsCalculating(true);
    try {
      const extrasArray = Object.entries(selectedExtras)
        .filter(([_, length]) => length > 0)
        .map(([id, length]) => ({
          id: parseInt(id),
          length,
        }));

      const data = {
        serviceId: selectedService,
        length,
        width,
        extras: extrasArray,
        calculationMethod:
          selectedService === 1 ? calculationMethod : undefined,
      };

      const response = await calculatePrice(data);
      setResult(response.data);
    } catch (error) {
      console.error("Ошибка расчёта:", error);
      alert("Произошла ошибка при расчёте. Пожалуйста, попробуйте ещё раз.");
    } finally {
      setIsCalculating(false);
    }
  };

  // Обработчик изменения доп. профилей
  const handleExtraChange = (extraId: number, value: number) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [extraId]: Math.max(0, value),
    }));
  };

  // Обработчик отправки заявки
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderData.name || !orderData.phone) {
      alert("Пожалуйста, заполните имя и телефон");
      return;
    }

    if (!result) {
      alert("Пожалуйста, сначала выполните расчёт стоимости");
      return;
    }

    setIsSubmitting(true);
    try {
      await createOrder({
        ...orderData,
        calculationData: result,
      });

      setOrderSuccess(true);
      // Сброс формы
      setOrderData({
        name: "",
        phone: "",
        email: "",
        comment: "",
      });
      setShowOrderForm(false);

      // Автоматическое скрытие успешного сообщения через 5 секунд
      setTimeout(() => setOrderSuccess(false), 5000);
    } catch (error) {
      console.error("Ошибка отправки заявки:", error);
      alert(
        "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте ещё раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Авторасчёт при изменении параметров
  useEffect(() => {
    if (selectedService && length > 0 && width > 0) {
      const timeoutId = setTimeout(handleCalculate, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedService, length, width, calculationMethod, selectedExtras]);

  return (
    <section className={styles.calculator} id={id}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Калькулятор <span className={styles.highlight}>стоимости</span>
          </h2>
          <p className={styles.subtitle}>
            Рассчитайте предварительную стоимость вашего потолка онлайн
          </p>
        </div>

        <div className={styles.calculatorWrapper}>
          {/* Левая часть - форма калькулятора */}
          <div className={styles.calculatorForm}>
            {/* Выбор типа потолка */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Тип потолка</h3>
              <div className={styles.servicesGrid}>
                {services.map((service: Service) => (
                  <div
                    key={service.id}
                    className={`${styles.serviceOption} ${
                      selectedService === service.id
                        ? styles.serviceSelected
                        : ""
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className={styles.serviceRadio}>
                      {selectedService === service.id && (
                        <FiCheck className={styles.radioCheck} />
                      )}
                    </div>
                    <div className={styles.serviceInfo}>
                      <h4 className={styles.serviceName}>{service.title}</h4>
                      <p className={styles.servicePrice}>{service.price}</p>
                      <p className={styles.serviceDescription}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Для обычного потолка - выбор метода расчёта */}
              {selectedService === 1 && (
                <div className={styles.calculationMethod}>
                  <h4 className={styles.methodTitle}>Способ расчёта:</h4>
                  <div className={styles.methodButtons}>
                    <button
                      className={`${styles.methodButton} ${
                        calculationMethod === "perSquare"
                          ? styles.methodActive
                          : ""
                      }`}
                      onClick={() => setCalculationMethod("perSquare")}
                    >
                      За квадратный метр (2 000 тг/м²)
                    </button>
                    <button
                      className={`${styles.methodButton} ${
                        calculationMethod === "perimeterAndSquare"
                          ? styles.methodActive
                          : ""
                      }`}
                      onClick={() => setCalculationMethod("perimeterAndSquare")}
                    >
                      За периметр + площадь (300 тг/пог.м + 1 700 тг/м²)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Размеры помещения */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>Размеры помещения</h3>
              <div className={styles.dimensions}>
                <div className={styles.dimensionInput}>
                  <label className={styles.dimensionLabel}>Длина (м)</label>
                  <div className={styles.numberInput}>
                    <button
                      className={styles.numberButton}
                      onClick={() =>
                        setLength((prev) => Math.max(1, prev - 0.5))
                      }
                    >
                      <FiMinus />
                    </button>
                    <input
                      type="number"
                      min="1"
                      step="0.5"
                      value={length}
                      onChange={(e) =>
                        setLength(parseFloat(e.target.value) || 1)
                      }
                      className={styles.dimensionValue}
                    />
                    <button
                      className={styles.numberButton}
                      onClick={() => setLength((prev) => prev + 0.5)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className={styles.dimensionInput}>
                  <label className={styles.dimensionLabel}>Ширина (м)</label>
                  <div className={styles.numberInput}>
                    <button
                      className={styles.numberButton}
                      onClick={() =>
                        setWidth((prev) => Math.max(1, prev - 0.5))
                      }
                    >
                      <FiMinus />
                    </button>
                    <input
                      type="number"
                      min="1"
                      step="0.5"
                      value={width}
                      onChange={(e) =>
                        setWidth(parseFloat(e.target.value) || 1)
                      }
                      className={styles.dimensionValue}
                    />
                    <button
                      className={styles.numberButton}
                      onClick={() => setWidth((prev) => prev + 0.5)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className={styles.dimensionResult}>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Периметр:</span>
                    <span className={styles.resultValue}>
                      {perimeter.toFixed(1)} м
                    </span>
                  </div>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Площадь:</span>
                    <span className={styles.resultValue}>
                      {area.toFixed(1)} м²
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Дополнительные профили */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <FiPlus className={styles.sectionIcon} />
                Дополнительные профили
              </h3>
              <p className={styles.sectionSubtitle}>
                Длина профилей обычно равна периметру помещения (
                {perimeter.toFixed(1)} м)
              </p>
              <div className={styles.extrasGrid}>
                {extras.map((extra: Extra) => (
                  <div key={extra.id} className={styles.extraItem}>
                    <div className={styles.extraInfo}>
                      <h4 className={styles.extraName}>{extra.title}</h4>
                      <p className={styles.extraPrice}>{extra.price}</p>
                      <p className={styles.extraDescription}>
                        {extra.description}
                      </p>
                    </div>
                    <div className={styles.extraControl}>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={selectedExtras[extra.id] || 0}
                        onChange={(e) =>
                          handleExtraChange(
                            extra.id,
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className={styles.extraInput}
                        placeholder="Длина в метрах"
                      />
                      <span className={styles.extraUnit}>м</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая часть - результаты */}
          <div className={styles.calculatorResults}>
            <div className={styles.resultsCard}>
              <h3 className={styles.resultsTitle}>
                <FiDollarSign className={styles.resultsIcon} />
                Предварительный расчёт
              </h3>

              {isCalculating ? (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  <p>Идёт расчёт...</p>
                </div>
              ) : result ? (
                <>
                  <div className={styles.totalPrice}>
                    <span className={styles.totalLabel}>Итого:</span>
                    <span className={styles.totalValue}>
                      {result.totalPrice.toLocaleString("ru-RU")} тг
                    </span>
                  </div>

                  <div className={styles.breakdown}>
                    <h4 className={styles.breakdownTitle}>Детализация:</h4>
                    <div className={styles.breakdownItem}>
                      <span>{result.breakdown.base.service}</span>
                      <span>
                        {result.breakdown.base.price.toLocaleString("ru-RU")} тг
                      </span>
                    </div>

                    {result.breakdown.extras.map(
                      (extra: any, index: number) =>
                        extra.price > 0 && (
                          <div key={index} className={styles.breakdownItem}>
                            <span>
                              {extra.name} ({extra.length} м)
                            </span>
                            <span>
                              {extra.price.toLocaleString("ru-RU")} тг
                            </span>
                          </div>
                        )
                    )}

                    <div className={styles.breakdownTotal}>
                      <span>Общая стоимость</span>
                      <span>
                        {result.totalPrice.toLocaleString("ru-RU")} тг
                      </span>
                    </div>
                  </div>

                  <div className={styles.resultsNote}>
                    <p>
                      ⚠️ Это предварительный расчёт. Точную стоимость уточняйте
                      у менеджера.
                    </p>
                    <p>✅ В стоимость включены: материалы, монтаж, доставка.</p>
                  </div>

                  <button
                    className={styles.orderButton}
                    onClick={() => setShowOrderForm(true)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Оставить заявку"}
                  </button>

                  <div className={styles.contactInfo}>
                    <p>Или свяжитесь с нами напрямую:</p>
                    <a href="tel:+77470442896" className={styles.contactLink}>
                      📞 +7 747 044 28 96
                    </a>
                    <div className={styles.contactButtons}>
                      <a
                        href="https://wa.me/77470442896"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappButton}
                      >
                        WhatsApp
                      </a>
                      <a
                        href="https://t.me/+77470442896"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.telegramButton}
                      >
                        Telegram
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.noResults}>
                  <p>Заполните параметры для расчёта стоимости</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Всплывающая форма заявки */}
      {showOrderForm && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowOrderForm(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={styles.modalTitle}>Оставить заявку</h3>
            <form onSubmit={handleOrderSubmit} className={styles.orderForm}>
              <div className={styles.formGroup}>
                <label>Имя *</label>
                <input
                  type="text"
                  value={orderData.name}
                  onChange={(e) =>
                    setOrderData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  placeholder="Ваше имя"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Телефон *</label>
                <input
                  type="tel"
                  value={orderData.phone}
                  onChange={(e) =>
                    setOrderData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                  placeholder="+7 777 123 45 67"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={orderData.email}
                  onChange={(e) =>
                    setOrderData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="email@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Комментарий</label>
                <textarea
                  value={orderData.comment}
                  onChange={(e) =>
                    setOrderData((prev) => ({
                      ...prev,
                      comment: e.target.value,
                    }))
                  }
                  placeholder="Дополнительная информация..."
                  rows={3}
                />
              </div>

              <div className={styles.formSummary}>
                <p>
                  Сумма:{" "}
                  <strong>
                    {result?.totalPrice.toLocaleString("ru-RU")} тг
                  </strong>
                </p>
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowOrderForm(false)}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Сообщение об успешной отправке */}
      {orderSuccess && (
        <div className={styles.successMessage}>
          <FiCheck className={styles.successIcon} />
          <div>
            <h4>Заявка успешно отправлена!</h4>
            <p>Мы свяжемся с вами в течение 30 минут.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Calculator;
