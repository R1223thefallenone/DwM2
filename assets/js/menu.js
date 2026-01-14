$(document).ready(function () {

  const $balanceElement = $("#balance");
  const $messageDiv = $("#message");

  // Si no hay saldo, lo inicializamos
  if (!localStorage.getItem("balance")) {
    localStorage.setItem("balance", 60000);
  }

  // Mostrar saldo actualizado
  $balanceElement.text("$" + localStorage.getItem("balance"));

  function redirect(message, url) {
    $messageDiv.html(`
      <div class="alert alert-info">
        Redirigiendo a ${message}...
      </div>
    `);

    setTimeout(function () {
      window.location.href = url;
    }, 1500);
  }

  // Eventos
  $("#btnDeposit").on("click", function (event) {
    event.preventDefault();
    redirect("Depositar", "deposit.html");
  });

  $("#btnSend").on("click", function (event) {
    event.preventDefault();
    redirect("Enviar Dinero", "sendmoney.html");
  });

  $("#btnTransactions").on("click", function (event) {
    event.preventDefault();
    redirect("Últimos Movimientos", "transactions.html");
  });

});