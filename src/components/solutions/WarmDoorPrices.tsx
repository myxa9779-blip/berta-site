import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import type {
  DoorVariant,
  WarmDoorPricesContent,
} from "@/data/warmDoors";
import styles from "./WarmDoorPrices.module.css";

export function WarmDoorPrices({
  content,
}: {
  content: WarmDoorPricesContent;
}) {
  return (
    <section className={styles.section} aria-labelledby="warm-door-prices-title">
      <div className={styles.headingBand}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <div>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <h2 id="warm-door-prices-title">{content.title}</h2>
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
            {content.cards.map((door, index) => (
              <article
                className={`${styles.card} ${index === 0 ? styles.featured : ""}`}
                key={door.title}
                style={{ "--card-index": index } as CSSProperties}
              >
                <div className={styles.visual}>
                  {index === 0 && <span className={styles.badge}>Спеццена</span>}
                  <DoorDrawing
                    variant={door.variant}
                    index={index}
                    title={door.title}
                  />
                  <span className={styles.number}>0{index + 1}</span>
                </div>
                <div className={styles.content}>
                  <p className={styles.note}>{door.note}</p>
                  <h3>{door.title}</h3>
                  <div className={styles.priceBlock}>
                    {door.oldPrice ? (
                      <span className={styles.oldPrice}>{door.oldPrice}</span>
                    ) : (
                      <span className={styles.priceLabel}>Ориентировочная цена</span>
                    )}
                    <strong>{door.price}</strong>
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

function DoorDrawing({
  variant,
  index,
  title,
}: {
  variant: DoorVariant;
  index: number;
  title: string;
}) {
  const gradientId = `door-glass-${index}`;
  const glowId = `door-glow-${index}`;
  const isDouble = variant === "asymmetric" || variant === "double";

  return (
    <svg
      className={styles.door}
      viewBox="0 0 260 300"
      role="img"
      aria-label={`Схема: ${title}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dce7e9" />
          <stop offset="0.48" stopColor="#f9fbfb" />
          <stop offset="1" stopColor="#aebfc3" />
        </linearGradient>
        <linearGradient id={glowId} x1="0" y1="1" x2="0.8" y2="0">
          <stop offset="0" stopColor="#c99a62" stopOpacity="0.5" />
          <stop offset="0.55" stopColor="#f5e6cf" stopOpacity="0.18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <path className={styles.shadow} d="M39 278h184l20 10H20z" />
      <rect
        className={styles.outerFrame}
        x={isDouble ? 24 : 65}
        y="20"
        width={isDouble ? 212 : 130}
        height="258"
        rx="2"
      />
      <rect
        className={styles.frameFill}
        x={isDouble ? 31 : 72}
        y="27"
        width={isDouble ? 198 : 116}
        height="244"
        fill={`url(#${gradientId})`}
      />

      {variant === "split" && (
        <>
          <DoorGlass x={83} y={44} width={94} height={130} fill={`url(#${glowId})`} />
          <DoorGlass x={83} y={184} width={94} height={70} fill={`url(#${glowId})`} />
          <DoorHinges x={72} />
          <DoorHandle x={171} y={154} />
        </>
      )}
      {variant === "panoramic" && (
        <>
          <DoorGlass x={83} y={44} width={94} height={210} fill={`url(#${glowId})`} />
          <DoorHinges x={72} />
          <DoorHandle x={171} y={154} />
        </>
      )}
      {variant === "asymmetric" && (
        <>
          <DoorGlass x={42} y={44} width={40} height={210} fill={`url(#${glowId})`} />
          <DoorGlass x={91} y={44} width={127} height={210} fill={`url(#${glowId})`} />
          <line className={styles.mullion} x1="86" y1="28" x2="86" y2="270" />
          <DoorHandle x={94} y={154} flip />
        </>
      )}
      {variant === "double" && (
        <>
          <DoorGlass x={42} y={44} width={83} height={101} fill={`url(#${glowId})`} />
          <DoorGlass x={42} y={154} width={83} height={100} fill={`url(#${glowId})`} />
          <DoorGlass x={135} y={44} width={83} height={101} fill={`url(#${glowId})`} />
          <DoorGlass x={135} y={154} width={83} height={100} fill={`url(#${glowId})`} />
          <line className={styles.mullion} x1="130" y1="28" x2="130" y2="270" />
          <DoorHandle x={134} y={154} />
        </>
      )}

      <path className={styles.highlight} d={isDouble ? "M34 30h192" : "M75 30h110"} />
      <path className={styles.threshold} d={isDouble ? "M27 274h206l7 5H20z" : "M67 274h126l7 5H60z"} />
    </svg>
  );
}

function DoorGlass({
  fill,
  height,
  width,
  x,
  y,
}: {
  fill: string;
  height: number;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <g>
      <rect
        className={styles.doorSash}
        x={x}
        y={y}
        width={width}
        height={height}
        rx="1"
      />
      <rect
        className={styles.glass}
        x={x + 7}
        y={y + 7}
        width={width - 14}
        height={height - 14}
        fill={fill}
        rx="0.5"
      />
    </g>
  );
}

function DoorHinges({ x }: { x: number }) {
  return (
    <g className={styles.hinges}>
      <rect x={x} y="66" width="5" height="24" rx="2" />
      <rect x={x} y="135" width="5" height="24" rx="2" />
      <rect x={x} y="213" width="5" height="24" rx="2" />
    </g>
  );
}

function DoorHandle({
  x,
  y,
  flip = false,
}: {
  x: number;
  y: number;
  flip?: boolean;
}) {
  return (
    <g
      className={styles.handle}
      transform={`translate(${x} ${y}) ${flip ? "scale(-1 1)" : ""}`}
    >
      <rect className={styles.handlePlate} x="-4" y="-25" width="8" height="50" rx="4" />
      <rect x="-2" y="-20" width="4" height="40" rx="2" />
      <rect x="-2" y="-2" width="17" height="4" rx="2" />
      <circle cx="0" cy="12" r="1.5" />
    </g>
  );
}
