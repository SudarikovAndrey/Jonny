/* Stable property sheet. Move live controls without cloning their handlers. */
(function(){
 const card=document.getElementById('card');
 function layout(){
  if(!card.classList.contains('illustrated-property'))return;
  const shop=card.querySelector('.shop');if(!shop)return;
  let body=shop.querySelector(':scope > .property-body');
  let foot=shop.querySelector(':scope > .property-actions');
  if(!body){
   body=document.createElement('div');body.className='property-body';
   foot=document.createElement('div');foot.className='property-actions';
   body.append(...shop.childNodes);shop.append(body,foot);
  }
  // The unified-upgrade decorator adds its button after the initial shop frame.
  // All selectors remain under .shop, and the original DOM nodes retain events.
  const actions=[...body.querySelectorAll('.buy,.uup-btn,.wide:has(button),.need')];
  for(const action of actions)foot.append(action);
  foot.hidden=!foot.children.length;
 }
 new MutationObserver(layout).observe(card,{childList:true,subtree:true});
 layout();
})();
