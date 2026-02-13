// assets/js/sidebar.js — gestion des sous-menus (une seule logique)
document.addEventListener('DOMContentLoaded', () => {
  const groups = document.querySelectorAll('.sidebar .has-flyout');

  groups.forEach(group => {
    const trigger = group.querySelector('.group-trigger');
    const panel   = group.querySelector('.expandedMenu');
    if (!trigger || !panel) return;

    // Assainir l'état initial
    if (trigger.getAttribute('aria-expanded') !== 'true') {
      trigger.setAttribute('aria-expanded', 'false');
    }

    // Lier le bouton au panneau (ARIA)
    if (!trigger.id) trigger.id = `flyout-${Math.random().toString(36).slice(2)}`;
    if (!panel.id) panel.id = `${trigger.id}-panel`;
    trigger.setAttribute('aria-controls', panel.id);

    // Toggle au clic
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));

      // (Option) synchroniser une classe .open sur <li>
      group.classList.toggle('open', !expanded);
    });

    // Fermer si clic en dehors
    document.addEventListener('click', (e) => {
      if (!group.contains(e.target)) {
        trigger.setAttribute('aria-expanded', 'false');
        group.classList.remove('open');
      }
    });

    // Accessibilité clavier
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      } else if (e.key === 'Escape') {
        trigger.setAttribute('aria-expanded', 'false');
        group.classList.remove('open');
        trigger.focus();
      }
    });

    // Ouvrir automatiquement si un lien du panneau est actif
    const hasActive = panel.querySelector('a.active, a[aria-current="page"]');
    if (hasActive) {
      trigger.setAttribute('aria-expanded', 'true');
      group.classList.add('open');
    }
  });

  // Mise à jour de l'item actif de niveau 1
  const path = (window.location.pathname || '/').replace(/\/+/g, '/').replace(/\/$/, '');
  document.querySelectorAll('.menu > li > a.item').forEach((a) => {
    const href = (a.getAttribute('href') || '').replace(/\/$/, '');
    if (!href) return;
    const active = (path === href) || (href !== '/' && path.indexOf(href) === 0);
    a.classList.toggle('active', active);
  });
});
