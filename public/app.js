        /* =========================================================
           TEMAS
        ========================================================= */
        const THEMES = {
            classic: { primary:'#0f172a', accent:'#0284c7', sidebarBg:'#1e293b', sidebarText:'#f8fafc', bgBody:'#f1f5f9', badge:'#334155' },
            amber:   { primary:'#1c1917', accent:'#b45309', sidebarBg:'#1c1917', sidebarText:'#fef3c7', bgBody:'#faf6f0', badge:'#44403c' },
            emerald: { primary:'#052e2b', accent:'#0d9488', sidebarBg:'#052e2b', sidebarText:'#ecfdf5', bgBody:'#f0fdfa', badge:'#134e4a' },
            violet:  { primary:'#1e1b2e', accent:'#7c3aed', sidebarBg:'#1e1b2e', sidebarText:'#f5f3ff', bgBody:'#f5f3ff', badge:'#312a4d' },
            crimson: { primary:'#450a0a', accent:'#dc2626', sidebarBg:'#450a0a', sidebarText:'#fef2f2', bgBody:'#fef7f7', badge:'#7f1d1d' },
            slate:   { primary:'#1e293b', accent:'#475569', sidebarBg:'#334155', sidebarText:'#f8fafc', bgBody:'#f8fafc', badge:'#475569' },
        };

        function applyTheme(name) {
            const t = THEMES[name];
            if (!t) return;
            const root = document.documentElement.style;
            root.setProperty('--primary-color', t.primary);
            root.setProperty('--accent-color', t.accent);
            root.setProperty('--sidebar-bg', t.sidebarBg);
            root.setProperty('--sidebar-text', t.sidebarText);
            root.setProperty('--bg-body', t.bgBody);
            root.setProperty('--badge-bg', t.badge);
        }

        /* =========================================================
           APLICAÇÕES (Currículo / Carta de Apresentação)
        ========================================================= */
        let currentApp = 'cv';

        function switchApp(app) {
            currentApp = app;
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
           MODELOS (layout)
        ========================================================= */
        function applyTemplate(name) {
            document.getElementById('cv-root').setAttribute('data-template', name);
        }

        /* =========================================================
           SELETOR DE ÍCONES (Contato / Informações Pessoais / Idiomas)
        ========================================================= */
        const ICON_OPTIONS = [
            'fa-solid fa-envelope', 'fa-solid fa-phone', 'fa-solid fa-mobile-screen',
            'fa-solid fa-location-dot', 'fa-solid fa-house', 'fa-solid fa-globe',
            'fa-solid fa-link', 'fa-brands fa-linkedin', 'fa-brands fa-github',
            'fa-brands fa-x-twitter', 'fa-brands fa-instagram', 'fa-brands fa-facebook',
            'fa-brands fa-whatsapp', 'fa-brands fa-telegram', 'fa-solid fa-calendar',
            'fa-solid fa-flag', 'fa-solid fa-user', 'fa-solid fa-id-card',
            'fa-solid fa-briefcase', 'fa-solid fa-graduation-cap', 'fa-solid fa-car',
            'fa-solid fa-clock', 'fa-solid fa-map', 'fa-solid fa-heart',
            'fa-solid fa-star', 'fa-solid fa-circle-info', 'fa-solid fa-language',
            'fa-brands fa-behance', 'fa-brands fa-dribbble', 'fa-solid fa-building'
        ];

        let iconPickerTarget = null;

        function buildIconPicker() {
            const picker = document.getElementById('icon-picker');
            picker.innerHTML = ICON_OPTIONS.map(cls =>
                `<button type="button" onclick="selectIcon('${cls}')"><i class="${cls}"></i></button>`
            ).join('');
        }

        function openIconPicker(iconEl, event) {
            event.stopPropagation();
            if (!document.getElementById('icon-picker').innerHTML) buildIconPicker();
            iconPickerTarget = iconEl;
            const picker = document.getElementById('icon-picker');
            const rect = iconEl.getBoundingClientRect();
            picker.style.display = 'grid';
            const top = window.scrollY + rect.bottom + 6;
            let left = window.scrollX + rect.left;
            const maxLeft = window.scrollX + document.documentElement.clientWidth - 240;
            if (left > maxLeft) left = maxLeft;
            picker.style.top = top + 'px';
            picker.style.left = left + 'px';
        }

        function selectIcon(cls) {
            if (iconPickerTarget) {
                iconPickerTarget.className = cls + ' editable-icon';
            }
            closeIconPicker();
        }

        function closeIconPicker() {
            const picker = document.getElementById('icon-picker');
            if (picker) picker.style.display = 'none';
            iconPickerTarget = null;
        }

        document.addEventListener('click', function (e) {
            const picker = document.getElementById('icon-picker');
            if (picker && picker.style.display !== 'none' && !picker.contains(e.target) && !e.target.classList.contains('editable-icon')) {
                closeIconPicker();
            }
        });
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
           RASCUNHOS (armazenamento local do navegador)
           Nota: isto usa localStorage do navegador, por isso funciona
           quando abre este ficheiro .html diretamente (fica guardado
           neste computador/navegador). Use "Exportar cópia de segurança"
           para levar os seus rascunhos para outro dispositivo.
        ========================================================= */
        const DRAFTS_KEY = 'cvbuilder_profiles_v1';
        let currentDraftId = null;

        function getDrafts() {
            try {
                return JSON.parse(localStorage.getItem(DRAFTS_KEY)) || [];
            } catch (e) {
                return [];
            }
        }

        function saveDrafts(drafts) {
            try {
                localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
                return true;
            } catch (e) {
                alert('Não foi possível guardar: o armazenamento local está cheio ou indisponível neste navegador.');
                return false;
            }
        }

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
            document.getElementById('draft-name-input').value = '';
            renderDraftsList();
            new bootstrap.Modal(document.getElementById('draftsModal')).show();
        }

        function renderDraftsList() {
            const drafts = getDrafts().sort((a, b) => b.savedAt.localeCompare(a.savedAt));
            const list = document.getElementById('drafts-list');
            const empty = document.getElementById('drafts-empty');
            if (!drafts.length) {
                list.innerHTML = '';
                empty.style.display = 'block';
                return;
            }
            empty.style.display = 'none';
            list.innerHTML = drafts.map(d => {
                const typeLabel = d.type === 'letter' ? 'Carta' : 'Currículo';
                const date = new Date(d.savedAt).toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' });
                return `
                    <div class="draft-item">
                        <span class="badge text-bg-secondary">${typeLabel}</span>
                        <span class="draft-name">${d.name}</span>
                        <span class="draft-meta">${date}</span>
                        <button class="btn btn-sm btn-outline-primary" onclick="loadDraft('${d.id}')"><i class="fa-solid fa-folder-open"></i></button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteDraft('${d.id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>`;
            }).join('');
        }

        function saveCurrentAsDraft() {
            const nameInput = document.getElementById('draft-name-input');
            let name = nameInput.value.trim();
            if (!name) {
                name = (currentApp === 'letter' ? 'Carta' : 'CV') + ' - ' + new Date().toLocaleDateString('pt-PT');
            }
            const rootId = currentApp === 'letter' ? 'letter-root' : 'cv-root';
            const root = document.getElementById(rootId);
            const draft = {
                id: 'd' + Date.now(),
                name,
                type: currentApp,
                savedAt: new Date().toISOString(),
                template: root.dataset.template || null,
                themeVars: getThemeVars(),
                html: root.innerHTML
            };
            const drafts = getDrafts();
            drafts.push(draft);
            if (saveDrafts(drafts)) {
                currentDraftId = draft.id;
                nameInput.value = '';
                renderDraftsList();
            }
        }

        function loadDraft(id) {
            const drafts = getDrafts();
            const draft = drafts.find(d => d.id === id);
            if (!draft) return;
            if (!confirm('Carregar "' + draft.name + '"? As alterações não guardadas no documento atual serão perdidas.')) return;

            switchApp(draft.type);
            const rootId = draft.type === 'letter' ? 'letter-root' : 'cv-root';
            const root = document.getElementById(rootId);
            root.innerHTML = draft.html;
            if (draft.template) root.setAttribute('data-template', draft.template);
            applyThemeVars(draft.themeVars);
            currentDraftId = draft.id;
            bootstrap.Modal.getInstance(document.getElementById('draftsModal'))?.hide();
        }

        function deleteDraft(id) {
            if (!confirm('Remover este rascunho? Esta ação não pode ser desfeita.')) return;
            const drafts = getDrafts().filter(d => d.id !== id);
            saveDrafts(drafts);
            renderDraftsList();
        }

        function exportBackup() {
            const drafts = getDrafts();
            if (!drafts.length) { alert('Não há rascunhos para exportar.'); return; }
            const blob = new Blob([JSON.stringify(drafts, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'rascunhos_backup.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }

        function importBackup(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = e => {
                try {
                    const imported = JSON.parse(e.target.result);
                    if (!Array.isArray(imported)) throw new Error('formato inválido');
                    const existing = getDrafts();
                    const existingIds = new Set(existing.map(d => d.id));
                    const merged = existing.concat(imported.filter(d => !existingIds.has(d.id)));
                    if (saveDrafts(merged)) {
                        renderDraftsList();
                        alert('Rascunhos importados com sucesso.');
                    }
                } catch (err) {
                    alert('Não foi possível ler este ficheiro de cópia de segurança.');
                }
            };
            reader.readAsText(file);
            event.target.value = '';
        }

        /* =========================================================
           MODAL "SOBRE / APOIAR" — mostrado ao carregar a página
        ========================================================= */
        const ABOUT_SEEN_KEY = 'cvbuilder_hide_about';

        function openAboutModal() {
            new bootstrap.Modal(document.getElementById('aboutModal')).show();
        }

        function handleAboutClose() {
            const checkbox = document.getElementById('dont-show-again');
            if (checkbox && checkbox.checked) {
                localStorage.setItem(ABOUT_SEEN_KEY, '1');
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            let hide = false;
            try { hide = localStorage.getItem(ABOUT_SEEN_KEY) === '1'; } catch (e) { hide = false; }
            if (!hide) {
                setTimeout(() => { openAboutModal(); }, 300);
            }
        });

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
