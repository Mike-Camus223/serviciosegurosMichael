document.addEventListener("DOMContentLoaded", function() {
  const marcaInput = document.getElementById("marca");
  const anioInput = document.getElementById("anio");
  const modeloInput = document.getElementById("modelo");
  const versionInput = document.getElementById("version");
  const poseeInput = document.getElementById("posee");
  const cpInput = document.getElementById("cp");
  const edadInput = document.getElementById("edad");
  const sexoInput = document.getElementById("sexo");
  const estadoInput = document.getElementById("estadoCivil");
  const nombreInput = document.getElementById("nombre");
  const telefonoInput = document.getElementById("telefono");
  const emailInput = document.getElementById("email");
  const form = document.getElementById("formFinal");
  let dataGlobal = null;

  // Traer la cotización guardada
  let ultima = localStorage.getItem("ultimaCotizacion");

  if (!ultima) {
    Swal.fire({
      icon: "warning",
      title: "No hay cotización previa",
      text: "Volviendo al inicio...",
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "../index.html";
    });
    return;
  }

  try {
    ultima = JSON.parse(ultima);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error en los datos",
      text: "No se pudo leer la cotización guardada."
    }).then(() => {
      window.location.href = "../index.html";
    });
    return;
  }
  fetch("../data/data.json")
    .then(res => res.json())
    .then(data => {
      dataGlobal = data;

      marcaInput.innerHTML = '<option value="">Seleccionar</option>';
      data.marcas.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = m;
        marcaInput.appendChild(opt);
      });

      anioInput.innerHTML = '<option value="">Seleccionar</option>';
      data.anios.forEach(a => {
        const opt = document.createElement("option");
        opt.value = a.anio;
        opt.textContent = a.anio;
        anioInput.appendChild(opt);
      });

      modeloInput.innerHTML = '<option value="">Seleccionar</option>';
      data.modelos.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.nombre;
        opt.textContent = m.nombre;
        modeloInput.appendChild(opt);
      });

      versionInput.innerHTML = '<option value="">Seleccionar</option>';
      data.versiones.forEach(v => {
        const opt = document.createElement("option");
        opt.value = v.nombre;
        opt.textContent = v.nombre;
        versionInput.appendChild(opt);
      });

      if (ultima) {
        marcaInput.value = ultima.marca || "";
        anioInput.value = ultima.anio || "";
        modeloInput.value = ultima.modelo || "";
        versionInput.value = ultima.version || "";
      }
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Error al cargar opciones",
        text: "No se pudo leer data.json"
      });
    });

  form.addEventListener("submit", function(event) {
  event.preventDefault();

  if (!poseeInput.value) {
    Swal.fire("Error", "Seleccioná si posees el vehículo", "error");
    return;
  }
  if (cpInput.value.trim().length < 3) {
    Swal.fire("Error", "Ingresá un código postal válido", "error");
    return;
  }
  if (!edadInput.value || parseInt(edadInput.value) < 18) {
    Swal.fire("Error", "Debes tener al menos 18 años", "error");
    return;
  }
  if (!sexoInput.value) {
    Swal.fire("Error", "Seleccioná el sexo", "error");
    return;
  }
  if (!estadoInput.value) {
    Swal.fire("Error", "Seleccioná el estado civil", "error");
    return;
  }
  if (nombreInput.value.trim().length < 3) {
    Swal.fire("Error", "Ingresá tu nombre completo", "error");
    return;
  }
  if (telefonoInput.value.trim().length < 6) {
    Swal.fire("Error", "Ingresá un teléfono válido", "error");
    return;
  }
  if (!emailInput.value.includes("@")) {
    Swal.fire("Error", "Ingresá un correo electrónico válido", "error");
    return;
  }

  const datosFinales = {
    marca: marcaInput.value,
    anio: anioInput.value,
    modelo: modeloInput.value,
    version: versionInput.value,
    posee: poseeInput.value,
    codigoPostal: cpInput.value,
    edad: edadInput.value,
    sexo: sexoInput.value,
    estadoCivil: estadoInput.value,
    nombre: nombreInput.value,
    telefono: telefonoInput.value,
    email: emailInput.value,
    fecha: new Date().toLocaleString()
  };

  const modal = document.getElementById("miniModal");
  const modalContenido = document.getElementById("modalContenido");

  modalContenido.innerHTML = `
    <p><strong>Nombre:</strong> ${datosFinales.nombre}</p>
    <p><strong>Vehículo:</strong> ${datosFinales.marca} ${datosFinales.modelo} (${datosFinales.anio}) - ${datosFinales.version}</p>
    <p><strong>Edad:</strong> ${datosFinales.edad}</p>
    <p><strong>Sexo:</strong> ${datosFinales.sexo}</p>
    <p><strong>Estado civil:</strong> ${datosFinales.estadoCivil}</p>
    <p><strong>Teléfono:</strong> ${datosFinales.telefono}</p>
    <p><strong>Email:</strong> ${datosFinales.email}</p>
    <p><strong>Código Postal:</strong> ${datosFinales.codigoPostal}</p>
  `;

  modal.classList.remove("pointer-events-none");
  setTimeout(() => {
    modal.classList.remove("opacity-0", "scale-95");
    modal.classList.add("opacity-100", "scale-100");
  }, 50);

  // Botones dentro del modal
  const btnEditar = document.getElementById("btnEditar");
  const btnConfirmar = document.getElementById("btnConfirmar");

  btnEditar.onclick = () => {
    modal.classList.add("opacity-0", "scale-95");
    modal.classList.remove("opacity-100", "scale-100");
    setTimeout(() => {
      modal.classList.add("pointer-events-none");
    }, 300);
  };

  btnConfirmar.onclick = () => {
    localStorage.setItem("datosFinales", JSON.stringify(datosFinales));
    modal.classList.add("opacity-0", "scale-95");
    setTimeout(() => {
      modal.classList.add("pointer-events-none");
    }, 300);

    Swal.fire({
      icon: "success",
      title: "Datos cargados",
      text: "Ahora completá el pago.",
      confirmButtonText: "Ir al checkout"
    }).then(() => {
      window.location.href = "checkout.html";
    });
  };
});

});
