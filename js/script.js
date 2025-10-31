$(document).ready(function () {
  // --- Marca el enlace activo del navbar ---
  const path = window.location.pathname.split("/").pop();
  $(".nav-link").each(function () {
    if ($(this).attr("href") === path) {
      $(this).addClass("active fw-bold");
    }
  });

  // --- Manejador del formulario de contacto ---
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    // Capturar los valores
    const asunto = $("#asunto").val();
    const nombre = $("#nombre").val().trim();
    const telefono = $("#telefono").val().trim();
    const email = $("#email").val().trim();
    const mensaje = $("#mensaje").val().trim();

    // Validaciones básicas
    if (!asunto) {
      alert("Por favor selecciona un motivo de contacto.");
      return;
    }

    if (nombre.length < 3) {
      alert("Por favor ingresa tu nombre completo.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor ingresa un correo válido.");
      return;
    }

    if (telefono.length < 8) {
      alert("Por favor ingresa un teléfono válido.");
      return;
    }

    if (mensaje.length < 10) {
      alert("El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    // Si todo está correcto:
    enviarMensaje({ asunto, nombre, telefono, email, mensaje });
  });

  // --- Envío AJAX al servidor ---
  function enviarMensaje(datos) {
    $.ajax({
      url: "/enviar-correo",
      method: "POST",
      data: datos,
      success: function () {
        $("#dialog").dialog({
          modal: true,
          title: "Mensaje enviado",
          buttons: {
            Cerrar: function () {
              $(this).dialog("close");
            },
          },
        });
        $("#contactForm")[0].reset();
      },
      error: function () {
        alert("Ocurrió un error al enviar el mensaje. Intenta nuevamente.");
      },
    });
  }

  // --- Animaciones al hacer scroll ---
  const animElements = document.querySelectorAll("[data-animate]");
  window.addEventListener("scroll", () => {
    animElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add("active");
    });
  });
});
