"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import mapData from "@/data/north-caucasus-regions.json";
import type { CMSOffice } from "@/lib/cms";

type RegionId =
  | "stavropol"
  | "karachay-cherkessia"
  | "kabardino-balkaria"
  | "north-ossetia"
  | "ingushetia"
  | "chechnya";

type RegionShape = {
  id: RegionId;
  name: string;
  shortName: string;
  path: string;
  label: {
    x: number;
    y: number;
  };
};

type OfficeLocation = {
  id: string;
  regionId: RegionId;
  city: string;
  address: string;
  phone: string;
  coordinates: {
    lon: number;
    lat: number;
  };
};

type ProjectedOffice = CMSOffice &
  OfficeLocation & {
    x: number;
    y: number;
  };

type NorthCaucasusMapProps = {
  offices: CMSOffice[];
  hotline: string;
};

type MapPan = {
  x: number;
  y: number;
};

type MapDrag = {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  moved: boolean;
};

const viewBox = mapData.viewBox;
const projection = mapData.projection;
const regions = mapData.regions as RegionShape[];
const minZoom = 1;
const maxZoom = 1.8;
const zoomStep = 0.2;

const officeLocations: OfficeLocation[] = [
  {
    id: "pyatigorsk",
    regionId: "stavropol",
    city: "Пятигорск",
    address: "ул. Ермолова, ост. «Аэропорт»",
    phone: "+7 (8793) 40-55-36",
    coordinates: { lon: 43.0594, lat: 44.0486 },
  },
  {
    id: "essentuki",
    regionId: "stavropol",
    city: "Ессентуки",
    address: "ул. Октябрьская, 341А",
    phone: "+7 (938) 030-44-22",
    coordinates: { lon: 42.8838936, lat: 44.0454003 },
  },
  {
    id: "nalchik",
    regionId: "kabardino-balkaria",
    city: "Нальчик",
    address: "ул. Толстого, 102",
    phone: "+7 (8662) 77-39-91",
    coordinates: { lon: 43.6054167, lat: 43.4903568 },
  },
  {
    id: "vladikavkaz-kosta-290",
    regionId: "north-ossetia",
    city: "Владикавказ",
    address: "пр. Коста, 290",
    phone: "+7 (928) 859-19-87",
    coordinates: { lon: 44.6486842, lat: 43.0548714 },
  },
  {
    id: "vladikavkaz-kosta-92",
    regionId: "north-ossetia",
    city: "Владикавказ",
    address: "пр. Коста, 92",
    phone: "+7 (928) 930-57-77",
    coordinates: { lon: 44.6753435, lat: 43.0185044 },
  },
  {
    id: "grozny",
    regionId: "chechnya",
    city: "Грозный",
    address: "ул. Умара Кадырова, 25",
    phone: "+7 (938) 909-44-22",
    coordinates: { lon: 45.679846, lat: 43.3186983 },
  },
  {
    id: "nazran",
    regionId: "ingushetia",
    city: "Назрань",
    address: "ул. Московская, 8",
    phone: "+7 (928) 741-44-99",
    coordinates: { lon: 44.7656219, lat: 43.2253166 },
  },
  {
    id: "baksan",
    regionId: "kabardino-balkaria",
    city: "Баксан",
    address: "ул. Шукова, 15А",
    phone: "+7 (938) 693-15-52",
    coordinates: { lon: 43.5711219, lat: 43.6850467 },
  },
  {
    id: "nartkala",
    regionId: "kabardino-balkaria",
    city: "Нарткала",
    address: "ул. Гурфова, 24",
    phone: "+7 (8663) 54-15-63",
    coordinates: { lon: 43.8557811, lat: 43.5614501 },
  },
  {
    id: "maysky",
    regionId: "kabardino-balkaria",
    city: "Майский",
    address: "ул. Энгельса, 58",
    phone: "+7 (928) 077-44-23",
    coordinates: { lon: 44.0556971, lat: 43.6274605 },
  },
  {
    id: "prokhladny",
    regionId: "kabardino-balkaria",
    city: "Прохладный",
    address: "ул. Ленина, 80",
    phone: "+7 (928) 700-31-80",
    coordinates: { lon: 44.0207802, lat: 43.7565125 },
  },
  {
    id: "terek",
    regionId: "kabardino-balkaria",
    city: "Терек",
    address: "ул. Ленина, 43",
    phone: "+7 (928) 724-34-17",
    coordinates: { lon: 44.142825, lat: 43.4848705 },
  },
  {
    id: "tyrnyauz",
    regionId: "kabardino-balkaria",
    city: "Тырныауз",
    address: "ул. Энеева, 1",
    phone: "+7 (8663) 84-27-27",
    coordinates: { lon: 42.9184616, lat: 43.3886973 },
  },
  {
    id: "uchkeken",
    regionId: "karachay-cherkessia",
    city: "Учкекен",
    address: "ул. Ленина, 5А",
    phone: "+7 (929) 860-51-68",
    coordinates: { lon: 42.5274121, lat: 43.9498668 },
  },
];

