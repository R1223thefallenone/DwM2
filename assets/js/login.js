// Credenciales válidas (simuladas)
const VALID_EMAIL = "rafa@gmail.cl";
const VALID_PASSWORD = "jquery";

$(document).ready(function () {

  const $form = $("#loginForm");
  const $emailInput = $("#email");
  const $passwordInput = $("#password");
  const $messageDiv = $("#message");

  $form.on("submit", function (event) {
    event.preventDefault(); // evita recargar la página

    const email = $emailInput.val().trim();
    const password = $passwordInput.val().trim();

    // Validación
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      $messageDiv.html(`
        <div class="alert alert-success">
          Login exitoso. Redirigiendo...
        </div>
      `);

      // Redirección al menú
      setTimeout(function () {
        window.location.href = "menu.html";
      }, 1500);

    } else {
      $messageDiv.html(`
        <div class="alert alert-danger">
          Email o contraseña incorrectos
        </div>
      `);
    }
  });

}); 