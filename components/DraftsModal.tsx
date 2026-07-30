"use client";

import { useEffect, useState } from "react";



type DocType = "cv" | "letter";

type ThemeVars = Record<string, string>;

type Draft = {
  id: string;
  name: string;
  type: DocType;
  savedAt: string;
  template: string | null;
  themeVars: ThemeVars;
  html: string;
};

const DRAFTS_KEY = "cvbuilder_profiles_v1";
const THEME_PROPS = [
  "--primary-color",
  "--accent-color",
  "--sidebar-bg",
  "--sidebar-text",
  "--bg-body",
  "--badge-bg",
];

function getThemeVars(): ThemeVars {
  const cs = document.documentElement.style;
  const vars: ThemeVars = {};
  THEME_PROPS.forEach((p) => {
    vars[p] = cs.getPropertyValue(p);
  });
  return vars;
}

function applyThemeVars(vars: ThemeVars | undefined) {
  if (!vars) return;
  const cs = document.documentElement.style;
  Object.keys(vars).forEach((p) => {
    if (vars[p]) cs.setProperty(p, vars[p]);
  });
}

function getDrafts(): Draft[] {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    return raw ? (JSON.parse(raw) as Draft[]) : [];
  } catch {
    return [];
  }
}

function saveDrafts(drafts: Draft[]): boolean {
  try {
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    return true;
  } catch {
    alert("Não foi possível guardar: o armazenamento local está cheio ou indisponível neste navegador.");
    return false;
  }
}

function getCurrentApp(): DocType {
  const w = window as unknown as { currentApp?: DocType };
  return w.currentApp === "letter" ? "letter" : "cv";
}

function callSwitchApp(app: DocType) {
  const w = window as unknown as { switchApp?: (app: DocType) => void };
  w.switchApp?.(app);
}

export default function DraftsModal() {
  const [show, setShow] = useState(false);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    function handleOpen() {
      setDrafts(getDrafts());
      setNameInput("");
      setShow(true);
    }
    window.addEventListener("open-drafts-modal", handleOpen);
    return () => window.removeEventListener("open-drafts-modal", handleOpen);
  }, []);

  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [show]);

  function refresh() {
    setDrafts(getDrafts());
  }

  function handleSaveCurrent() {
    const app = getCurrentApp();
    let name = nameInput.trim();
    if (!name) {
      name = (app === "letter" ? "Carta" : "CV") + " - " + new Date().toLocaleDateString("pt-PT");
    }
    const rootId = app === "letter" ? "letter-root" : "cv-root";
    const root = document.getElementById(rootId);
    if (!root) return;

    const draft: Draft = {
      id: "d" + Date.now(),
      name,
      type: app,
      savedAt: new Date().toISOString(),
      template: root.getAttribute("data-template"),
      themeVars: getThemeVars(),
      html: root.innerHTML,
    };

    const all = getDrafts();
    all.push(draft);
    if (saveDrafts(all)) {
      setNameInput("");
      refresh();
    }
  }

  function handleLoad(id: string) {
    const all = getDrafts();
    const draft = all.find((d) => d.id === id);
    if (!draft) return;
    if (!confirm(`Carregar "${draft.name}"? As alterações não guardadas no documento atual serão perdidas.`)) return;

    callSwitchApp(draft.type);
    const rootId = draft.type === "letter" ? "letter-root" : "cv-root";
    const root = document.getElementById(rootId);
    if (root) {
      root.innerHTML = draft.html;
      if (draft.template) root.setAttribute("data-template", draft.template);
    }
    applyThemeVars(draft.themeVars);
    setShow(false);
  }

  function handleDelete(id: string) {
    if (!confirm("Remover este rascunho? Esta ação não pode ser desfeita.")) return;
    const all = getDrafts().filter((d) => d.id !== id);
    saveDrafts(all);
    refresh();
  }

  function handleExportBackup() {
    const all = getDrafts();
    if (!all.length) {
      alert("Não há rascunhos para exportar.");
      return;
    }
    const blob = new Blob([JSON.stringify(all, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rascunhos_backup.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleImportBackup(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target?.result as string);
        if (!Array.isArray(imported)) throw new Error("formato inválido");
        const existing = getDrafts();
        const existingIds = new Set(existing.map((d) => d.id));
        const merged = existing.concat(imported.filter((d: Draft) => !existingIds.has(d.id)));
        if (saveDrafts(merged)) {
          refresh();
          alert("Rascunhos importados com sucesso.");
        }
      } catch {
        alert("Não foi possível ler este ficheiro de cópia de segurança.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  if (!show) return null;

  const sorted = [...drafts].sort((a, b) => b.savedAt.localeCompare(a.savedAt));

  return (
    <>
      <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fa-solid fa-clock-rotate-left me-2"></i>Rascunhos guardados
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Fechar"
                onClick={() => setShow(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex gap-2 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome para este rascunho (ex: CV Marketing 2026)"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
                <button className="btn btn-primary text-nowrap" onClick={handleSaveCurrent}>
                  <i className="fa-solid fa-floppy-disk me-1"></i>Guardar atual
                </button>
              </div>

              <div>
                {sorted.map((d) => {
                  const typeLabel = d.type === "letter" ? "Carta" : "Currículo";
                  const date = new Date(d.savedAt).toLocaleString("pt-PT", {
                    dateStyle: "short",
                    timeStyle: "short",
                  });
                  return (
                    <div className="draft-item" key={d.id}>
                      <span className="badge text-bg-secondary">{typeLabel}</span>
                      <span className="draft-name">{d.name}</span>
                      <span className="draft-meta">{date}</span>
                      <button className="btn btn-sm btn-outline-primary" onClick={() => handleLoad(d.id)}>
                        <i className="fa-solid fa-folder-open"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(d.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
              {!sorted.length && (
                <p className="text-muted small mb-0">
                  Ainda não tem rascunhos guardados neste navegador.
                </p>
              )}

              <hr />
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-sm btn-outline-secondary" onClick={handleExportBackup}>
                  <i className="fa-solid fa-download me-1"></i>Exportar cópia de segurança (.json)
                </button>
                <label className="btn btn-sm btn-outline-secondary mb-0">
                  <i className="fa-solid fa-upload me-1"></i>Importar cópia de segurança
                  <input type="file" accept=".json" hidden onChange={handleImportBackup} />
                </label>
              </div>
              <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.78rem" }}>
                Os rascunhos ficam guardados neste navegador (armazenamento local). Se limpar os
                dados do navegador ou mudar de computador, use a cópia de segurança para não os
                perder.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
