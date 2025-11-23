// app.js — minimal webapp for Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // optional

const btn = document.getElementById('tapBtn');
const bar = document.getElementById('progressBar');
const status = document.getElementById('status');

let progress = 0;

function updateUI(){
  bar.style.width = progress + '%';
  status.innerText = `Distance to Earth: ${100 - Math.round(progress)}%`;
}

btn.addEventListener('click', ()=>{
  progress = Math.min(100, progress + 2); // each tap +2%
  updateUI();
  // Example: inform bot about progress
  fetch(`https://api.telegram.org/bot<PUT_BOT_TOKEN_HERE>/sendMessage`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      chat_id: tg.initDataUnsafe.user.id,
      text: `Player tapped. Progress: ${progress}%`
    })
  }).catch(()=>{});
});

updateUI();
