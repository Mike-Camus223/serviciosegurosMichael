document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCheckout");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const tarjeta = document.getElementById("tarjeta").value.trim();
    const nombre = document.getElementById("nombreTarjeta").value.trim();
    const venc = document.getElementById("vencimiento").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    if (!/^\d{16}$/.test(tarjeta)) {
      Swal.fire("Error", "Número de tarjeta inválido (16 dígitos)", "error");
      return;
    }
    if (!nombre) {
      Swal.fire("Error", "Ingresá el nombre del titular", "error");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(venc)) {
      Swal.fire("Error", "Vencimiento inválido (MM/AA)", "error");
      return;
    }
    const mes = parseInt(venc.split("/")[0], 10);
    if (mes < 1 || mes > 12) {
      Swal.fire("Error", "Mes de vencimiento inválido", "error");
      return;
    }
    if (!/^\d{3}$/.test(cvv)) {
      Swal.fire("Error", "CVV inválido (3 dígitos)", "error");
      return;
    }
    const datosFinales = JSON.parse(localStorage.getItem("datosFinales")) || {};
    datosFinales.precioMensual = (Math.random() * 30000 + 20000).toFixed(2); // precio aleatorio

    localStorage.setItem("seguroComprado", JSON.stringify(datosFinales));

    Swal.fire({
      icon: "success",
      title: "Compra Exitosa",
      text: "Tu seguro fue contratado correctamente",
      confirmButtonText: "Ver mi panel"
    }).then(() => {
      window.location.href = "dashboard.html";
    });
  });
});
