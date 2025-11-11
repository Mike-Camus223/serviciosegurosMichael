document.addEventListener("DOMContentLoaded", () => {
  const btnHistorial = document.getElementById("btnHistorial");
  const btnSalir = document.getElementById("btnSalir");
  const contenido = document.getElementById("contenido");

  btnHistorial.addEventListener("click", () => {
    const seguro = JSON.parse(localStorage.getItem("seguroComprado"));

    if (!seguro) {
      Swal.fire("Sin historial", "No tenés seguros contratados aún.", "info");
      return;
    }

    contenido.innerHTML = `
      <h2 class="text-xl font-bold text-blue-700 mb-4">Historial de Seguros</h2>
      <div class="bg-white shadow-md rounded-lg p-4">
        <p><strong>Nombre:</strong> ${seguro.nombre}</p>
        <p><strong>Vehículo:</strong> ${seguro.marca} ${seguro.modelo} (${seguro.anio})</p>
        <p><strong>Versión:</strong> ${seguro.version}</p>
        <p><strong>Precio mensual:</strong> $${seguro.precioMensual}</p>
        <p><strong>Correo:</strong> ${seguro.email}</p>
        <p><strong>Fecha de contratación:</strong> ${seguro.fecha || "Hoy"}</p>
        <button id="btnVerMas" class="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Ver Detalles</button>
      </div>
    `;

    document.getElementById("btnVerMas").addEventListener("click", () => {
      Swal.fire({
        title: "Detalles del Seguro",
        html: `
          <p><b>Marca:</b> ${seguro.marca}</p>
          <p><b>Modelo:</b> ${seguro.modelo}</p>
          <p><b>Versión:</b> ${seguro.version}</p>
          <p><b>Precio mensual:</b> $${seguro.precioMensual}</p>
          <p><b>Email:</b> ${seguro.email}</p>
          <p><b>Estado Civil:</b> ${seguro.estadoCivil}</p>
          <p><b>Edad:</b> ${seguro.edad}</p>
        `,
        confirmButtonText: "Cerrar"
      });
    });
  });

  btnSalir.addEventListener("click", () => {
    Swal.fire({
      icon: "question",
      title: "¿Cerrar sesión?",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar"
    }).then((r) => {
      if (r.isConfirmed) {
        localStorage.removeItem("seguroComprado");
        window.location.href = "../index.html";
      }
    });
  });
});
