"use client";

import { useEffect, useState } from "react";

/**
 * Modal "Sobre / Apoiar este projeto".
 *
 * Primeira peça convertida de public/app.js para um componente React real.
 *
 * Ponte com o resto da aplicação (ainda em JavaScript puro):
 * o botão "Sobre" na barra de ferramentas continua em HTML/JS normal e
 * chama `openAboutModal()` (definida em public/app.js), que agora apenas
 * despacha o evento do browser "open-about-modal". Este componente ouve
 * esse evento — assim não precisámos de tocar no botão nem no resto do
 * app.js para este primeiro passo.
 */

const ABOUT_SEEN_KEY = "cvbuilder_hide_about";

export default function AboutModal() {
  const [show, setShow] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Mostrar automaticamente ao carregar a página (uma vez), a não ser
  // que a pessoa já tenha marcado "não mostrar novamente" antes.
  useEffect(() => {
    let hide = false;
    try {
      hide = localStorage.getItem(ABOUT_SEEN_KEY) === "1";
    } catch {
      hide = false;
    }
    if (!hide) {
      const timer = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  // Ouvir pedidos vindos do botão "Sobre" (ainda em HTML/JS puro).
  useEffect(() => {
    function handleOpenRequest() {
      setShow(true);
    }
    window.addEventListener("open-about-modal", handleOpenRequest);
    return () => window.removeEventListener("open-about-modal", handleOpenRequest);
  }, []);

  // Replicar o comportamento do Bootstrap Modal no <body> (classe
  // "modal-open" evita scroll da página por baixo do modal).
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [show]);

  function handleClose() {
    if (dontShowAgain) {
      try {
        localStorage.setItem(ABOUT_SEEN_KEY, "1");
      } catch {
        // armazenamento indisponível — ignora silenciosamente
      }
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                
                Sobre esta ferramenta
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Fechar"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Esta é uma ferramenta <strong>gratuita e de código aberto</strong>,
                criada para ajudar estudantes e profissionais a criar currículos e
                cartas de apresentação com aparência profissional — sem custos, sem
                anúncios e sem necessidade de conta. Os seus dados ficam guardados
                apenas no seu próprio navegador.
              </p>
              <p className="mb-2">
                Pode gerar tanto o <strong>Currículo</strong> como a{" "}
                <strong>Carta de Apresentação</strong> (use os separadores no
                topo), guardar rascunhos para continuar mais tarde, e exportar em
                PDF pronto a enviar.
              </p>
              <hr />
              <p className="mb-2">
                Se esta ferramenta foi útil para si, considere apoiar a sua
                manutenção e o desenvolvimento de novas funcionalidades:
              </p>
              <div className="support-field">
                <span className="support-label">IBAN</span>
                <span  suppressContentEditableWarning>
                  AO06 0000 0000 0000 0000 0000 0
                </span>
              </div>
              <div className="support-field">
                <span className="support-label">Nº de Conta</span>
                <span  suppressContentEditableWarning>
                  19253082610001
                </span>
              </div>
              <div className="support-field">
                <span className="support-label">Multicaixa Express</span>
                <span  suppressContentEditableWarning>
                 933 855 723
                </span>
              </div>
              <p className="text-muted" style={{ fontSize: "0.78rem" }}>
                Nota: estes campos são um exemplo — edite-os com os seus próprios
                dados antes de partilhar esta ferramenta com outras pessoas.
              </p>
              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="dont-show-again"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="dont-show-again"
                  style={{ fontSize: "0.85rem" }}
                >
                  Não mostrar esta mensagem novamente
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleClose}>
                Continuar para a ferramenta
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
