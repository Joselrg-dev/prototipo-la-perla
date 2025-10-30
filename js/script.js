$(document).ready(function () {
  // Marca el enlace activo del navbar
  const path = window.location.pathname.split("/").pop();
  $(".nav-link").each(function () {
    if ($(this).attr("href") === path) {
      $(this).addClass("active fw-bold");
    }
  });
});

const animElements = document.querySelectorAll("[data-animate]");
window.addEventListener("scroll", () => {
  animElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) el.classList.add("active");
  });
});

$("#contactForm").submit(function (e) {
  e.preventDefault();

  const data = {
    asunto: $("#asunto").val(),
    nombre: $("#nombre").val(),
    telefono: $("#telefono").val(),
    email: $("#email").val(),
    mensaje: $("#mensaje").val(),
  };

  // Validación básica
  if (!data.nombre || !data.email || !data.mensaje) {
    alert("Por favor, completa los campos obligatorios.");
    return;
  }

  // Envío al backend Node.js
  $.ajax({
    url: "http://localhost:3000/api/enviar",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (response) {
      alert("✅ ¡Mensaje enviado con éxito!");
      $("#contactForm")[0].reset();
    },
    error: function (xhr) {
      alert("❌ Ocurrió un error al enviar el mensaje.");
      console.error(xhr.responseText);
    },
  });
});
