        /* =========================================================
           TEMAS — agora em components/ThemeSwitcher.tsx
        ========================================================= */

        /* =========================================================
           APLICAÇÕES (Currículo / Carta de Apresentação)
        ========================================================= */
        let currentApp = 'cv';

        function switchApp(app) {
            currentApp = app;
            window.currentApp = app; // exposto para os componentes React lerem
            document.getElementById('app-cv').style.display = app === 'cv' ? 'block' : 'none';
            document.getElementById('app-letter').style.display = app === 'letter' ? 'block' : 'none';
            document.getElementById('toolbar-cv-controls').style.display = app === 'cv' ? 'flex' : 'none';
            document.getElementById('toolbar-letter-controls').style.display = app === 'letter' ? 'flex' : 'none';

            const tabCv = document.getElementById('tab-cv');
            const tabLetter = document.getElementById('tab-letter');
            tabCv.className = app === 'cv' ? 'btn btn-sm btn-light' : 'btn btn-sm btn-outline-light';
            tabLetter.className = app === 'letter' ? 'btn btn-sm btn-light' : 'btn btn-sm btn-outline-light';
        }

        function addLetterParagraph() {
            const p = document.createElement('p');
            p.className = 'letter-para';
            p.setAttribute('contenteditable', 'true');
            p.innerHTML = 'Novo parágrafo. Escreva aqui o conteúdo.<button class="item-delete no-print" onclick="removeItem(this)" contenteditable="false">×</button>';
            document.getElementById('letter-body').appendChild(p);
            p.focus();
        }

        /* =========================================================
           FOTO DE PERFIL
        ========================================================= */
        function handlePhotoUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = e => { document.getElementById('profile-img').src = e.target.result; };
            reader.readAsDataURL(file);
        }
        function removePhoto() {
            document.getElementById('photo-block').style.display = 'none';
            document.getElementById('restore-photo-btn').style.display = 'inline-block';
        }
        function restorePhoto() {
            document.getElementById('photo-block').style.display = 'block';
            document.getElementById('restore-photo-btn').style.display = 'none';
        }

        /* =========================================================
           REMOÇÃO DE ITENS / SECÇÕES
        ========================================================= */
        function removeItem(btn) {
            const item = btn.closest('.timeline-item, .project-card, .cert-item, .software-item, .info-item, .letter-para');
            if (item) item.remove();
        }
        function removeSkill(btn) {
            const item = btn.closest('.badge-skill');
            if (item) item.remove();
        }
        function removeSection(btn) {
            const section = btn.closest('.section-block');
            if (!section) return;
            if (confirm('Remover esta secção do currículo?')) section.remove();
        }
        function toggleReferences() {
            const el = document.getElementById('references-section');
            el.style.display = (el.style.display === 'none') ? '' : 'none';
        }

        /* =========================================================
           ADIÇÃO DE ITENS
        ========================================================= */
        function addExperience() {
            const wrap = document.createElement('div');
            wrap.className = 'timeline-item';
            wrap.innerHTML = `
                <button class="item-delete no-print" onclick="removeItem(this)">×</button>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <h5 class="fw-bold mb-0" contenteditable="true">Cargo</h5>
                    <span class="badge bg-light text-dark border" contenteditable="true">Ano - Ano</span>
                </div>
                <div class="text-muted small mb-2"><strong contenteditable="true">Nome da Empresa</strong> | <span contenteditable="true">Cidade</span></div>
                <ul class="text-muted ps-3 small" contenteditable="true">
                    <li>Descreva uma responsabilidade ou conquista.</li>
                </ul>`;
            document.getElementById('experience-list').appendChild(wrap);
            wrap.querySelector('h5').focus();
        }

        function addEducation() {
            const wrap = document.createElement('div');
            wrap.className = 'timeline-item';
            wrap.innerHTML = `
                <button class="item-delete no-print" onclick="removeItem(this)">×</button>
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <h5 class="fw-bold mb-0" contenteditable="true">Curso / Formação</h5>
                    <span class="text-muted small" contenteditable="true">Ano - Ano</span>
                </div>
                <div class="text-muted small" contenteditable="true">Instituição de Ensino</div>`;
            document.getElementById('education-list').appendChild(wrap);
            wrap.querySelector('h5').focus();
        }

        function addProject() {
            const wrap = document.createElement('div');
            wrap.className = 'project-card';
            wrap.innerHTML = `
                <button class="item-delete no-print" onclick="removeItem(this)">×</button>
                <div class="fw-bold" contenteditable="true">Nome do Projeto</div>
                <p class="small text-muted mb-1" contenteditable="true">Breve descrição do projeto.</p>
                <span class="badge text-bg-light" contenteditable="true">Tecnologia</span>`;
            document.getElementById('projects-list').appendChild(wrap);
            wrap.querySelector('.fw-bold').focus();
        }

        function addCertification() {
            const li = document.createElement('li');
            li.className = 'mb-1 cert-item';
            li.innerHTML = `
                <button class="item-delete no-print" onclick="removeItem(this)">×</button>
                <i class="fa-solid fa-certificate text-warning me-2"></i>
                <span contenteditable="true"><strong>Nome da Certificação</strong> – Instituição (Ano)</span>`;
            document.getElementById('certifications-list').appendChild(li);
            li.querySelector('span').focus();
        }

        function addSkill() {
            const span = document.createElement('span');
            span.className = 'badge-skill';
            span.setAttribute('contenteditable', 'true');
            span.innerHTML = `Nova Competência<button class="item-delete no-print" onclick="removeSkill(this)">×</button>`;
            document.getElementById('skills-list').appendChild(span);
            span.focus();
        }

        function addListItem(listId, iconClass, innerHTML) {
            const list = document.getElementById(listId);
            const li = document.createElement('li');
            li.className = 'info-item';
            li.innerHTML = `<i class="${iconClass} editable-icon" onclick="openIconPicker(this,event)"></i>${innerHTML}<button class="item-delete no-print" onclick="removeItem(this)">×</button>`;
            list.appendChild(li);
            const editable = li.querySelector('[contenteditable]');
            if (editable) editable.focus();
            return li;
        }

        function addContact() {
            addListItem('contact-list', 'fa-solid fa-circle-info', '<span contenteditable="true">Nova informação</span>');
        }

        function addPersonalInfo() {
            addListItem('personal-info-list', 'fa-solid fa-circle-info', '<span contenteditable="true">Novo campo</span>');
        }

        function addLanguage() {
            addListItem('languages-list', 'fa-solid fa-globe', ' <strong>Idioma:</strong>&nbsp;<span contenteditable="true">Nível</span>');
        }

        function addSection(location) {
            const title = prompt('Título da nova secção:', 'Nova Secção');
            if (!title) return;
            const isSidebar = location === 'sidebar';
            const wrap = document.createElement('div');
            wrap.className = 'section-block';
            wrap.innerHTML = isSidebar
                ? `<button class="section-delete no-print" onclick="removeSection(this)">×</button>
                   <h2 contenteditable="true">${title}</h2>
                   <p contenteditable="true" style="font-size:0.88rem;">Escreva aqui o conteúdo desta secção.</p>`
                : `<button class="section-delete no-print" onclick="removeSection(this)">×</button>
                   <h3 class="section-title" contenteditable="true">${title}</h3>
                   <p class="text-muted" contenteditable="true">Escreva aqui o conteúdo desta secção.</p>`;
            document.getElementById(isSidebar ? 'sidebar-area' : 'main-area').appendChild(wrap);
            wrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        /* =========================================================
           MODELOS (layout) — agora em components/TemplateSwitcher.tsx
        ========================================================= */

        /* =========================================================
           SELETOR DE ÍCONES — agora em components/IconPicker.tsx
           (o alvo #icon-picker no HTML serve de "portal" para o React)
        ========================================================= */
        function openIconPicker(iconEl, event) {
            event.stopPropagation();
            const rect = iconEl.getBoundingClientRect();
            window.dispatchEvent(new CustomEvent('open-icon-picker', {
                detail: {
                    target: iconEl,
                    top: window.scrollY + rect.bottom + 6,
                    left: window.scrollX + rect.left
                }
            }));
        }

        function closeIconPicker() {
            window.dispatchEvent(new CustomEvent('close-icon-picker'));
        }

        window.addEventListener('beforeprint', closeIconPicker);

        /* =========================================================
           SOFTWARES (nível em estrelas ou barra de progresso)
        ========================================================= */
        function addSoftware() {
            const list = document.getElementById('software-list');
            const showBar = list.dataset.style === 'bar';
            const div = document.createElement('div');
            div.className = 'software-item';
            div.dataset.level = '3';
            div.innerHTML = `
                <button class="item-delete no-print" onclick="removeItem(this)">×</button>
                <span class="software-name" contenteditable="true">Novo Software</span>
                <div class="software-stars" style="display:${showBar ? 'none' : 'flex'};">
                    <i class="fa-solid fa-star" data-val="1" onclick="setStarLevel(this,1)"></i>
                    <i class="fa-solid fa-star" data-val="2" onclick="setStarLevel(this,2)"></i>
                    <i class="fa-solid fa-star" data-val="3" onclick="setStarLevel(this,3)"></i>
                    <i class="fa-regular fa-star" data-val="4" onclick="setStarLevel(this,4)"></i>
                    <i class="fa-regular fa-star" data-val="5" onclick="setStarLevel(this,5)"></i>
                </div>
                <div class="software-bar" style="display:${showBar ? 'flex' : 'none'};">
                    <div class="software-bar-track"><div class="software-bar-fill" style="width:60%"></div></div>
                    <input type="range" class="no-print software-slider" min="0" max="100" value="60" oninput="updateBarFill(this)">
                </div>`;
            list.appendChild(div);
            div.querySelector('.software-name').focus();
        }

        function setStarLevel(el, val) {
            const group = el.parentElement;
            const item = group.closest('.software-item');
            item.dataset.level = val;
            group.querySelectorAll('i').forEach(star => {
                const v = parseInt(star.dataset.val, 10);
                star.className = v <= val ? 'fa-solid fa-star' : 'fa-regular fa-star';
            });
        }

        function updateBarFill(slider) {
            const fill = slider.previousElementSibling.querySelector('.software-bar-fill');
            fill.style.width = slider.value + '%';
        }

        function toggleSoftwareStyle() {
            const list = document.getElementById('software-list');
            const toBar = list.dataset.style !== 'bar';
            list.dataset.style = toBar ? 'bar' : 'stars';
            list.querySelectorAll('.software-item').forEach(item => {
                item.querySelector('.software-stars').style.display = toBar ? 'none' : 'flex';
                item.querySelector('.software-bar').style.display = toBar ? 'flex' : 'none';
            });
        }

        /* =========================================================
           EXPORTAR PDF (html2canvas + jsPDF, paginação manual)
           Captura o layout tal como aparece no ecrã (colunas lado a lado) e
           divide-o em páginas A4, ajustando cada corte para não cair a meio
           de uma experiência, projeto, certificação ou badge.
        ========================================================= */
        async function exportPDF() {
            const btn = document.getElementById('export-pdf-btn');
            const originalLabel = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>A gerar PDF...';
            document.body.classList.add('exporting');
            closeIconPicker();

            try {
                // dá tempo ao navegador para aplicar a classe "exporting" antes de capturar
                await new Promise(r => setTimeout(r, 60));

                const element = document.getElementById(currentApp === 'letter' ? 'letter-root' : 'cv-root');
                const scale = 2;

                const canvas = await html2canvas(element, {
                    scale,
                    useCORS: true,
                    backgroundColor: '#ffffff'
                });

                // Pontos de corte a evitar (itens que não devem ser partidos ao meio),
                // convertidos para as coordenadas do canvas (em pixels, já com o "scale").
                const avoidSelector = '.timeline-item, .project-card, .cert-item, .badge-skill, .software-item, .info-list li, .cv-header, .letter-para';
                const rootRect = element.getBoundingClientRect();
                const avoidRects = Array.from(element.querySelectorAll(avoidSelector)).map(el => {
                    const r = el.getBoundingClientRect();
                    return {
                        top: (r.top - rootRect.top) * scale,
                        bottom: (r.bottom - rootRect.top) * scale
                    };
                });

                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pageWidthMM = pdf.internal.pageSize.getWidth();
                const pageHeightMM = pdf.internal.pageSize.getHeight();
                const marginMM = 8;
                const usableWidthMM = pageWidthMM - marginMM * 2;
                const usableHeightMM = pageHeightMM - marginMM * 2;

                const pxPerMM = canvas.width / usableWidthMM;
                const pageHeightPx = usableHeightMM * pxPerMM;

                let renderedY = 0;
                let firstPage = true;
                let safetyCounter = 0;

                while (renderedY < canvas.height - 1 && safetyCounter < 200) {
                    safetyCounter++;
                    let cutY = Math.min(renderedY + pageHeightPx, canvas.height);

                    if (cutY < canvas.height) {
                        // se o corte proposto cai dentro de um item a preservar,
                        // recuar o corte para o topo desse item
                        let bestCut = cutY;
                        for (const rect of avoidRects) {
                            if (rect.top < cutY && rect.bottom > cutY && rect.top > renderedY) {
                                bestCut = Math.min(bestCut, rect.top);
                            }
                        }
                        // garantir progresso mínimo (evita ciclo infinito com itens muito altos)
                        if (bestCut - renderedY > pageHeightPx * 0.25) {
                            cutY = bestCut;
                        }
                    }

                    const sliceHeightPx = Math.max(1, Math.round(cutY - renderedY));
                    const pageCanvas = document.createElement('canvas');
                    pageCanvas.width = canvas.width;
                    pageCanvas.height = sliceHeightPx;
                    const ctx = pageCanvas.getContext('2d');
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
                    ctx.drawImage(canvas, 0, renderedY, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx);

                    const sliceData = pageCanvas.toDataURL('image/jpeg', 0.98);
                    const sliceHeightMM = sliceHeightPx / pxPerMM;

                    if (!firstPage) pdf.addPage();
                    pdf.addImage(sliceData, 'JPEG', marginMM, marginMM, usableWidthMM, sliceHeightMM);

                    renderedY += sliceHeightPx;
                    firstPage = false;
                }

                pdf.save(currentApp === 'letter' ? 'Carta_Apresentacao.pdf' : 'CV.pdf');
            } catch (err) {
                console.error(err);
                alert('Não foi possível gerar o PDF pela biblioteca. A abrir a caixa de impressão do navegador como alternativa.');
                window.print();
            } finally {
                document.body.classList.remove('exporting');
                btn.disabled = false;
                btn.innerHTML = originalLabel;
            }
        }

        /* =========================================================
           EXPORTAR CÓPIA EDITÁVEL EM HTML
        ========================================================= */
        function exportHTML() {
            const clone = document.documentElement.cloneNode(true);
            const toolbar = clone.querySelector('.editor-toolbar');
            const hint = clone.querySelector('.editor-hint');
            if (toolbar) toolbar.remove();
            if (hint) hint.remove();
            const html = '<!DOCTYPE html>\n' + clone.outerHTML;
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'CV_editavel.html';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }
        /* =========================================================
           RASCUNHOS — agora em components/DraftsModal.tsx
           (getThemeVars/applyThemeVars ficam aqui também, porque a
           gravação automática mais abaixo continua a precisar delas)
        ========================================================= */
        function getThemeVars() {
            const cs = document.documentElement.style;
            const props = ['--primary-color', '--accent-color', '--sidebar-bg', '--sidebar-text', '--bg-body', '--badge-bg'];
            const vars = {};
            props.forEach(p => { vars[p] = cs.getPropertyValue(p); });
            return vars;
        }

        function applyThemeVars(vars) {
            if (!vars) return;
            const cs = document.documentElement.style;
            Object.keys(vars).forEach(p => { if (vars[p]) cs.setProperty(p, vars[p]); });
        }

        function openDraftsModal() {
            window.dispatchEvent(new CustomEvent('open-drafts-modal'));
        }

        /* =========================================================
           MODAL "SOBRE / APOIAR" — agora é um componente React
           (components/AboutModal.tsx). Esta função fica apenas como
           ponte: o botão "Sobre" na barra de ferramentas continua a
           chamar openAboutModal(), que só avisa o React para abrir.
           A auto-abertura ao carregar a página e a lógica de "não
           mostrar novamente" já vivem dentro do componente React.
        ========================================================= */
        function openAboutModal() {
            window.dispatchEvent(new CustomEvent('open-about-modal'));
        }

        /* =========================================================
           GRAVAÇÃO AUTOMÁTICA (a cada 90 segundos)
           Guarda silenciosamente o estado atual (Currículo + Carta)
           num espaço próprio do localStorage, separado dos "Rascunhos"
           guardados manualmente. Serve para não perder o trabalho se
           fechar a aba ou o navegador por acidente.
        ========================================================= */
        const AUTOSAVE_KEY = 'cvbuilder_autosave_v1';
        const AUTOSAVE_INTERVAL_MS = 90000; // 1min30s

        function collectAutosaveData() {
            return {
                savedAt: new Date().toISOString(),
                activeApp: currentApp,
                cv: {
                    template: document.getElementById('cv-root').dataset.template,
                    html: document.getElementById('cv-root').innerHTML
                },
                letter: {
                    html: document.getElementById('letter-root').innerHTML
                },
                themeVars: getThemeVars()
            };
        }

        function autoSaveNow() {
            try {
                localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(collectAutosaveData()));
                updateAutosaveIndicator();
            } catch (e) {
                // armazenamento indisponível ou cheio — falha silenciosamente
            }
        }

        function updateAutosaveIndicator() {
            const el = document.getElementById('autosave-indicator');
            if (!el) return;
            const now = new Date();
            el.innerHTML = '<i class="fa-solid fa-check me-1"></i>Guardado automaticamente às ' +
                now.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
            el.style.opacity = '1';
        }

        function checkAutosaveOnLoad() {
            let data = null;
            try { data = JSON.parse(localStorage.getItem(AUTOSAVE_KEY)); } catch (e) { data = null; }
            if (!data || !data.savedAt) return;
            const banner = document.getElementById('autosave-banner');
            const dateStr = new Date(data.savedAt).toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' });
            document.getElementById('autosave-banner-text').textContent =
                'Encontrámos uma gravação automática de ' + dateStr + '. Deseja restaurar de onde ficou?';
            banner.style.display = 'flex';
        }

        function restoreAutosave() {
            let data = null;
            try { data = JSON.parse(localStorage.getItem(AUTOSAVE_KEY)); } catch (e) { data = null; }
            if (!data) return;
            if (data.cv && data.cv.html) {
                const cvRoot = document.getElementById('cv-root');
                cvRoot.innerHTML = data.cv.html;
                if (data.cv.template) cvRoot.setAttribute('data-template', data.cv.template);
            }
            if (data.letter && data.letter.html) {
                document.getElementById('letter-root').innerHTML = data.letter.html;
            }
            applyThemeVars(data.themeVars);
            switchApp(data.activeApp === 'letter' ? 'letter' : 'cv');
            dismissAutosaveBanner();
        }

        function dismissAutosaveBanner() {
            document.getElementById('autosave-banner').style.display = 'none';
        }

        window.addEventListener('DOMContentLoaded', checkAutosaveOnLoad);
        setInterval(autoSaveNow, AUTOSAVE_INTERVAL_MS);
        window.addEventListener('beforeunload', autoSaveNow);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') autoSaveNow();
        });
