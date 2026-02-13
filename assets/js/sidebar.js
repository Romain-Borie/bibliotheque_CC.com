// assets/js/sidebar.js — sous-menus via délégation d'événements
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  // 1) Click n'importe où dans la sidebar : on gère si c'est un trigger
  sidebar.addEventListener('click', (e) => {
    const trigger = e.target.closest('.group-trigger');
    if (!trigger || !sidebar.contains(trigger)) return; // click ailleurs

    e.preventDefault();
    const group = trigger.closest('.has-flyout');
    const panel = group?.querySelector('.expandedMenu');
    if (!group || !panel) return;

    // init ARIA si besoin
    if (!trigger.id) trigger.id = `flyout-${Math.random().toString(36).slice(2)}`;
    if (!panel.id)   panel.id   = `${trigger.id}-panel`;
    trigger.setAttribute('aria-controls', panel.id);

    // toggle
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    group.classList.toggle('open', !expanded);

    // (option) ne laisser qu'un seul ouvert à la fois
    sidebar.querySelectorAll('.has-flyout.open').forEach(li => {
      if (li !== group) {
        li.classList.remove('open');
        const t = li.querySelector('.group-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 2) Fermer si clic hors de la sidebar
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target)) {
      sidebar.querySelectorAll('.has-flyout.open').forEach(li => {
        li.classList.remove('open');
        const t = li.querySelector('.group-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 3) Accessibilité clavier (sur la sidebar entière)
  sidebar.addEventListener('keydown', (e) => {
    const trigger = e.target.closest('.group-trigger');
    if (!trigger) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      trigger.click();
    } else if (e.key === 'Escape') {
      const group = trigger.closest('.has-flyout');
      group?.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }
  });

  // 4) Activer l'item vert de niveau 1 (et auto-ouvrir le groupe s'il contient la page courante)
  try {
    const path = (window.location.pathname || '/').replace(/\/+/g, '/').replace(/\/$/, '');
    sidebar.querySelectorAll('.menu > li > a.item').forEach((a) => {
      const href = (a.getAttribute('href') || '').replace(/\/$/, '');
      if (!href) return;
      const active = (path === href) || (href !== '/' && path.indexOf(href) === 0);
      a.classList.toggle('active', active);
    });

    // auto-open si un lien du panneau est "actif"
    sidebar.querySelectorAll('.has-flyout').forEach((group) => {
      const panel = group.querySelector('.expandedMenu');
      if (panel?.querySelector('a.active, a[aria-current="page"]')) {
        group.classList.add('open');
        const t = group.querySelector('.group-trigger');
        if (t) t.setAttribute('aria-expanded', 'true');
      }
    });
  } catch (err) {
    // Si un sélecteur invalide plantait ici, on n'empêche pas l'ouverture des sous-menus
    console.error('[sidebar] active-state error:', err);
  }
});


