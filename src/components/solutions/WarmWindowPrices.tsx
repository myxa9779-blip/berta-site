import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import type {
  WarmWindowPricesContent,
  WindowVariant,
} from "@/data/warmWindows";
import styles from "./WarmDoorPrices.module.css";

const variantClasses: Record<WindowVariant, string> = {
  single: styles.windowSingle,
  double: styles.windowDouble,
  triple: styles.windowTriple,
};

export function WarmWindowPrices({
  content,
}: {
  content: WarmWindowPricesContent;
}) {
  const visibleWindows = content.cards.slice(0, 3);

  return (
    <section
      className={`${styles.section} ${styles.windowSection}`}
      aria-labelledby="warm-window-prices-title"
    >
      <div className={styles.headingBand}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h2 id="warm-window-prices-title">{content.title}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bodyBand}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <p>{content.description}</p>
            <Link href={content.ctaHref} className={styles.cta}>
              {content.ctaLabel}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.grid}>
            {visibleWindows.map((window, index) => (
              <article
                className={styles.card}
                key={`${window.title}-${index}`}
                style={{ "--card-index": index } as CSSProperties}
              >
                <div className={`${styles.visual} ${styles.windowVisual}`}>
                  <WindowDrawing variant={window.variant} title={window.title} />
                  <span className={styles.number}>0{index + 1}</span>
                </div>
                <div className={styles.content}>
                  <p className={styles.note}>{window.note}</p>
                  <h3>{window.title}</h3>
                  <div className={styles.priceBlock}>
                    {window.oldPrice ? (
                      <span className={styles.oldPrice}>{window.oldPrice}</span>
                    ) : (
                      <span className={styles.priceLabel}>
                        Ориентировочная цена
                      </span>
                    )}
                    <strong>{window.price}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WindowDrawing({
  variant,
  title,
}: {
  variant: WindowVariant;
  title: string;
}) {
  const panelCount =
    variant === "single" ? 1 : variant === "double" ? 2 : 3;
  const activeIndex =
    variant === "single" ? 0 : variant === "double" ? 1 : variant === "triple" ? 1 : -1;

  return (
    <div
      className={`${styles.window} ${variantClasses[variant]}`}
      role="img"
      aria-label={`Схема: ${title}`}
    >
      <div className={styles.windowFrame}>
        {Array.from({ length: panelCount }, (_, index) => {
          const active = index === activeIndex;
          const handleOnLeft = active && index > 0;

          return (
            <span
              className={`${styles.windowPanel} ${
                active ? styles.windowActivePanel : ""
              }`}
              key={index}
            >
              {active ? (
                <>
                  <span
                    className={`${styles.windowOpeningMark} ${
                      !handleOnLeft ? styles.windowOpeningMarkReverse : ""
                    }`}
                    aria-hidden="true"
                    data-window-card-symbol="turn-tilt"
                  >
                    <span className={styles.windowTurnMark} />
                    <span className={styles.windowTiltMark} />
                  </span>
                  <span
                    className={`${styles.windowHandle} ${
                      handleOnLeft ? styles.windowHandleLeft : ""
                    }`}
                  />
                </>
              ) : (
                <span
                  className={styles.windowFixedMark}
                  aria-hidden="true"
                  data-window-card-symbol="fixed"
                />
              )}
            </span>
          );
        })}
      </div>
      <span className={styles.windowSill} />
    </div>
  );
}
