document.addEventListener("DOMContentLoaded", () => {
  const selects = {
    marca: document.getElementById("marca"),
    anio: document.getElementById("anio"),
    modelo: document.getElementById("modelo"),
    seguro: document.getElementById("seguro")
  };

  const btnCotizar = document.querySelector("button");
  let dataGlobal = {};

  // Cargar datos del JSON
  fetch("./data/data.json")
    .then(res => res.json())
    .then(data => {
      dataGlobal = data;

      data.marcas.forEach(marca => {
        const option = document.createElement("option");
        option.value = marca;
        option.textContent = marca;
        selects.marca.appendChild(option);
      });

      data.anios.forEach(a => {
        const option = document.createElement("option");
        option.value = a.anio;
        option.textContent = a.anio;
        selects.anio.appendChild(option);
      });

      data.modelos.forEach(m => {
        const option = document.createElement("option");
        option.value = m.nombre;
        option.textContent = m.nombre;
        selects.modelo.appendChild(option);
      });

      data.versiones.forEach(v => {
        const option = document.createElement("option");
        option.value = v.nombre;
        option.textContent = v.nombre;
        selects.seguro.appendChild(option);
      });
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Error al cargar datos",
        text: "Verifica el archivo data.json"
      });
    });

  // Evento COTIZAR
  btnCotizar.addEventListener("click", e => {
    e.preventDefault();

    const marca = selects.marca.value;
    const anio = parseInt(selects.anio.value);
    const modelo = selects.modelo.value;
    const version = selects.seguro.value;

    if (!marca || !anio || !modelo || !version) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor selecciona todas las opciones."
      });
      return;
    }

    const modeloInfo = dataGlobal.modelos.find(m => m.nombre === modelo);
    const versionInfo = dataGlobal.versiones.find(v => v.nombre === version);
    const anioInfo = dataGlobal.anios.find(a => a.anio === anio);

    if (!modeloInfo || !versionInfo || !anioInfo) {
      Swal.fire({
        icon: "error",
        title: "Error en los datos",
        text: "No se pudo calcular la cotización correctamente."
      });
      return;
    }

    const valorAuto = modeloInfo.precioBase * versionInfo.multiplicador * anioInfo.factor;
    const costoSeguro = valorAuto * 0.05;

    const resultado = {
      marca,
      modelo,
      version,
      anio,
      valorAuto,
      costoSeguro: Math.round(costoSeguro)
    };

    localStorage.setItem("ultimaCotizacion", JSON.stringify(resultado));

    // Mostrar mini modal (NO SweetAlert)
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = 
    `<div id="miniModal" class="opacity-0 scale-95 transition-all duration-500 ease-out 
          bg-white border border-gray-300 shadow-lg rounded-lg p-6 mt-4 w-full max-w-lg mx-auto">
        <h2 class="text-2xl font-bold text-blue-700 mb-2">Cotización Realizada</h2>
        <p><b>Marca:</b> ${marca}</p>
        <p><b>Modelo:</b> ${modelo}</p>
        <p><b>Versión:</b> ${version}</p>
        <p><b>Año:</b> ${anio}</p>
        <hr class="my-2">
        <p><b>Valor estimado del vehículo:</b> $${valorAuto.toLocaleString("es-AR")}</p>
        <p><b>Costo del seguro mensual:</b> 
          <span class="text-green-600 font-bold">$${Math.round(costoSeguro).toLocaleString("es-AR")}</span>
        </p>
        <div class="text-center mt-4 flex justify-center gap-4">
  <a href="pages/formulario.html" 
    class="inline-block text-sm text-blue-500 hover:underline">
    Asegurar ahora
  </a>
  <button id="btnGuardar" 
    class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
    Guardar
  </button>
</div>

      </div>`;

    // Animar aparición
    setTimeout(() => {
      const modal = document.getElementById("miniModal");
      modal.classList.remove("opacity-0", "scale-95");
      modal.classList.add("opacity-100", "scale-100");
    }, 50);

// Evento del botón GUARDAR
setTimeout(() => {
  const btnGuardar = document.getElementById("btnGuardar");
  if (btnGuardar) {
    btnGuardar.addEventListener("click", () => {
  // Aseguramos que los datos sean numéricos y estén completos
  const cotizacionCompleta = {
    marca: resultado.marca,
    modelo: resultado.modelo,
    version: resultado.version,
    anio: resultado.anio,
    valorAuto: Number(resultado.valorAuto) || 0,
    costoSeguro: Number(resultado.costoSeguro) || 0
  };

  guardarEnHistorial(cotizacionCompleta);

  Swal.fire({
    icon: "success",
    title: "Cotización guardada",
    text: "Tu cotización se añadió al historial.",
    timer: 1500,
    showConfirmButton: false
  });

  renderHistorial(); // 🔁 refresca el historial en el momento
});

  }
}, 100);


  });
});
