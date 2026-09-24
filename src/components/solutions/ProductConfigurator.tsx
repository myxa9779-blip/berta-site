"use client";

import { ArrowUpRight, Check, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./ProductConfigurator.module.css";

type ProductKind = "window" | "door";
type OpeningPosition = "left" | "center" | "right";
type OpeningMode = "turn" | "tilt-turn" | "fixed" | "inside" | "outside";
type ConfigurationId =
  | "window-single"
  | "window-double"
  | "window-triple"
  | "door-single"
  | "door-double"
  | "door-sidelight";

type Configuration = {
  id: ConfigurationId;
  label: string;
  panels: number;
  widths?: number[];
};

const configurations: Record<ProductKind, Configuration[]> = {
  window: [
    { id: "window-single", label: "1 створка", panels: 1 },
    { id: "window-double", label: "2 створки", panels: 2 },
    { id: "window-triple", label: "3 створки", panels: 3 },
  ],
  door: [
    { id: "door-single", label: "1 створка", panels: 1 },
    { id: "door-double", label: "2 створки", panels: 2 },
    {
      id: "door-sidelight",
      label: "С боковой створкой",
      panels: 2,
      widths: [0.34, 0.66],
    },
  ],
};

const openingOptions: Record<
  ProductKind,
  Array<{ value: OpeningMode; label: string }>
> = {
  window: [
    { value: "tilt-turn", label: "Поворотно-откидное" },
    { value: "turn", label: "Поворотное" },
    { value: "fixed", label: "Глухое" },
  ],
  door: [
    { value: "inside", label: "Открывание внутрь" },
    { value: "outside", label: "Открывание наружу" },
  ],
};

const colors = [
  {
    id: "white",
    label: "Белый",
    value: "#e8eceb",
    swatch: "linear-gradient(135deg, #ffffff, #dfe4e3)",
  },
  {
    id: "anthracite",
    label: "Антрацит",
    value: "#343b40",
    swatch: "linear-gradient(135deg, #4a5257, #252b2f)",
  },
  {
    id: "bog-oak",
    label: "Болотный дуб",
    value: "#3c2c22",
    swatch:
      "repeating-linear-gradient(105deg, #241a15 0 4px, #4b3729 4px 8px, #34251d 8px 12px)",
  },
  {
    id: "golden-oak",
    label: "Золотой дуб",
    value: "#b8792f",
    swatch:
      "repeating-linear-gradient(105deg, #8f541c 0 4px, #c98a3b 4px 8px, #a86825 8px 12px)",
  },
  {
    id: "walnut",
    label: "Орех",
    value: "#71482f",
    swatch:
      "repeating-linear-gradient(105deg, #51301f 0 4px, #86583a 4px 8px, #67402b 8px 12px)",
  },
];

const dimensionLimits = {
  window: {
    minWidth: 400,
    maxWidth: 3600,
    minHeight: 400,
    maxHeight: 3000,
    defaultWidth: 1400,
    defaultHeight: 1400,
  },
  door: {
    minWidth: 700,
    maxWidth: 3000,
    minHeight: 1800,
    maxHeight: 3200,
    defaultWidth: 1000,
    defaultHeight: 2200,
  },
} satisfies Record<
  ProductKind,
  {
    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;
    defaultWidth: number;
    defaultHeight: number;
  }
>;

const openingLabels: Record<OpeningMode, string> = {
  "tilt-turn": "поворотно-откидное",
  turn: "поворотное",
  fixed: "глухое",
  inside: "открывание внутрь",
  outside: "открывание наружу",
};

function getMinimumWidth(kind: ProductKind, configuration: Configuration) {
  if (kind === "window") return 400 * configuration.panels;
  if (configuration.id === "door-sidelight") return 1100;
  return 700 * configuration.panels;
}

export function ProductConfigurator() {
  const [kind, setKind] = useState<ProductKind>("window");
  const [configurationId, setConfigurationId] =
    useState<ConfigurationId>("window-double");
  const [openingPosition, setOpeningPosition] =
    useState<OpeningPosition>("left");
  const [openingMode, setOpeningMode] =
    useState<OpeningMode>("tilt-turn");
  const [colorId, setColorId] = useState("anthracite");
  const [widthMm, setWidthMm] = useState(
    dimensionLimits.window.defaultWidth,
  );
  const [heightMm, setHeightMm] = useState(
    dimensionLimits.window.defaultHeight,
  );

  const configuration =
    configurations[kind].find((item) => item.id === configurationId) ??
    configurations[kind][0];
  const color = colors.find((item) => item.id === colorId) ?? colors[1];
  const limits = dimensionLimits[kind];
  const minimumWidth = getMinimumWidth(kind, configuration);
  const canOpenCenter = kind === "window" && configuration.panels >= 3;
  const widthError =
    !Number.isInteger(widthMm) ||
    widthMm < minimumWidth ||
    widthMm > limits.maxWidth;
  const heightError =
    !Number.isInteger(heightMm) ||
    heightMm < limits.minHeight ||
    heightMm > limits.maxHeight;
  const dimensionsValid = !widthError && !heightError;
  const positionSummary =
    openingPosition === "center"
      ? "открывается центральная створка"
      : kind === "window" && configuration.panels > 1
        ? `открывается ${openingPosition === "left" ? "левая" : "правая"} створка`
        : `петли ${openingPosition === "left" ? "слева" : "справа"}`;

  const summary = useMemo(
    () =>
      [
        kind === "window" ? "Окно БЕРТА AS63" : "Дверь БЕРТА AS63",
        configuration.label,
        dimensionsValid ? `${widthMm} × ${heightMm} мм` : "размеры требуют уточнения",
        openingMode === "fixed"
          ? openingLabels[openingMode]
          : positionSummary,
        openingMode === "fixed" ? null : openingLabels[openingMode],
        `цвет: ${color.label.toLocaleLowerCase("ru-RU")}`,
      ]
        .filter(Boolean)
        .join(" · "),
    [
      color.label,
      configuration.label,
      dimensionsValid,
      heightMm,
      kind,
      openingMode,
      positionSummary,
      widthMm,
    ],
  );

  const requestHref = `/?configuration=${encodeURIComponent(summary)}#contact`;

  const selectKind = (nextKind: ProductKind) => {
    setKind(nextKind);
    setConfigurationId(configurations[nextKind][0].id);
    setOpeningPosition("left");
    setOpeningMode(nextKind === "window" ? "tilt-turn" : "inside");
    setWidthMm(dimensionLimits[nextKind].defaultWidth);
    setHeightMm(dimensionLimits[nextKind].defaultHeight);
  };

  const selectConfiguration = (nextConfiguration: Configuration) => {
    setConfigurationId(nextConfiguration.id);
    const nextMinimumWidth = getMinimumWidth(kind, nextConfiguration);

    if (widthMm < nextMinimumWidth) {
      setWidthMm(nextMinimumWidth);
    }

    if (
      openingPosition === "center" &&
      !(kind === "window" && nextConfiguration.panels >= 3)
    ) {
      setOpeningPosition("left");
    }
  };

  const reset = () => {
    setKind("window");
    setConfigurationId("window-double");
    setOpeningPosition("left");
    setOpeningMode("tilt-turn");
    setColorId("anthracite");
    setWidthMm(dimensionLimits.window.defaultWidth);
    setHeightMm(dimensionLimits.window.defaultHeight);
  };

  return (
    <section
      className={styles.section}
      id="configurator"
      aria-labelledby="configurator-title"
    >
      <div className={styles.headingBand}>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Конструктор изделий</p>
            <h2 id="configurator-title">
              Соберите свою
              <br />
              конфигурацию
            </h2>
          </header>
        </div>
      </div>
      <div className={styles.bodyBand}>
        <div className={styles.container}>
          <p className={styles.lead}>
            Выберите тип, схему открывания и цвет. Предварительный вариант
            появится справа, а готовая конфигурация автоматически перейдёт в
            заявку на расчёт.
          </p>

          <div className={styles.workspace}>
          <div className={styles.controls}>
            <OptionGroup label="1. Тип изделия">
              <div className={styles.segmented}>
                <ChoiceButton
                  active={kind === "window"}
                  onClick={() => selectKind("window")}
                >
                  Окно
                </ChoiceButton>
                <ChoiceButton
                  active={kind === "door"}
                  onClick={() => selectKind("door")}
                >
                  Дверь
                </ChoiceButton>
              </div>
            </OptionGroup>

            <OptionGroup label="2. Конфигурация створок">
              <div className={styles.choiceGrid}>
                {configurations[kind].map((item) => (
                  <ChoiceButton
                    active={configuration.id === item.id}
                    key={item.id}
                    onClick={() => selectConfiguration(item)}
                  >
                    {item.label}
                  </ChoiceButton>
                ))}
              </div>
            </OptionGroup>

            <OptionGroup label="3. Сторона и способ открывания">
              {openingMode !== "fixed" && (
                <div
                  className={`${styles.segmented} ${
                    canOpenCenter ? styles.segmentedThree : ""
                  }`}
                >
                  <ChoiceButton
                    active={openingPosition === "left"}
                    onClick={() => setOpeningPosition("left")}
                  >
                    {kind === "window" && configuration.panels > 1
                      ? "Левая створка"
                      : "Петли слева"}
                  </ChoiceButton>
                  {canOpenCenter && (
                    <ChoiceButton
                      active={openingPosition === "center"}
                      onClick={() => setOpeningPosition("center")}
                    >
                      Центральная створка
                    </ChoiceButton>
                  )}
                  <ChoiceButton
                    active={openingPosition === "right"}
                    onClick={() => setOpeningPosition("right")}
                  >
                    {kind === "window" && configuration.panels > 1
                      ? "Правая створка"
                      : "Петли справа"}
                  </ChoiceButton>
                </div>
              )}
              <div className={styles.choiceGrid}>
                {openingOptions[kind].map((option) => (
                  <ChoiceButton
                    active={openingMode === option.value}
                    key={option.value}
                    onClick={() => setOpeningMode(option.value)}
                  >
                    {option.label}
                  </ChoiceButton>
                ))}
              </div>
            </OptionGroup>

            <OptionGroup label="4. Размеры изделия">
              <div className={styles.dimensions}>
                <DimensionField
                  error={widthError}
                  id="configurator-width"
                  label="Ширина"
                  max={limits.maxWidth}
                  min={minimumWidth}
                  onChange={setWidthMm}
                  value={widthMm}
                />
                <DimensionField
                  error={heightError}
                  id="configurator-height"
                  label="Высота"
                  max={limits.maxHeight}
                  min={limits.minHeight}
                  onChange={setHeightMm}
                  value={heightMm}
                />
              </div>
            </OptionGroup>

            <OptionGroup label="5. Цвет профиля">
              <div className={styles.colors}>
                {colors.map((item) => (
                  <button
                    className={`${styles.colorButton} ${
                      color.id === item.id ? styles.colorButtonActive : ""
                    }`}
                    key={item.id}
                    type="button"
                    aria-label={`Цвет: ${item.label}`}
                    aria-pressed={color.id === item.id}
                    onClick={() => setColorId(item.id)}
                  >
                    <span
                      className={styles.swatch}
                      style={{ background: item.swatch }}
                    />
                    <span>{item.label}</span>
                    {color.id === item.id && <Check aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </OptionGroup>

            <button className={styles.reset} type="button" onClick={reset}>
              <RotateCcw aria-hidden="true" />
              Сбросить параметры
            </button>
          </div>

          <div className={styles.previewColumn}>
            <div className={styles.previewCard}>
              <div className={styles.previewMeta}>
                <span>Вид со стороны помещения</span>
                <span>Масштаб условный</span>
              </div>
              <ProductPreview
                color={color.value}
                configuration={configuration}
                heightMm={heightMm}
                kind={kind}
                openingMode={openingMode}
                openingPosition={openingPosition}
                widthMm={widthMm}
              />
            </div>

            <div className={styles.result}>
              <div>
                <p>Вы выбрали</p>
                <h3>{summary}</h3>
              </div>
              {dimensionsValid ? (
                <Link className={styles.request} href={requestHref}>
                  Отправить на расчёт
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ) : (
                <button
                  className={`${styles.request} ${styles.requestDisabled}`}
                  type="button"
                  disabled
                >
                  Проверьте размеры
                </button>
              )}
              <p className={styles.disclaimer}>
                Это предварительная визуализация. Размеры, заполнение и
                фурнитуру специалист уточнит перед расчётом.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DimensionField({
  error,
  id,
  label,
  max,
  min,
  onChange,
  value,
}: {
  error: boolean;
  id: string;
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  value: number;
}) {
  const helpId = `${id}-help`;

  return (
    <div className={styles.dimensionField}>
      <label htmlFor={id}>{label}, мм</label>
      <div className={styles.dimensionInputWrap}>
        <input
          id={id}
          type="number"
          min={min}
          max={max}
          step="10"
          inputMode="numeric"
          value={value || ""}
          aria-invalid={error}
          aria-describedby={helpId}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <span>мм</span>
      </div>
      <small
        className={error ? styles.dimensionError : undefined}
        id={helpId}
      >
        {error ? `Введите значение от ${min} до ${max} мм` : `${min}–${max} мм`}
      </small>
    </div>
  );
}

function OptionGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className={styles.group}>
      <legend>{label}</legend>
      {children}
    </fieldset>
  );
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`${styles.choice} ${active ? styles.choiceActive : ""}`}
      type="button"
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function ProductPreview({
  color,
  configuration,
  heightMm,
  kind,
  openingMode,
  openingPosition,
  widthMm,
}: {
  color: string;
  configuration: Configuration;
  heightMm: number;
  kind: ProductKind;
  openingMode: OpeningMode;
  openingPosition: OpeningPosition;
  widthMm: number;
}) {
  const limits = dimensionLimits[kind];
  const minimumWidth = getMinimumWidth(kind, configuration);
  const validWidth =
    Number.isInteger(widthMm) &&
    widthMm >= minimumWidth &&
    widthMm <= limits.maxWidth
      ? widthMm
      : limits.defaultWidth;
  const validHeight =
    Number.isInteger(heightMm) &&
    heightMm >= limits.minHeight &&
    heightMm <= limits.maxHeight
      ? heightMm
      : limits.defaultHeight;
  const maxFrameWidth = 500;
  const maxFrameHeight = 340;
  const productRatio = validWidth / validHeight;
  const frameWidth = Math.min(maxFrameWidth, maxFrameHeight * productRatio);
  const frameHeight = Math.min(maxFrameHeight, maxFrameWidth / productRatio);
  const frame = {
    x: (640 - frameWidth) / 2,
    y: 382 - frameHeight,
    width: frameWidth,
    height: frameHeight,
  };
  const gap = 0;
  const availableWidth = frame.width - gap * (configuration.panels - 1);
  const ratios =
    configuration.widths ??
    Array.from({ length: configuration.panels }, () => 1 / configuration.panels);
  const widths = ratios.map((ratio) => availableWidth * ratio);
  const panels = widths.reduce<Array<{ x: number; width: number }>>(
    (items, width, index) => {
      const previous = items[index - 1];
      const x = previous ? previous.x + previous.width + gap : frame.x;
      return [...items, { x, width }];
    },
    [],
  );
  const activeIndex =
    openingPosition === "center"
      ? Math.floor(panels.length / 2)
      : openingPosition === "left"
        ? 0
        : panels.length - 1;
  const hingesOnLeft = openingPosition !== "right";

  return (
    <svg
      className={styles.previewSvg}
      viewBox="0 0 640 440"
      role="img"
      aria-label={`Предварительный вид: ${kind === "window" ? "окно" : "дверь"}, ${configuration.label}`}
    >
      <defs>
        <linearGradient id="configurator-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8faeb8" />
          <stop offset="0.38" stopColor="#e9f1f1" />
          <stop offset="0.62" stopColor="#b8cdd1" />
          <stop offset="1" stopColor="#78939c" />
        </linearGradient>
        <linearGradient id="configurator-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dbe1e2" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="configurator-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="16" stdDeviation="12" floodOpacity="0.16" />
        </filter>
      </defs>

      <path d="M32 399h576l-50 28H82z" fill="url(#configurator-floor)" />
      <g filter="url(#configurator-shadow)">
        <rect
          x={frame.x}
          y={frame.y}
          width={frame.width}
          height={frame.height}
          rx="2"
          fill={color}
          stroke="#0d171d"
          strokeWidth="3"
        />
        {panels.map((panel, index) => {
          const inset = 10;
          const glassX = panel.x + inset;
          const glassY = frame.y + inset;
          const glassWidth = panel.width - inset * 2;
          const glassHeight = frame.height - inset * 2;
          const active = index === activeIndex;
          const hingeX =
            hingesOnLeft ? glassX + 5 : glassX + glassWidth - 5;
          const handleX =
            hingesOnLeft ? glassX + glassWidth - 12 : glassX + 12;
          const middleY = glassY + glassHeight / 2;
          const handleHeight = Math.min(
            42,
            Math.max(20, glassHeight * 0.45),
          );
          const showFixedMark =
            kind === "window" && (openingMode === "fixed" || !active);

          return (
            <g key={`${panel.x}-${panel.width}`}>
              <rect
                x={glassX}
                y={glassY}
                width={glassWidth}
                height={glassHeight}
                fill="url(#configurator-glass)"
                stroke="rgba(255,255,255,0.78)"
                strokeWidth="2"
              />
              <path
                className={styles.frameBevel}
                d={[
                  `M${panel.x + 2} ${frame.y + 2} L${glassX} ${glassY}`,
                  `M${panel.x + panel.width - 2} ${frame.y + 2} L${glassX + glassWidth} ${glassY}`,
                  `M${panel.x + 2} ${frame.y + frame.height - 2} L${glassX} ${glassY + glassHeight}`,
                  `M${panel.x + panel.width - 2} ${frame.y + frame.height - 2} L${glassX + glassWidth} ${glassY + glassHeight}`,
                ].join(" ")}
              />
              <path
                d={`M${glassX + 16} ${glassY + 18} L${glassX + glassWidth * 0.62} ${glassY + 18} L${glassX + 16} ${glassY + glassHeight * 0.58} Z`}
                fill="rgba(255,255,255,0.2)"
              />

              {showFixedMark && (
                <g
                  className={styles.fixedMark}
                  data-window-symbol="fixed"
                >
                  <path
                    d={`M${glassX + glassWidth * 0.28} ${middleY} H${glassX + glassWidth * 0.72}`}
                  />
                  <path
                    d={`M${glassX + glassWidth / 2} ${glassY + glassHeight * 0.28} V${glassY + glassHeight * 0.72}`}
                  />
                </g>
              )}

              {active && openingMode !== "fixed" && (
                <>
                  <path
                    className={
                      kind === "window"
                        ? styles.windowOpeningGuide
                        : styles.openingGuide
                    }
                    data-window-symbol={
                      kind === "window" ? "turn" : undefined
                    }
                    d={`M${hingeX} ${glassY + 8} L${handleX} ${middleY} L${hingeX} ${glassY + glassHeight - 8}`}
                  />
                  {openingMode === "tilt-turn" && (
                    <>
                      <path
                        className={styles.tiltOpeningGuide}
                        data-opening-indicator="tilt"
                        data-window-symbol="tilt"
                        d={`M${glassX + 8} ${glassY + glassHeight - 8} L${glassX + glassWidth / 2} ${glassY + 7}`}
                      />
                      <path
                        className={styles.tiltOpeningGuide}
                        data-window-symbol="tilt-continuation"
                        d={`M${glassX + glassWidth / 2} ${glassY + 7} L${glassX + glassWidth - 8} ${glassY + glassHeight - 8}`}
                      />
                    </>
                  )}
                  <g className={styles.handle}>
                    <rect
                      x={handleX - 3}
                      y={middleY - handleHeight / 2}
                      width="6"
                      height={handleHeight}
                      rx="3"
                    />
                    <rect
                      x={hingesOnLeft ? handleX - 14 : handleX}
                      y={middleY - 3}
                      width="14"
                      height="6"
                      rx="3"
                    />
                  </g>
                </>
              )}
            </g>
          );
        })}
        {panels.slice(1).map((panel) => (
          <g key={`mullion-${panel.x}`}>
            <rect
              x={panel.x - 7}
              y={frame.y + 2}
              width="14"
              height={frame.height - 4}
              fill={color}
            />
            <line
              x1={panel.x - 7}
              y1={frame.y + 3}
              x2={panel.x - 7}
              y2={frame.y + frame.height - 3}
              stroke="#0d171d"
              strokeWidth="1.4"
            />
            <line
              x1={panel.x + 7}
              y1={frame.y + 3}
              x2={panel.x + 7}
              y2={frame.y + frame.height - 3}
              stroke="rgba(255,255,255,0.72)"
              strokeWidth="1.4"
            />
          </g>
        ))}
      </g>

      {kind === "door" && openingMode !== "fixed" && (
        <g className={styles.swingIndicator}>
          <path
            d={
              openingMode === "inside"
                ? "M112 404 Q320 324 528 404"
                : "M112 410 Q320 468 528 410"
            }
          />
          <text x="320" y={openingMode === "inside" ? "383" : "432"}>
            {openingMode === "inside" ? "ВНУТРЬ" : "НАРУЖУ"}
          </text>
        </g>
      )}
    </svg>
  );
}
