const historialDiv = document.getElementById("historial");

// Guardar nueva cotización
const guardarEnHistorial = (nuevaCotizacion) => {
  const historial = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
  historial.push(nuevaCotizacion);
  localStorage.setItem("historialCotizaciones", JSON.stringify(historial));
  renderHistorial();
};

// Renderizar historial
const renderHistorial = () => {
  const historial = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];

  if (historial.length === 0) {
    historialDiv.innerHTML = `<p class="text-white text-sm">No hay cotizaciones guardadas aún.</p>`;
    return;
  }

  historialDiv.innerHTML = "";
  historial.forEach((item, index) => {
    // Evita errores si algún campo viene undefined
    const costo = Number(item?.costoSeguro) || 0;
    const valor = Number(item?.valorAuto) || 0;

    const card = document.createElement("div");
    card.className = "bg-white p-4 border rounded shadow-sm flex justify-between items-center";

    card.innerHTML = `
      <div>
        <p class="font-semibold text-gray-800">${item.marca || "Marca desconocida"} ${item.modelo || ""} (${item.anio || "?"})</p>
        <p class="text-sm text-gray-600">Versión: ${item.version || "N/A"}</p>
        <p class="text-sm text-gray-600">Seguro: $${costo.toLocaleString("es-AR")}</p>
      </div>
      <div class="flex gap-2">
        <button data-index="${index}" class="btnVer bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Ver</button>
        <button data-index="${index}" class="btnBorrar bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Borrar</button>
      </div>
    `;
    historialDiv.appendChild(card);
  });

  // Eventos botones
  document.querySelectorAll(".btnVer").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = e.target.dataset.index;
      const item = historial[idx];
      mostrarModalHistorial(item);
    });
  });

  document.querySelectorAll(".btnBorrar").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = e.target.dataset.index;
      borrarDelHistorial(idx);
    });
  });
};

// Eliminar del historial
const borrarDelHistorial = (index) => {
  const historial = JSON.parse(localStorage.getItem("historialCotizaciones")) || [];
  historial.splice(index, 1);
  localStorage.setItem("historialCotizaciones", JSON.stringify(historial));
  renderHistorial();
};

// Modal de detalles
const mostrarModalHistorial = (item) => {
  const costo = Number(item?.costoSeguro) || 0;
  const valor = Number(item?.valorAuto) || 0;

  const modal = document.createElement("div");
  modal.innerHTML = `
    <div id="miniModalHistorial" class="fixed inset-0 flex items-center justify-center bg-black/40 opacity-0 scale-95 transition-all duration-300">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h2 class="text-xl font-bold text-blue-700 mb-3">Detalles de la cotización</h2>
        <div class="text-left text-sm text-gray-700 space-y-1 mb-4">
          <p><strong>Marca:</strong> ${item.marca}</p>
          <p><strong>Modelo:</strong> ${item.modelo}</p>
          <p><strong>Versión:</strong> ${item.version}</p>
          <p><strong>Año:</strong> ${item.anio}</p>
          <p><strong>Valor del auto:</strong> $ ${valor.toLocaleString("es-AR")}</p>
          <p><strong>Seguro mensual:</strong> $ ${costo.toLocaleString("es-AR")}</p>
        </div>
        <button id="cerrarModal" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Cerrar</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalEl = document.getElementById("miniModalHistorial");
  setTimeout(() => {
    modalEl.classList.remove("opacity-0", "scale-95");
    modalEl.classList.add("opacity-100", "scale-100");
  }, 50);

  document.getElementById("cerrarModal").addEventListener("click", () => {
    modalEl.classList.add("opacity-0", "scale-95");
    setTimeout(() => modal.remove(), 0);
  });
};

// Mostrar historial al cargar
renderHistorial();
