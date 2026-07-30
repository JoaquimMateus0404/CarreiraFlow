"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";



type ThemeVars = {
  primary: string;
  accent: string;
  sidebarBg: string;
  sidebarText: string;
  bgBody: string;
  badge: string;
};

const THEMES: Record<string, ThemeVars> = {
  classic: { primary: "#0f172a", accent: "#0284c7", sidebarBg: "#1e293b", sidebarText: "#f8fafc", bgBody: "#f1f5f9", badge: "#334155" },
  amber: { primary: "#1c1917", accent: "#b45309", sidebarBg: "#1c1917", sidebarText: "#fef3c7", bgBody: "#faf6f0", badge: "#44403c" },
  emerald: { primary: "#052e2b", accent: "#0d9488", sidebarBg: "#052e2b", sidebarText: "#ecfdf5", bgBody: "#f0fdfa", badge: "#134e4a" },
  violet: { primary: "#1e1b2e", accent: "#7c3aed", sidebarBg: "#1e1b2e", sidebarText: "#f5f3ff", bgBody: "#f5f3ff", badge: "#312a4d" },
  crimson: { primary: "#450a0a", accent: "#dc2626", sidebarBg: "#450a0a", sidebarText: "#fef2f2", bgBody: "#fef7f7", badge: "#7f1d1d" },
  slate: { primary: "#1e293b", accent: "#475569", sidebarBg: "#334155", sidebarText: "#f8fafc", bgBody: "#f8fafc", badge: "#475569" },
};

const SWATCH_LABELS: Record<string, string> = {
  classic: "Azul Clássico",
  amber: "Âmbar Executivo",
  emerald: "Verde Esmeralda",
  violet: "Roxo Moderno",
  crimson: "Vermelho Bordô",
  slate: "Cinza Minimalista",
};

function swatchGradient(t: ThemeVars) {
  return `linear-gradient(135deg,${t.sidebarBg} 50%,${t.accent} 50%)`;
}

export function applyTheme(name: string) {
  const t = THEMES[name];
  if (!t) return;
  const root = document.documentElement.style;
  root.setProperty("--primary-color", t.primary);
  root.setProperty("--accent-color", t.accent);
  root.setProperty("--sidebar-bg", t.sidebarBg);
  root.setProperty("--sidebar-text", t.sidebarText);
  root.setProperty("--bg-body", t.bgBody);
  root.setProperty("--badge-bg", t.badge);
}

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById("theme-switcher-slot"));
    setMounted(true);
  }, []);

  if (!mounted || !slot) return null;

  return createPortal(
    <div className="dropdown">
      <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
        <i className="fa-solid fa-palette me-1"></i>Tema
      </button>
      <ul className="dropdown-menu p-2" style={{ minWidth: 220 }}>
        <div className="d-flex gap-2 flex-wrap px-1">
          {Object.entries(THEMES).map(([key, t]) => (
            <button
              key={key}
              type="button"
              className="theme-swatch"
              style={{ background: swatchGradient(t) }}
              title={SWATCH_LABELS[key]}
              onClick={() => applyTheme(key)}
            />
          ))}
        </div>
      </ul>
    </div>,
    slot
  );
}
