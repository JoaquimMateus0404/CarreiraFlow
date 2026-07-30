"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";



const ICON_OPTIONS = [
  "fa-solid fa-envelope", "fa-solid fa-phone", "fa-solid fa-mobile-screen",
  "fa-solid fa-location-dot", "fa-solid fa-house", "fa-solid fa-globe",
  "fa-solid fa-link", "fa-brands fa-linkedin", "fa-brands fa-github",
  "fa-brands fa-x-twitter", "fa-brands fa-instagram", "fa-brands fa-facebook",
  "fa-brands fa-whatsapp", "fa-brands fa-telegram", "fa-solid fa-calendar",
  "fa-solid fa-flag", "fa-solid fa-user", "fa-solid fa-id-card",
  "fa-solid fa-briefcase", "fa-solid fa-graduation-cap", "fa-solid fa-car",
  "fa-solid fa-clock", "fa-solid fa-map", "fa-solid fa-heart",
  "fa-solid fa-star", "fa-solid fa-circle-info", "fa-solid fa-language",
  "fa-brands fa-behance", "fa-brands fa-dribbble", "fa-solid fa-building",
];

type OpenDetail = { target: HTMLElement; top: number; left: number };

export default function IconPicker() {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setSlot(document.getElementById("icon-picker"));
  }, []);

  useEffect(() => {
    function handleOpen(e: Event) {
      const detail = (e as CustomEvent<OpenDetail>).detail;
      if (!detail) return;
      setTarget(detail.target);
      setPos({ top: detail.top, left: detail.left });
      setShow(true);
    }
    function handleClose() {
      setShow(false);
      setTarget(null);
    }
    window.addEventListener("open-icon-picker", handleOpen);
    window.addEventListener("close-icon-picker", handleClose);
    return () => {
      window.removeEventListener("open-icon-picker", handleOpen);
      window.removeEventListener("close-icon-picker", handleClose);
    };
  }, []);

  // Fechar ao clicar fora do seletor.
  useEffect(() => {
    if (!show) return;
    function handleDocClick(e: MouseEvent) {
      const picker = document.getElementById("icon-picker");
      const clicked = e.target as HTMLElement;
      if (picker && !picker.contains(clicked) && !clicked.classList.contains("editable-icon")) {
        setShow(false);
        setTarget(null);
      }
    }
    document.addEventListener("click", handleDocClick);
    return () => document.removeEventListener("click", handleDocClick);
  }, [show]);

  // O <div id="icon-picker"> é um elemento estático fora do controlo do
  // React (faz parte do HTML injetado), por isso a posição/visibilidade
  // dele é ajustada aqui de forma imperativa.
  useEffect(() => {
    const picker = document.getElementById("icon-picker");
    if (!picker) return;
    if (show) {
      let left = pos.left;
      const maxLeft = window.scrollX + document.documentElement.clientWidth - 240;
      if (left > maxLeft) left = maxLeft;
      picker.style.display = "grid";
      picker.style.top = pos.top + "px";
      picker.style.left = left + "px";
    } else {
      picker.style.display = "none";
    }
  }, [show, pos]);

  function handleSelect(cls: string) {
    if (target) {
      target.className = cls + " editable-icon";
    }
    setShow(false);
    setTarget(null);
  }

  if (!slot || !show) return null;

  return createPortal(
    <>
      {ICON_OPTIONS.map((cls) => (
        <button key={cls} type="button" onClick={() => handleSelect(cls)}>
          <i className={cls}></i>
        </button>
      ))}
    </>,
    slot
  );
}
