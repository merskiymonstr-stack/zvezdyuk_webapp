(() => {
  const startBtn = document.getElementById('start-btn');
  const gameArea = document.getElementById('game-area');
  const startScreen = document.getElementById('start-screen');
  const fuelEl = document.getElementById('fuel');
  const levelNum = document.getElementById('level-num');
  const character = document.getElementById('character');
  const earth = document.getElementById('earth');
  const boostBtn = document.getElementById('boost');
  const brakeBtn = document.getElementById('brake');
  const sendBtn = document.getElementById('send-score');
  const msg = document.getElementById('msg');

  let fuel = 100;
  let level = 1;
  let approaching = 0;
  let engineOn = false;
  let interval = null;

  function showMsg(t){
    msg.textContent = t;
    msg.classList.remove('hidden');
    setTimeout(()=>msg.classList.add('hidden'), 3000);
  }

  function updateUI(){
    fuelEl.textContent = Math.max(0, Math.round(fuel));
    levelNum.textContent = level;
    character.style.transform = 'translateY(' + ( -approaching/6 ) + 'px)';
    if(approaching > 30) earth.classList.remove('hidden');
    if(approaching >= 100){
      showMsg('Landed! Level cleared 🎉');
      stopLoop();
    }
  }

  function loopTick(){
    if(engineOn && fuel > 0 && approaching < 100){
      fuel -= 0.6;
      approaching += 1.5 + (level*0.2);
    } else if(!engineOn && fuel < 100 && approaching < 100){
      fuel += 0.25;
    }
    updateUI();
  }

  function startLoop(){
    if(interval) clearInterval(interval);
    interval = setInterval(loopTick, 100);
  }
  function stopLoop(){ if(interval) clearInterval(interval); interval = null; engineOn=false; }

  startBtn.addEventListener('click', ()=>{
    startScreen.classList.add('hidden');
    gameArea.classList.remove('hidden');
    startLoop();
    showMsg('Game started. Boost to approach Earth!');
  });

  boostBtn.addEventListener('mousedown', ()=>{ engineOn = true; });
  boostBtn.addEventListener('mouseup', ()=>{ engineOn = false; });
  boostBtn.addEventListener('touchstart', ()=>{ engineOn = true; });
  boostBtn.addEventListener('touchend', ()=>{ engineOn = false; });

  brakeBtn.addEventListener('click', ()=>{
    engineOn = false;
    fuel += 5;
    showMsg('Braking. Fuel +5');
    updateUI();
  });

  sendBtn.addEventListener('click', ()=>{
    const score = Math.round(approaching);
    showMsg('Sending result: ' + score);
    try{
      if(window.TelegramWebApp || window.Telegram){
        const tg = window.Telegram ? window.Telegram.WebApp : window.TelegramWebApp;
        tg.sendData(JSON.stringify({ type:'score', score: score }));
      } else {
        console.log('Not in Telegram context:', {score});
      }
    }catch(e){
      console.warn('Send failed', e);
    }
  });

  setInterval(()=>updateUI(), 300);
})();
