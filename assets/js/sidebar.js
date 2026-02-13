// assets/js/sidebar.js – Toggle au clic + actif auto

// A) Ouverture/fermeture au clic
(function(){
  document.querySelectorAll('li.has-flyout').forEach(function(group){
    var trigger = group.querySelector('.group-trigger');
    var panel   = group.querySelector('.expandedMenu');
    if (!trigger || !panel) return;

    function open(){ group.classList.add('open');  trigger.setAttribute('aria-expanded','true'); }
    function close(){ group.classList.remove('open'); trigger.setAttribute('aria-expanded','false'); }

    trigger.addEventListener('click', function(e){
      e.preventDefault();
      if (group.classList.contains('open')) close(); else open();
    });

    document.addEventListener('click', function(e){ if (!group.contains(e.target)) close(); });
    group.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });

    // Si un lien du panneau est 'actif' côté serveur, on ouvre au chargement
    if (panel.querySelector('a.active,[aria-current="page"]')) open();
  });
})();

// B) Recalcul de l'item actif (évite le "vert bloqué" sur un mauvais item)
(function(){
  var path = (window.location.pathname || '/').replace(/\/+/g,'/').replace(/\/$/,'');
  document.querySelectorAll('.menu > li > a.item').forEach(function(a){
    var href = (a.getAttribute('href')||'').replace(/\/$/,'');
    if (!href) return;
    var active = (path === href) || (href !== '/' && path.indexOf(href) === 0);
    a.classList.toggle('active', active);
  });
})();
document.addEventListener('DOMContentLoaded', () => {
  // Sélectionne tous les groupes à sous-menu
  const groups = document.querySelectorAll('.sidebar .has-flyout');

  groups.forEach(group => {
    const trigger = group.querySelector('.group-trigger');
    const panel   = group.querySelector('.expandedMenu');

    if (!trigger || !panel) return;

    // 1) Sécurité : s'assurer des attributs ARIA initiaux
    trigger.setAttribute('aria-controls', trigger.id || (trigger.id = `flyout-${Math.random().toString(36).slice(2)}`));
    panel.setAttribute('id', panel.id || `${trigger.id}-panel`);
    trigger.setAttribute('aria-expanded', trigger.getAttribute('aria-expanded') === 'true' ? 'true' : 'false');

    // 2) Gestion du clic (toggle)
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      // Option : si tu préfères gérer par classe sur <li>, décommente :
      // group.classList.toggle('open', !expanded);
    });

    // 3) (Optionnel) Fermer au clic hors du menu
    document.addEventListener('click', (e) => {
      if (!group.contains(e.target)) {
        trigger.setAttribute('aria-expanded', 'false');
        // group.classList.remove('open');
      }
    });

    // 4) (Optionnel) Navigation clavier : ouvrir avec Entrée/Espace
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
});
