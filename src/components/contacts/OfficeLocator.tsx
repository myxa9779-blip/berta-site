"use client";

import {
  Clock3,
  LocateFixed,
  LoaderCircle,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { CMSOffice } from "@/lib/cms";

type MappedOffice = CMSOffice & {
  latitude: number;
  longitude: number;
};

type LocationStatus = "idle" | "loading" | "success" | "denied" | "unavailable";

function hasCoordinates(office: CMSOffice): office is MappedOffice {
  return Number.isFinite(office.latitude) && Number.isFinite(office.longitude);
}

function distanceInKm(
  first: { latitude: number; longitude: number },
  second: { latitude: number; longitude: number },
) {
  const radius = 6371;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const latitudeDelta = toRadians(second.latitude - first.latitude);
  const longitudeDelta = toRadians(second.longitude - first.longitude);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(first.latitude)) *
      Math.cos(toRadians(second.latitude)) *
      Math.sin(longitudeDelta / 2) ** 2;

  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(value: number) {
  if (value < 1) return `${Math.max(100, Math.round(value * 10) * 100)} м`;
  return `${value < 10 ? value.toFixed(1).replace(".", ",") : Math.round(value)} км`;
}

function createRouteUrl(office: MappedOffice) {
  return (
    office.routeUrl ||
    `https://yandex.ru/maps/?mode=routes&rtext=~${office.latitude},${office.longitude}&rtt=auto`
  );
}

function createMapUrl(offices: MappedOffice[], selected: MappedOffice) {
  const points = offices
    .map((office) => {
      const marker = office.phone === selected.phone ? "pm2rdm" : "pm2grm";
      return `${office.longitude},${office.latitude},${marker}`;
    })
    .join("~");

  const params = new URLSearchParams({
    ll: `${selected.longitude},${selected.latitude}`,
    z: "12",
    pt: points,
    l: "map",
    lang: "ru_RU",
  });

  return `https://yandex.ru/map-widget/v1/?${params.toString()}`;
}

export function OfficeLocator({
  offices,
  hotline,
}: {
  offices: CMSOffice[];
  hotline: string;
}) {
  const mappedOffices = useMemo(() => offices.filter(hasCoordinates), [offices]);
  const [selectedPhone, setSelectedPhone] = useState(mappedOffices[0]?.phone || "");
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [nearestDistance, setNearestDistance] = useState<number | null>(null);
  const selectedOffice =
    mappedOffices.find((office) => office.phone === selectedPhone) || mappedOffices[0];

  if (!selectedOffice) return null;

  const detectNearestOffice = () => {
    if (!navigator.geolocation) {
      setStatus("unavailable");
      return;
    }

    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const visitor = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        const nearest = mappedOffices
          .map((office) => ({ office, distance: distanceInKm(visitor, office) }))
          .sort((a, b) => a.distance - b.distance)[0];

        if (!nearest) {
          setStatus("unavailable");
          return;
        }

        setSelectedPhone(nearest.office.phone);
        setNearestDistance(nearest.distance);
        setStatus("success");
      },
      (error) => {
        setStatus(error.code === error.PERMISSION_DENIED ? "denied" : "unavailable");
      },
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 300000 },
    );
  };

  const selectOffice = (office: MappedOffice) => {
    setSelectedPhone(office.phone);
    setNearestDistance(null);
    setStatus("idle");
  };

  return (
    <section className="bg-[#eef0f1] py-12 sm:py-16 lg:py-20" aria-labelledby="office-locator-title">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">Офисы БЕРТА</p>
            <h2 id="office-locator-title" className="mt-3 max-w-[760px] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-ink sm:text-5xl lg:text-6xl">
              Найдём ближайший офис
            </h2>
            <p className="mt-5 max-w-[640px] text-sm leading-6 text-steel sm:text-base">
              Разрешите определить ваше местоположение — мы покажем ближайший офис, его контакты и маршрут в Яндекс Картах.
            </p>
          </div>
          <button
            type="button"
            onClick={detectNearestOffice}
            disabled={status === "loading"}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-accent px-6 text-sm font-semibold text-white transition hover:bg-[#b80f16] disabled:cursor-wait disabled:opacity-70"
          >
            {status === "loading" ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <LocateFixed className="h-4 w-4" aria-hidden="true" />}
            {status === "loading" ? "Определяем…" : "Найти ближайший офис"}
          </button>
        </div>

        <div className="mt-7 flex gap-2 overflow-x-auto pb-2" aria-label="Выбор офиса">
          {mappedOffices.map((office) => {
            const selected = office.phone === selectedOffice.phone;
            return (
              <button
                key={`${office.city}-${office.address}`}
                type="button"
                onClick={() => selectOffice(office)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition ${selected ? "border-[#07111a] bg-[#07111a] text-white" : "border-ink/12 bg-white text-ink hover:border-accent hover:text-accent"}`}
              >
                {office.city}
              </button>
            );
          })}
        </div>

        {(status === "denied" || status === "unavailable") && (
          <p className="mt-3 rounded-xl border border-ink/8 bg-white px-4 py-3 text-sm text-steel" role="status">
            {status === "denied"
              ? "Доступ к геолокации не разрешён. Выберите удобный офис из списка."
              : "Не удалось определить местоположение. Выберите удобный офис из списка."}
          </p>
        )}

        <div className="mt-6 grid overflow-hidden rounded-3xl bg-white shadow-[0_24px_70px_rgba(17,24,32,0.10)] lg:grid-cols-[360px_minmax(0,1fr)]">
          <article className="flex flex-col justify-between p-6 sm:p-8 lg:min-h-[520px]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                {nearestDistance !== null ? `Ближайший офис · ${formatDistance(nearestDistance)}` : "Выбранный офис"}
              </p>
              <h3 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-ink">{selectedOffice.city}</h3>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-steel">{selectedOffice.region}</p>
              <div className="mt-7 space-y-4 text-sm leading-6 text-steel">
                <p className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />{selectedOffice.address}</p>
                {selectedOffice.workingHours ? <p className="flex items-start gap-3"><Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />{selectedOffice.workingHours}</p> : null}
                <a href={`tel:${selectedOffice.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 font-semibold text-ink transition hover:text-accent"><Phone className="h-5 w-5 text-accent" aria-hidden="true" />{selectedOffice.phone}</a>
              </div>
              {selectedOffice.services.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedOffice.services.map((service) => <span key={service} className="rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-steel">{service}</span>)}
                </div>
              ) : null}
            </div>
            <div className="mt-8 space-y-3">
              <a href={createRouteUrl(selectedOffice)} target="_blank" rel="noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-accent px-5 text-sm font-semibold text-white transition hover:bg-[#b80f16]">
                <Navigation className="h-4 w-4" aria-hidden="true" />Проложить маршрут
              </a>
              <a href={`tel:${hotline.replace(/[^+\d]/g, "")}`} className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-ink/12 px-5 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent">
                Единая линия: {hotline}
              </a>
            </div>
          </article>

          <div className="relative min-h-[420px] border-t border-ink/8 lg:min-h-[520px] lg:border-l lg:border-t-0">
            <iframe
              key={selectedOffice.phone}
              src={createMapUrl(mappedOffices, selectedOffice)}
              title={`Яндекс Карта: офис БЕРТА в городе ${selectedOffice.city}`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
