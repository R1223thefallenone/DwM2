  $(document).ready(function () {

  const $transactionList = $("#transactionList");
  const $filterType = $("#filterType");

  const listaTransacciones = JSON.parse(localStorage.getItem("transactions")) || [];

  // 🔹 Convierte el tipo a texto legible
  function getTipoTransaccion(tipo) {
    switch (tipo) {
      case "deposit":
        return "Depósito";
      case "send":
        return "Envío de dinero";
      case "receive":
        return "Transferencia recibida";
      default:
        return "Movimiento";
    }
  }

  // 🔹 Mostrar movimientos según filtro
  function mostrarUltimosMovimientos(filtro) {
    $transactionList.empty();

    let filtradas = listaTransacciones;

    if (filtro !== "all") {
      filtradas = listaTransacciones.filter(t => t.type === filtro);
    }

    if (filtradas.length === 0) {
      $transactionList.html(`
        <li class="list-group-item text-center">
          No hay movimientos para este filtro
        </li>
      `);
      return;
    }

    filtradas
      .slice()
      .reverse()
      .forEach(function (t) {

        const sign = t.amount > 0 ? "+" : "-";

        const $li = $(`
          <li class="list-group-item d-flex justify-content-between">
            <span>${t.description || getTipoTransaccion(t.type)}</span>
            <strong>${sign}$${Math.abs(t.amount)}</strong>
          </li>
        `);

        $transactionList.append($li);
      });
  }

  // 🔹 Evento del filtro
  $filterType.on("change", function () {
    const filtro = $(this).val();
    mostrarUltimosMovimientos(filtro);
  });

  // Mostrar todos al cargar
  mostrarUltimosMovimientos("all");

});