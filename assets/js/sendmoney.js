$(document).ready(function () {

  const $form = $("#addContactForm");
  const $searchInput = $("#searchContact");
  const $contactList = $("#contactList");
  const $sendMoneyBtn = $("#sendMoneyBtn");
  const $messageDiv = $("#message");

  $sendMoneyBtn.hide();

  // Inicializar saldo
  if (!localStorage.getItem("balance")) {
    localStorage.setItem("balance", 60000);
  }

  /*BUSCAR CONTACTOS*/
  $searchInput.on("keyup", function () {
    const search = $(this).val().toLowerCase();

    $("#contactList li").each(function () {
      const text = $(this).text().toLowerCase();
      $(this).toggle(text.includes(search));
    });
  });

  /*AGREGAR NUEVO CONTACTO*/
  $form.on("submit", function (event) {
    event.preventDefault();

const name = prompt("Nombre y apellido:");
if (name === null) return;

const rut = prompt("Número de Cta:");
if (rut === null) return;

const alias = prompt("Alias:");
if (alias === null) return;

const bank = prompt("Nombre del Banco:");
if (bank === null) return;

    // Validaciones
    if (!name || !rut || !alias || !bank) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!/^\d{8,22}$/.test(rut)) {
      alert("Rut inválido");
      return;
    }

    const $li = $(`
      <li class="list-group-item contact-item">
        <input type="radio" name="contact" value="${name}">
        <strong>${name}</strong><br>
        Numero cta: ${rut}, Alias: ${alias}, Banco: ${bank}
      </li>
    `);

    $contactList.append($li);
    $searchInput.val("");
  });

  /*SELECCIONAR CONTACTO*/
  $(document).on("change", 'input[name="contact"]', function () {
    $(".contact-item").removeClass("active");
    $(this).closest("li").addClass("active");
    $sendMoneyBtn.fadeIn();
  });

  /*ENVIAR DINERO*/
  $sendMoneyBtn.on("click", function () {

    const $selected = $('input[name="contact"]:checked');

    if ($selected.length === 0) {
      $messageDiv.html(`
        <div class="alert alert-danger">
          Selecciona un contacto
        </div>
      `);
      return;
    }

    const amount = Number(prompt("Ingrese el monto a enviar:"));
    let balance = Number(localStorage.getItem("balance"));

    if (isNaN(amount) || amount <= 0) {
      alert("Monto inválido");
      return;
    }

    if (amount > balance) {
      $messageDiv.html(`
        <div class="alert alert-danger">
          Saldo insuficiente
        </div>
      `);
      return;
    }

    // Actualizar saldo
    balance -= amount;
    localStorage.setItem("balance", balance);

    // Guardar movimiento
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({
    type: "send",
    description: `Envío a ${$selected.val()}`, 
    amount: -amount 
});
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Confirmación
    $messageDiv.html(`
      <div class="alert alert-success">
        ✅ Envío realizado con éxito<br>
        Destinatario: <strong>${$selected.val()}</strong><br>
        Monto enviado: $${amount}
      </div>
    `);

    setTimeout(() => {
      window.location.href = "menu.html";
    }, 2000);
  });

});
