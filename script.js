// ===== Utilidades =====
}


// ===== Temporizador =====
function setTiempoMinutos(min){
const ms = Math.max(1, toInt(min))*60*1000;
state.temporizador = { ...state.temporizador, totalMs: ms, restanteMs: ms };
actualizarDisplayTiempo();
}
function actualizarDisplayTiempo(){
$('#displayTiempo').textContent = fmtMs(state.temporizador.restanteMs);
}
function tick(){
if(!state.temporizador.corriendo) return;
state.temporizador.restanteMs -= 1000;
if(state.temporizador.restanteMs <= 0){
state.temporizador.restanteMs = 0; state.temporizador.corriendo=false; clearInterval(state.temporizador.tick);
alert('¡Tiempo!');
}
actualizarDisplayTiempo();
}


// ===== Persistencia mínima =====
function guardarEstado(){
localStorage.setItem('cubos_f1', JSON.stringify(state));
}
function cargarEstado(){
const raw = localStorage.getItem('cubos_f1');
if(!raw) return false;
try{ Object.assign(state, JSON.parse(raw)); return true; }catch{ return false; }
}


// ===== Inicialización =====
window.addEventListener('DOMContentLoaded', ()=>{
// botones superiores
$('#btnImprimir')?.addEventListener('click', ()=>window.print());
$('#btnGuardarLS')?.addEventListener('click', guardarEstado);
$('#btnBorrarLS')?.addEventListener('click', ()=>{ localStorage.removeItem('cubos_f1'); alert('Guardado eliminado.'); });


// preparación
$('#btnAplicarPlantilla').addEventListener('click', aplicarPlantilla);
$('#btnReiniciar').addEventListener('click', reiniciarTabla);
$('#numGrupos').addEventListener('change', aplicarPlantilla);
$('#plantilla').addEventListener('change', aplicarPlantilla);


// temporizador
$('#minutos').addEventListener('change', ()=> setTiempoMinutos($('#minutos').value));
$('#btnIniciar').addEventListener('click', ()=>{
setTiempoMinutos($('#minutos').value);
if(state.temporizador.tick) clearInterval(state.temporizador.tick);
state.temporizador.corriendo = true;
state.temporizador.tick = setInterval(tick, 1000);
});
$('#btnPausar').addEventListener('click', ()=>{ state.temporizador.corriendo=false; });
$('#btnReanudar').addEventListener('click', ()=>{
if(state.temporizador.tick) clearInterval(state.temporizador.tick);
state.temporizador.corriendo=true; state.temporizador.tick=setInterval(tick,1000);
});
$('#btnFinalizar').addEventListener('click', ()=>{ state.temporizador.corriendo=false; clearInterval(state.temporizador.tick); alert('Juego finalizado'); });


// estado
if(!cargarEstado()) aplicarPlantilla();
actualizarDisplayTiempo();
});
