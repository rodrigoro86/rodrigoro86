'use strict';
(function(){
  const doc = document.documentElement;
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  function setYear(){ $('#year').textContent = String(new Date().getFullYear()); }

  function applyStoredTheme(){
    try{
      const stored = localStorage.getItem('theme');
      if(stored === 'dark') doc.classList.add('theme-dark');
      if(stored === 'light') doc.classList.remove('theme-dark');
    }catch(_){}
  }

  function initThemeToggle(){
    applyStoredTheme();
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(!localStorage.getItem('theme') && prefersDark){ doc.classList.add('theme-dark'); }
    const btn = $('#theme-toggle');
    if(btn){
      btn.addEventListener('click', () => {
        const isDark = doc.classList.toggle('theme-dark');
        try{ localStorage.setItem('theme', isDark ? 'dark' : 'light'); }catch(_){/* ignore */}
      });
    }
  }

  async function loadProfile(){
    try{
      const res = await fetch('data/profile.json', { cache: 'no-store' });
      if(!res.ok) throw new Error('Erro ao carregar profile.json');
      const data = await res.json();
      populateProfile(data);
    }catch(err){
      console.warn('[portfolio] usando conteúdo padrão. Motivo:', err && err.message ? err.message : err);
      const fallback = {
        name: 'Seu Nome',
        role: 'Sua Profissão (ex: Desenvolvedor Frontend)',
        location: 'Cidade, País',
        about: 'Breve bio sobre você. Substitua este texto em data/profile.json.',
        email: 'seu@email.com',
        phone: '+55 (00) 00000-0000',
        social: [
          { label: 'LinkedIn', url: 'https://linkedin.com/in/seuusuario' },
          { label: 'GitHub', url: 'https://github.com/seuusuario' }
        ],
        skills: [
          { name: 'JavaScript', level: 80 },
          { name: 'TypeScript', level: 70 },
          { name: 'React', level: 75 }
        ],
        experience: [
          { company: 'Empresa Exemplo', role: 'Cargo', start: '2023', end: 'Atual', summary: 'Responsável por entregas em frontend e colaboração com times.' }
        ],
        projects: [
          { name: 'Projeto A', description: 'Breve descrição do projeto.', tags: ['React', 'API'], link: '#', source: '#' }
        ]
      };
      populateProfile(fallback);
    }
  }

  function text(el, value){ if(el && value){ el.textContent = value; } }

  function populateProfile(p){
    text($('#brand-name'), p.name);
    text($('#hero-name'), p.name);
    text($('#hero-role'), p.role);
    text($('#hero-location'), p.location);
    text($('#about-text'), p.about);
    text($('#footer-name'), p.name);
    document.title = `Portfólio — ${p.name}`;

    renderSkills(p.skills);
    renderExperience(p.experience);
    renderProjects(p.projects);
    renderContact(p);
  }

  function renderSkills(skills){
    const list = $('#skills-list');
    if(!list) return;
    list.innerHTML = '';
    (skills || []).forEach(s => {
      const li = document.createElement('li');
      li.className = 'skill';
      li.innerHTML = `
        <p class="skill-name"><span>${escapeHtml(s.name)}</span><span>${Number(s.level||0)}%</span></p>
        <div class="bar"><span style="width:${Number(s.level||0)}%"></span></div>
      `;
      list.appendChild(li);
    });
  }

  function renderExperience(items){
    const wrap = $('#experience-list');
    if(!wrap) return;
    wrap.innerHTML = '';
    (items || []).forEach(it => {
      const div = document.createElement('div');
      div.className = 'exp';
      div.innerHTML = `
        <h3>${escapeHtml(it.role||'Cargo')} — ${escapeHtml(it.company||'Empresa')}</h3>
        <p class="periodo">${escapeHtml(it.start||'')} — ${escapeHtml(it.end||'')}</p>
        <p>${escapeHtml(it.summary||'')}</p>
      `;
      wrap.appendChild(div);
    });
  }

  function renderProjects(projects){
    const grid = $('#projects-grid');
    if(!grid) return;
    grid.innerHTML = '';
    (projects || []).forEach(p => {
      const card = document.createElement('article');
      card.className = 'project';
      const tags = (p.tags||[]).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
      const links = `
        ${p.link ? `<a href="${escapeAttr(p.link)}" target="_blank" rel="noopener noreferrer">Demo</a>` : ''}
        ${p.source ? `<a href="${escapeAttr(p.source)}" target="_blank" rel="noopener noreferrer">Código</a>` : ''}
      `;
      card.innerHTML = `
        <h3>${escapeHtml(p.name||'Projeto')}</h3>
        <p>${escapeHtml(p.description||'')}</p>
        <div class="tags">${tags}</div>
        <div class="links">${links}</div>
      `;
      grid.appendChild(card);
    });
  }

  function renderContact(p){
    const ul = $('#contact-list');
    if(!ul) return;
    ul.innerHTML = '';
    if(p.email){ addContact(ul, 'Email', `mailto:${p.email}`, p.email); }
    if(p.phone){ addContact(ul, 'Telefone', `tel:${p.phone.replace(/\D/g,'')}`, p.phone); }
    (p.social||[]).forEach(s => addContact(ul, s.label, s.url, s.url));
  }

  function addContact(ul, label, href, text){
    const li = document.createElement('li');
    li.innerHTML = `<a href="${escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}: ${escapeHtml(text)}</a>`;
    ul.appendChild(li);
  }

  function escapeHtml(str){
    return String(str||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
  }
  function escapeAttr(str){
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  // init
  setYear();
  initThemeToggle();
  loadProfile();
})();