function normalize(value: string) {
  return value.toLocaleLowerCase("ru-RU").replace(/[^a-zа-яё0-9]/gi, "");
}

function phoneKey(value: string) {
  return value.replace(/\D/g, "").slice(-10);
}

function projectOffices(offices: CMSOffice[]): ProjectedOffice[] {
  const usedLocations = new Set<string>();

  return offices.flatMap((office) => {
    const available = officeLocations.filter(
      (location) => !usedLocations.has(location.id),
    );
    const officePhone = phoneKey(office.phone);
    const officeCity = normalize(office.city);
    const officeAddress = normalize(office.address);
    const location =
      available.find((item) => phoneKey(item.phone) === officePhone) ??
      available.find(
        (item) =>
          normalize(item.city) === officeCity &&
          normalize(item.address) === officeAddress,
      ) ??
      available.find((item) => normalize(item.city) === officeCity);

    if (!location) return [];

    usedLocations.add(location.id);
    const { lon, lat } = location.coordinates;

    return [
      {
        ...location,
        ...office,
        x: projection.offsetX + (lon - projection.minLon) * projection.scale,
        y: projection.offsetY + (projection.maxLat - lat) * projection.scale,
      },
    ];
  });
}

function OfficeCard({
  office,
  onClose,
}: {
  office: ProjectedOffice;
  onClose: () => void;
}) {
  const phoneHref = `tel:${office.phone.replace(/[^+\d]/g, "")}`;
  const routeUrl = office.routeUrl || `https://yandex.ru/maps/?text=${encodeURIComponent(
    `${office.city}, ${office.address}`,
  )}`;

  return (
    <article className="berta-map__office-card" aria-live="polite">
      <button
        className="berta-map__card-close"
        type="button"
        onClick={onClose}
        aria-label="Закрыть карточку офиса"
      >
        <span aria-hidden="true">×</span>
      </button>
      <p className="berta-map__office-region">{office.region}</p>
      <h3>{office.city}</h3>
      <p className="berta-map__office-address">{office.address}</p>
      {office.workingHours ? <p className="berta-map__office-address">{office.workingHours}</p> : null}
      <a className="berta-map__office-phone" href={phoneHref}>
        {office.phone}
      </a>
      <a
        className="berta-map__route"
        href={routeUrl}
        target="_blank"
        rel="noreferrer"
      >
        Построить маршрут
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

export function NorthCaucasusMap({
  offices,
  hotline,
}: NorthCaucasusMapProps) {
  const projectedOffices = useMemo(() => projectOffices(offices), [offices]);
  const [selectedOffice, setSelectedOffice] =
    useState<ProjectedOffice | null>(null);
  const [activeRegion, setActiveRegion] = useState<RegionId | null>(null);
  const [zoom, setZoom] = useState(minZoom);
  const [pan, setPan] = useState<MapPan>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<MapDrag | null>(null);
  const ignoreClickRef = useRef(false);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 760px)");
    const setInitialZoom = () => {
      setZoom(mobileMedia.matches ? 1.25 : minZoom);
      setPan({ x: 0, y: 0 });
    };

    setInitialZoom();
    mobileMedia.addEventListener("change", setInitialZoom);

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setSelectedOffice(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      mobileMedia.removeEventListener("change", setInitialZoom);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const selectOffice = (office: ProjectedOffice) => {
    setSelectedOffice(office);
    setActiveRegion(office.regionId);
  };

  const clampPan = (nextPan: MapPan, nextZoom = zoom): MapPan => {
    const bounds = canvasRef.current?.getBoundingClientRect();
    if (!bounds || nextZoom <= minZoom) return { x: 0, y: 0 };

    const maxX = (bounds.width * (nextZoom - 1)) / 2;
    const maxY = (bounds.height * (nextZoom - 1)) / 2;

    return {
      x: Math.max(-maxX, Math.min(maxX, nextPan.x)),
      y: Math.max(-maxY, Math.min(maxY, nextPan.y)),
    };
  };

  const changeZoom = (direction: -1 | 1) => {
    const nextZoom = Math.max(
      minZoom,
      Math.min(maxZoom, Number((zoom + direction * zoomStep).toFixed(2))),
    );
    setZoom(nextZoom);
    setPan((current) => clampPan(current, nextZoom));
  };

  const handlePanStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (zoom <= minZoom || event.button !== 0) return;
    if (
      event.target instanceof Element &&
      event.target.closest(".berta-map__zoom, .berta-map__popover")
    ) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
      moved: false,
    };
  };

  const handlePanMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(deltaX, deltaY) < 5) return;

    drag.moved = true;
    ignoreClickRef.current = true;
    setIsDragging(true);
    setPan(
      clampPan({
        x: drag.originX + deltaX,
        y: drag.originY + deltaY,
      }),
    );
  };

  const handlePanEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setIsDragging(false);

    if (drag.moved) {
      window.setTimeout(() => {
        ignoreClickRef.current = false;
      }, 0);
    }
  };

  const handleMarkerKeyDown = (
    event: KeyboardEvent<SVGGElement>,
    office: ProjectedOffice,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOffice(office);
    }
  };

  const cardStyle = selectedOffice
    ? ({
        "--office-x": `${(selectedOffice.x / viewBox.width) * 100}%`,
        "--office-y": `${(selectedOffice.y / viewBox.height) * 100}%`,
      } as CSSProperties)
    : undefined;
  const regionCount = new Set(
    projectedOffices.map((office) => office.regionId),
  ).size;

  return (
    <section className="berta-map" aria-labelledby="berta-map-title">
      <header className="berta-map__header">
        <div>
          <p className="berta-map__eyebrow">Региональная сеть</p>
          <h2 id="berta-map-title">Офисы Берта на Северном Кавказе</h2>
        </div>
        <div className="berta-map__meta" aria-label="Охват сети">
          <span>{projectedOffices.length} офисов</span>
          <span>{regionCount} регионов</span>
        </div>
      </header>

      <div className="berta-map__stage">
        <div
          ref={canvasRef}
          className={`berta-map__canvas ${
            zoom > minZoom ? "is-pannable" : ""
          } ${isDragging ? "is-dragging" : ""}`}
          onPointerDown={handlePanStart}
          onPointerMove={handlePanMove}
          onPointerUp={handlePanEnd}
          onPointerCancel={handlePanEnd}
          onClick={(event) => {
            if (ignoreClickRef.current) {
              event.preventDefault();
              return;
            }
            setSelectedOffice(null);
          }}
        >
          <svg
            className="berta-map__svg"
            viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
            style={
              {
                "--map-zoom": zoom,
                "--map-pan-x": `${pan.x}px`,
                "--map-pan-y": `${pan.y}px`,
              } as CSSProperties
            }
            role="img"
            aria-labelledby="berta-map-svg-title berta-map-svg-description"
          >
            <title id="berta-map-svg-title">
              Карта офисов Берта на Северном Кавказе без Дагестана
            </title>
            <desc id="berta-map-svg-description">
              Ставропольский край и пять республик с интерактивными маркерами
              офисов. После увеличения карту можно перетаскивать.
            </desc>

            <defs>
              <filter
                id="berta-pin-shadow"
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feDropShadow
                  dx="0"
                  dy="3"
                  stdDeviation="3"
                  floodColor="#111820"
                  floodOpacity=".2"
                />
              </filter>
            </defs>

            <g className="berta-map__regions">
              {regions.map((region) => {
                const isActive =
                  activeRegion === region.id ||
                  selectedOffice?.regionId === region.id;
                return (
                  <g
                    key={region.id}
                    className={`berta-map__region berta-map__region--${region.id} ${
                      isActive ? "is-active" : ""
                    }`}
                    onMouseEnter={() => setActiveRegion(region.id)}
                    onMouseLeave={() => setActiveRegion(null)}
                  >
                    <path d={region.path} />
                    <text
                      className="berta-map__region-label"
                      x={region.label.x}
                      y={region.label.y}
                      textAnchor="middle"
                    >
                      {region.shortName}
                    </text>
                  </g>
                );
              })}
            </g>

            <g className="berta-map__markers" aria-label="Офисы продаж">
              {projectedOffices.map((office, index) => {
                const isSelected = office.id === selectedOffice?.id;
                return (
                  <g
                    className={`berta-map__marker ${
                      isSelected ? "is-selected" : ""
                    }`}
                    key={office.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`${office.city}, ${office.address}, ${office.phone}`}
                    aria-pressed={isSelected}
                    transform={`translate(${office.x} ${office.y})`}
                    style={
                      {
                        "--marker-delay": `${index * 55}ms`,
                      } as CSSProperties
                    }
                    onClick={(event) => {
                      event.stopPropagation();
                      if (ignoreClickRef.current) return;
                      selectOffice(office);
                    }}
                    onFocus={() => {
                      setActiveRegion(office.regionId);
                      selectOffice(office);
                    }}
                    onMouseEnter={() => {
                      setActiveRegion(office.regionId);
                      selectOffice(office);
                    }}
                    onKeyDown={(event) => handleMarkerKeyDown(event, office)}
                  >
                    <circle className="berta-map__marker-hit" r="19" />
                    <circle className="berta-map__marker-pulse" r="13" />
                    <path
                      className="berta-map__marker-pin"
                      filter="url(#berta-pin-shadow)"
                      d="M0-13C-7.2-13-13-7.2-13 0c0 9.2 13 21 13 21S13 9.2 13 0C13-7.2 7.2-13 0-13Z"
                    />
                    <circle
                      className="berta-map__marker-core"
                      cy="-0.5"
                      r="4"
                    />
                  </g>
                );
              })}
            </g>
          </svg>

          <div
            className="berta-map__zoom"
            aria-label="Управление масштабом карты"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Уменьшить масштаб карты"
              disabled={zoom <= minZoom}
              onClick={() => changeZoom(-1)}
            >
              <span aria-hidden="true">−</span>
            </button>
            <output aria-live="polite">{Math.round(zoom * 100)}%</output>
            <button
              type="button"
              aria-label="Увеличить масштаб карты"
              disabled={zoom >= maxZoom}
              onClick={() => changeZoom(1)}
            >
              <span aria-hidden="true">+</span>
            </button>
          </div>

          {selectedOffice && (
            <div
              className={`berta-map__popover ${
                selectedOffice.x > viewBox.width * 0.72 ? "is-left" : ""
              } ${selectedOffice.y > viewBox.height * 0.66 ? "is-above" : ""}`}
              data-panned={zoom > minZoom ? "true" : undefined}
              style={cardStyle}
              onClick={(event) => event.stopPropagation()}
            >
              <OfficeCard
                office={selectedOffice}
                onClose={() => setSelectedOffice(null)}
              />
            </div>
          )}

          <div className="berta-map__legend">
            <span aria-hidden="true" />
            Офис продаж
          </div>
        </div>

        <div className="berta-map__mobile-card">
          {selectedOffice ? (
            <OfficeCard
              office={selectedOffice}
              onClose={() => setSelectedOffice(null)}
            />
          ) : (
            <p>
              Перетаскивайте увеличенную карту, чтобы увидеть нужную область.
              Нажмите на красную точку, чтобы открыть офис.
            </p>
          )}
        </div>
      </div>

      <footer className="berta-map__footer">
        <p>
          Выберите ближайший офис или позвоните по единой бесплатной линии.
        </p>
        <a href={`tel:${hotline.replace(/[^+\d]/g, "")}`}>{hotline}</a>
      </footer>
    </section>
  );
}
