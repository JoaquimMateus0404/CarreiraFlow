"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";



type TemplateOption = {
  key: string;
  label: string;
  swatch: React.ReactNode;
};

const TEMPLATES: TemplateOption[] = [
  {
    key: "classico",
    label: "Clássico",
    swatch: (
      <>
        <span className="ts-side" />
        <span className="ts-main" />
      </>
    ),
  },
  {
    key: "moderno",
    label: "Moderno",
    swatch: (
      <>
        <span className="ts-main" />
        <span className="ts-side ts-light" />
      </>
    ),
  },
  {
    key: "minimalista",
    label: "Minimalista",
    swatch: (
      <>
        <span className="ts-side ts-light" />
        <span className="ts-main" />
      </>
    ),
  },
  {
    key: "executivo",
    label: "Executivo",
    swatch: (
      <>
        <span className="ts-top" />
        <span className="ts-bottom" />
      </>
    ),
  },
];

export function applyTemplate(name: string) {
  document.getElementById("cv-root")?.setAttribute("data-template", name);
}

export default function TemplateSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById("template-switcher-slot"));
    setMounted(true);
  }, []);

  if (!mounted || !slot) return null;

  return createPortal(
    <div className="dropdown">
      <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
        <i className="fa-solid fa-table-columns me-1"></i>Modelo
      </button>
      <ul className="dropdown-menu p-2" style={{ minWidth: 240 }}>
        <div className="d-flex gap-2 flex-wrap px-1">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.key}
              type="button"
              className={"template-swatch" + (tpl.key === "executivo" ? " ts-column" : "")}
              title={tpl.label}
              onClick={() => applyTemplate(tpl.key)}
            >
              {tpl.swatch}
            </button>
          ))}
        </div>
      </ul>
    </div>,
    slot
  );
}
