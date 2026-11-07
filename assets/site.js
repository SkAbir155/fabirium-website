/* Fabirium website behaviour. Everything still works without it; this only makes it smarter. */
(function () {
  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // 1) "Get" buttons pick the right download for this device.
  var ua = navigator.userAgent;
  var device = /android/i.test(ua) ? 'android'
    : (/iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) ? 'ios'
    : 'desktop';
  document.querySelectorAll('[data-get]').forEach(function (a) {
    var href = a.getAttribute('data-' + device);
    if (!href) return;                                  // no version for this device: keep the "View" link
    a.href = href;
    a.classList.remove('view');
    var label = a.getAttribute('data-' + device + '-label') || 'Get';
    var note = a.getAttribute('data-' + device + '-note');
    a.innerHTML = label + (note ? '<small>' + note + '</small>' : '');
  });
  // On a product page, put this device's way to install first.
  var installs = [].slice.call(document.querySelectorAll('.install [data-for]'));
  var mine = installs.filter(function (b) { return b.getAttribute('data-for').split(' ').indexOf(device) >= 0; });
  if (mine.length) {
    installs.forEach(function (b) { b.classList.remove('btn-product'); b.classList.add('btn-ghost'); });
    mine.reverse().forEach(function (b) {
      b.classList.remove('btn-ghost'); b.classList.add('btn-product');
      b.parentNode.insertBefore(b, b.parentNode.firstChild);
    });
  }

  // 2) Store: tabs (All / Games / Apps) and search.
  var tabs = document.querySelectorAll('.tabs [data-tab]');
  var search = document.getElementById('storeSearch');
  function applyStore() {
    var tab = (document.querySelector('.tabs [aria-selected="true"]') || {}).getAttribute ? document.querySelector('.tabs [aria-selected="true"]').getAttribute('data-tab') : 'all';
    var q = search ? search.value.trim().toLowerCase() : '';
    var shown = 0;
    document.querySelectorAll('.store-section').forEach(function (sec) {
      var inTab = tab === 'all' || sec.getAttribute('data-kind') === tab;
      var visible = 0;
      sec.querySelectorAll('.app-row').forEach(function (row) {
        var ok = inTab && (!q || row.getAttribute('data-search').indexOf(q) >= 0);
        row.style.display = ok ? '' : 'none';
        if (ok) visible++;
      });
      sec.style.display = visible ? '' : 'none';
      shown += visible;
    });
    var empty = document.querySelector('.empty');
    if (empty) empty.style.display = shown ? 'none' : 'block';
  }
  function selectTab(name) {
    tabs.forEach(function (t) { t.setAttribute('aria-selected', t.getAttribute('data-tab') === name ? 'true' : 'false'); });
    applyStore();
  }
  if (tabs.length) {
    tabs.forEach(function (t) { t.addEventListener('click', function () { selectTab(t.getAttribute('data-tab')); history.replaceState(null, '', t.getAttribute('data-tab') === 'all' ? location.pathname : '#' + t.getAttribute('data-tab')); }); });
    if (search) search.addEventListener('input', applyStore);
    var fromHash = function () { var h = location.hash.replace('#', ''); selectTab(h === 'games' || h === 'apps' ? h : 'all'); };
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  // 3) Branches: on phones (no hover), a tap makes the branch's badge fill the whole screen for a moment,
  //    then opens that branch. With a mouse, the hover effect plays and the click goes straight there.
  var touch = window.matchMedia('(hover: none)').matches;
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.branch').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (!touch || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      var dot = el.querySelector('.badge-dot').getBoundingClientRect();
      var pop = document.createElement('div');
      pop.className = 'pop';
      pop.style.setProperty('--c', el.style.getPropertyValue('--c'));
      pop.style.setProperty('--x', (dot.left + dot.width / 2) + 'px');
      pop.style.setProperty('--y', (dot.top + dot.height / 2) + 'px');
      pop.innerHTML = '<div class="pop-inner">' + el.querySelector('.badge-dot').innerHTML +
        '<b>' + el.getAttribute('data-name') + '</b><span>' + el.getAttribute('data-what') + '</span></div>';
      document.body.appendChild(pop);
      requestAnimationFrame(function () { requestAnimationFrame(function () { pop.classList.add('go'); }); });
      setTimeout(function () { location.href = el.href; }, calm ? 150 : 650);
    });
  });
  // Coming back with the Back button: remove the coloured screen.
  window.addEventListener('pageshow', function () { document.querySelectorAll('.pop').forEach(function (p) { p.remove(); }); });
})();
