'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap, Marker } from 'leaflet';

export interface MapOffice {
  id: string;
  name: string;
}

/** Real coordinates of the three offices (Gurugram Udyog Vihar, Great Neck NY, Headington Oxford). */
const COORDS: Record<string, { lat: number; lng: number; label: string; kind: 'india' | 'liberty' | 'bigben' }> = {
  'india office': { lat: 28.5018, lng: 77.0884, label: 'India Office', kind: 'india' },
  'united states of america': { lat: 40.8007, lng: -73.7285, label: 'USA Office', kind: 'liberty' },
  'united kingdom': { lat: 51.7595, lng: -1.2085, label: 'UK Office', kind: 'bigben' },
};

const ZOOM = 10;
const MONUMENT: Record<string, string> = {
  liberty:
    '<svg viewBox="0 0 90 140" fill="#a3282a" width="50" height="52" style="position:absolute;left:69px;top:50px"><path d="M71 2c5 6 4 11 0 14-4-3-5-8 0-14z"/><path d="M66 15h10v7H66z"/><path d="M57 54l6-3 9-29-7-2z"/><circle cx="44" cy="39" r="8"/><path d="M33 33l-8-6M37 29l-4-9M44 27v-11M51 29l4-9M55 33l8-6" fill="none" stroke="#a3282a" stroke-width="3" stroke-linecap="round"/><path d="M35 48h18l6 14 8 50H21l8-50z"/><path d="M12 112h66v10H12zM20 122h50v18H20z"/></svg>',
  bigben:
    '<svg viewBox="0 0 60 140" fill="#a3282a" width="50" height="52" style="position:absolute;left:69px;top:50px"><path d="M30 0l7 34H23z"/><path d="M21 36h18v8H21zM19 44h22v76H19z"/><circle cx="30" cy="62" r="9" fill="none" stroke="#a3282a" stroke-width="3"/><path d="M14 120h32v20H14z"/></svg>',
};

/** Pin markup: India uses the exact Figma pin (640:11430); the others share its teardrop. 188x188, tip at (94, 150). */
function pinHtml(key: string): string {
  const c = COORDS[key];
  if (!c) return '';
  if (c.kind === 'india') {
    return '<img src="/figma-contact/pin-india-transparent.png" alt="India Office" width="188" height="188" style="width:188px;height:188px;display:block" />';
  }
  return (
    '<div style="position:relative;width:188px;height:188px">' +
    '<svg viewBox="0 0 188 188" width="188" height="188" style="position:absolute;inset:0"><path d="M94 150C94 150 50 104 50 76a44 44 0 1 1 88 0c0 28-44 74-44 74z" fill="#a3282a"/><circle cx="94" cy="76" r="30" fill="#fff"/></svg>' +
    MONUMENT[c.kind] +
    `<p style="position:absolute;left:50%;top:158px;transform:translateX(-50%);white-space:nowrap;margin:0;font:600 22px/1.34 var(--font-montserrat),sans-serif;letter-spacing:-1px;color:#04264e">${c.label}</p>` +
    '</div>'
  );
}

/**
 * A real, draggable map (Leaflet + OpenStreetMap tiles, desaturated in CSS to match the design) that flies to the office picked in the cards beside it.
 * The map is created once; changing `activeId` only runs `flyTo` and toggles the markers' CSS class, so nothing re-renders.
 * Pins are real map markers (tip anchored on the office's coordinates), so they stay locked to their location while panning.
 * `offsetRatio` shifts the focus point right of the panel's centre when the panel is wide (desktop), where the cards cover its left side.
 */
export function OfficeMap({ offices, activeId, offsetRatio = 0 }: { offices: MapOffice[]; activeId?: string; offsetRatio?: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const flyRef = useRef<(id: string | undefined, animate: boolean) => void>(() => undefined);

  // Create the map once.
  useEffect(() => {
    let cancelled = false;
    let teardown: (() => void) | undefined;

    (async () => {
      try {
      const L = (await import('leaflet')).default;
      const host = hostRef.current;
      if (cancelled || !host) return;

      const map = L.map(host, { zoomControl: false, attributionControl: true, scrollWheelZoom: false, zoomSnap: 0.25, worldCopyJump: true });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapRef.current = map;

      for (const o of offices) {
        const key = o.name.toLowerCase();
        const c = COORDS[key];
        if (!c) continue;
        const marker = L.marker([c.lat, c.lng], {
          icon: L.divIcon({ className: 'office-pin', html: pinHtml(key), iconSize: [188, 188], iconAnchor: [94, 150] }),
          keyboard: false,
          interactive: false,
        }).addTo(map);
        markersRef.current.set(o.id, marker);
      }

      flyRef.current = (id, animate) => {
        const markActive = () => markersRef.current.forEach((m, mid) => m.getElement()?.classList.toggle('is-active', mid === id));
        const office = offices.find((o) => o.id === id);
        const c = office && COORDS[office.name.toLowerCase()];
        if (!c) return;
        const size = map.getSize();
        // Keep the pin right of the centre when the cards cover the left part of the panel.
        const target = map.unproject(map.project([c.lat, c.lng], ZOOM).subtract([size.x >= 1000 ? size.x * offsetRatio : 0, 75]), ZOOM);
        if (animate) {
          markActive();
          map.flyTo(target, ZOOM, { duration: 1.4, easeLinearity: 0.25 });
        } else {
          map.setView(target, ZOOM, { animate: false });
          markActive(); // marker elements only exist once the map has a view
        }
      };

      // Initial view (no animation) — a Leaflet map shows nothing until it has one.
      map.invalidateSize();
      flyRef.current(activeId, false);
      const ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(host);
      teardown = () => {
        ro.disconnect();
        map.remove();
        mapRef.current = null;
        markersRef.current.clear();
      };
      } catch (err) {
        hostRef.current?.setAttribute('data-map-error', String(err));
      }
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
    // The map is created once; later changes go through the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Selecting another office pans the existing map.
  useEffect(() => {
    flyRef.current(activeId, true);
  }, [activeId]);

  return <div ref={hostRef} className="office-map size-full bg-[#e9e9e9]" role="region" aria-label="Office locations map" />;
}
