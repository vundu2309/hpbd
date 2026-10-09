const scenes=[...document.querySelectorAll('.scene')];
const progress=document.querySelector('.progress');
const dots=scenes.map((scene,i)=>{const dot=document.createElement('span');dot.className='dot'+(i===0?' current':'');progress.appendChild(dot);return dot;});
const back=document.getElementById('back'),gift=document.getElementById('gift'),blow=document.getElementById('blow'),cake=document.getElementById('cake');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let step=0,busy=false;
function resetGift(){gift.disabled=false;gift.classList.remove('opened');}
function resetCandle(){blow.disabled=false;cake.classList.remove('blown');cake.setAttribute('aria-label','Bánh sinh nhật có một ngọn nến đang sáng');}
function celebrate(){if(reduced.matches)return;const host=document.querySelector('.app');for(let i=0;i<26;i++){const item=document.createElement('span');item.className='particle';item.textContent=['♡','✧','✿'][i%3];item.setAttribute('aria-hidden','true');item.style.left=Math.random()*100+'%';item.style.animationDelay=Math.random()*.6+'s';host.appendChild(item);setTimeout(()=>item.remove(),3800);}}
function showScene(next){if(busy||next===step||next<0||next>=scenes.length)return;busy=true;const outgoing=scenes[step],incoming=scenes[next];outgoing.inert=true;outgoing.classList.remove('active');outgoing.classList.add('leaving');if(incoming.contains(gift))resetGift();if(incoming.contains(cake))resetCandle();incoming.hidden=false;incoming.inert=false;void incoming.offsetWidth;incoming.classList.add('active');step=next;dots.forEach((dot,i)=>dot.classList.toggle('current',i===step));document.getElementById('counter').textContent=(step+1)+' / '+scenes.length;back.disabled=step===0;document.getElementById('status').textContent='Bước '+(step+1)+' trên '+scenes.length;incoming.querySelector('h1,h2').focus({preventScroll:true});setTimeout(()=>{outgoing.hidden=true;outgoing.classList.remove('leaving');busy=false;},reduced.matches?0:600);}
document.querySelectorAll('[data-next]').forEach(button=>button.addEventListener('click',()=>showScene(step+1)));
back.addEventListener('click',()=>showScene(step-1));
gift.addEventListener('click',()=>{if(busy||!scenes[step].contains(gift)||gift.disabled)return;busy=true;gift.disabled=true;gift.classList.add('opened');celebrate();setTimeout(()=>{busy=false;showScene(step+1);},reduced.matches?0:850);});
blow.addEventListener('click',()=>{if(busy||!scenes[step].contains(cake)||blow.disabled)return;busy=true;blow.disabled=true;cake.classList.add('blown');cake.setAttribute('aria-label','Bánh sinh nhật, ngọn nến đã tắt');document.getElementById('status').textContent='Ngọn nến đã tắt. Mong điều ước của Hân thành hiện thực.';celebrate();setTimeout(()=>{busy=false;showScene(step+1);},reduced.matches?0:1000);});
document.getElementById('replay').addEventListener('click',()=>{if(busy)return;document.querySelectorAll('.particle').forEach(item=>item.remove());showScene(0);});
