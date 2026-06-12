async function render() {
  const data = await (await fetch('./content.json')).json();
  const deck = document.getElementById('deck');
  const tpl = document.getElementById('slide-tpl');
  (data.slides || []).forEach((s) => {
    const node = tpl.content.firstElementChild.cloneNode(true);
    const img = node.querySelector('.slide-bg');
    if (s.image) { img.src = s.image; img.alt = s.headline || ''; } else { img.remove(); }
    node.querySelector('.slide-headline').textContent = s.headline || '';
    node.querySelector('.slide-sub').textContent = s.sub || '';
    deck.appendChild(node);
  });
  const cta = document.getElementById('cta');
  cta.textContent = (data.cta && data.cta.label) || '';
  if (data.cta && data.cta.href) cta.href = data.cta.href;
}
render();
