// Script principal de la Dinámica de los Cubos

// Estado global
let estado = {
  materiales: [],
  cubos: [],
  eventos: [],
  observaciones: []
};

// Inicialización
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnImprimir")?.addEventListener("click", () => window.print());
  document.getElementById("btnGuardarLS")?.addEventListener("click", guardarEstado);
  document.getElementById("btnBorrarLS")?.addEventListener("click", borrarEstado);

  cargarEstado();
});

// Guardar en localStorage
function guardarEstado() {
  localStorage.setItem("dinamicaCubos", JSON.stringify(estado));
  alert("Guardado en este navegador.");
}

// Cargar de localStorage
function cargarEstado() {
  const datos = localStorage.getItem("dinamicaCubos");
  if (datos) {
    estado = JSON.parse(datos);
  }
}

// Borrar localStorage
function borrarEstado() {
  localStorage.removeItem("dinamicaCubos");
  alert("Datos eliminados del navegador.");
}
