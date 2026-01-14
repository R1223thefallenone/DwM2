$(document).ready(function () {

  const $form = $("#depositForm");
  const $amountInput = $("#depositAmount");
  const $messageDiv = $("#message");
  const $currentBalance = $("#currentBalance");

  // Si no existe saldo, lo inicializamos
  if (!localStorage.getItem("balance")) {
    localStorage.setItem("balance", 60000);
  }

  // 👉 Mostrar saldo actual
  function showBalance() {
    const balance = Number(localStorage.getItem("balance"));
    $currentBalance.text(`$${balance}`);
  }

  showBalance();

  $form.on("submit", function (event) {
    event.preventDefault();

    const depositAmount = Number($amountInput.val());
    let currentBalance = Number(localStorage.getItem("balance"));

    if (depositAmount <= 0 || isNaN(depositAmount)) {
      $messageDiv.html(`
        <div class="alert alert-danger">
          Ingresa un monto válido
        </div>
      `);
      return;
    }

    // Actualizar saldo
    const newBalance = currentBalance + depositAmount;
    localStorage.setItem("balance", newBalance);

    $messageDiv.html(`
      <div class="alert alert-success">
        Depósito realizado con éxito.<br>
        Nuevo saldo: $${newBalance}
      </div>
    `);

    // Guardar movimiento
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  transactions.push({
    type: "deposit", 
    description: "Depósito de efectivo",
    amount: depositAmount
});

    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Actualizar saldo visual
    showBalance();

    // Redirigir al menú
    setTimeout(function () {
      window.location.href = "menu.html";
    }, 2000);
  });

});
