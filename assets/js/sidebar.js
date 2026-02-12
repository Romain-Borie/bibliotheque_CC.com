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
