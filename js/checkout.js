document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCheckout");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const tarjeta = document.getElementById("tarjeta").value.trim();
    const nombre = document.getElementById("nombreTarjeta").value.trim();
    const venc = document.getElementById("vencimiento").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (tarjeta.length < 16 || !nombre || venc.length < 4 || cvv.length < 3) {
      Swal.fire("Error", "Completá todos los campos correctamente", "error");
      return;
    }

    // Simular compra exitosa
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
