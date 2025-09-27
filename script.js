// Estado global
let state = { equipos: [], eventos: [], timer: null, tiempoRestante: 0, activo: false };

// Inicialización
window.addEventListener('DOMContentLoaded', () => {
  renderTablaMateriales(6);
  document.getElementById('apply-template-btn').onclick = applyTemplate;
  document.getElementById('next-to-game-btn').onclick = gotoGame;
  document.getElementById('reset-game-btn').onclick = resetGame;
  document.getElementById('btnIniciar').onclick = iniciarTimer;
  document.getElementById('btnPausar').onclick = pausarTimer;
  document.getElementById('btnReanudar').onclick = reanudarTimer;
  document.getElementById('btnFinalizar').onclick = finalizarTimer;
  document.getElementById('btnAgregarEvento').onclick = agregarEvento;
  document.getElementById('btn-show-help').onclick = () => toggleModal(true);
  document.getElementById('btn-close-help').onclick = () => toggleModal(false);
});

function renderTablaMateriales(n) {
  const tbody = document.getElementById('materials-tbody');
  tbody.innerHTML = '';
  for (let i=1;i<=n;i++) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class='p-2 border'>Equipo ${i}</td>
      <td class='p-2 border'><input type='number' value='2' class='w-16 p-1 border rounded'></td>
      <td class='p-2 border'><input type='number' value='1' class='w-16 p-1 border rounded'></td>
      <td class='p-2 border'><input type='number' value='1' class='w-16 p-1 border rounded'></td>
      <td class='p-2 border'><input type='number' value='1' class='w-16 p-1 border rounded'></td>
      <td class='p-2 border'><input type='number' value='0' class='w-16 p-1 border rounded'></td>`;
    tbody.appendChild(tr);
  }
}

function applyTemplate(){
  const num = parseInt(document.getElementById('num-grupos').value);
  renderTablaMateriales(num);
}

function gotoGame(){
  document.getElementById('setup-screen').classList.remove('active');
  document.getElementById('game-screen').classList.add('active');
  renderResultados();
}

function resetGame(){
  state = { equipos: [], eventos: [], timer: null, tiempoRestante: 0, activo: false };
  location.reload();
}

// Temporizador
function iniciarTimer(){
  const min = parseInt(document.getElementById('minutos').value);
  state.tiempoRestante = min*60;
  state.activo = true;
  state.timer = setInterval(()=>{
    if (state.tiempoRestante<=0) { finalizarTimer(); return; }
    state.tiempoRestante--;
    renderTimer();
  },1000);
  renderTimer();
}
function pausarTimer(){
  clearInterval(state.timer);
  state.activo=false;
}
function reanudarTimer(){
  if (!state.activo && state.tiempoRestante>0){
    state.activo=true;
    state.timer=setInterval(()=>{
      if (state.tiempoRestante<=0) { finalizarTimer(); return; }
      state.tiempoRestante--;renderTimer();
    },1000);
  }
}
function finalizarTimer(){
  clearInterval(state.timer);
  state.activo=false;
  document.getElementById('game-screen').classList.remove('active');
  document.getElementById('debrief-screen').classList.add('active');
  renderFinalResults();
}
function renderTimer(){
  const m=Math.floor(state.tiempoRestante/60);
  const s=state.tiempoRestante%60;
  document.getElementById('timer-display').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// Resultados
function renderResultados(){
  const tbody=document.getElementById('results-tbody');
  tbody.innerHTML='';
  const num=parseInt(document.getElementById('num-grupos').value);
  for (let i=1;i<=num;i++){
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td class='p-2 border'>Equipo ${i}</td>
      <td class='p-2 border'><input type='number' value='0' class='w-16 p-1 border rounded'></td>
      <td class='p-2 border'><input type='number' value='0' class='w-16 p-1 border rounded'></td>
      <td class='p-2 border'><input type='number' value='0' class='w-16 p-1 border rounded'></td>
      <td class='p-2 border'>0</td>`;
    tbody.appendChild(tr);
  }
}

// Eventos
function agregarEvento(){
  const tipo=document.getElementById('evtTipo').value;
  const de=document.getElementById('evtDe').value;
  const a=document.getElementById('evtA').value;
  const desc=document.getElementById('evtDescripcion').value;
  const texto=`${tipo}: ${de} → ${a} (${desc})`;
  state.eventos.push(texto);
  const li=document.createElement('li');li.textContent=texto;
  document.getElementById('listaEventos').appendChild(li);
}

// Resultados finales
function renderFinalResults(){
  const cont=document.getElementById('final-results');
  cont.innerHTML='';
  const filas=document.querySelectorAll('#results-tbody tr');
  filas.forEach(f=>{
    const tds=f.querySelectorAll('td');
    const nombre=tds[0].textContent;
    const cubos=tds[1].querySelector('input').value;
    const calidad=tds[2].querySelector('input').value;
    const coop=tds[3].querySelector('input').value;
    const total=parseInt(cubos)+parseInt(calidad)+parseInt(coop);
    const card=document.createElement('div');
    card.className='card p-4';
    card.innerHTML=`<h3 class='font-bold mb-1'>${nombre}</h3>
      <p>Cubos: ${cubos}</p><p>Calidad: ${calidad}</p><p>Coop: ${coop}</p><p><strong>Total: ${total}</strong></p>`;
    cont.appendChild(card);
  });
}

// Modal
function toggleModal(show){
  const modal=document.getElementById('help-modal');
  if (show) modal.classList.remove('hidden');
  else modal.classList.add('hidden');
}
