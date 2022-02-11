document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {
        classes : "select_"
    });

    var select_tipo_pedido = document.querySelector("#contenedor_fecha");
    var select_equipos = document.querySelector("#select_equipos");

    var fecha_pedido = document.querySelector("#fecha_1");
    var hoy = (new Date()).toISOString().slice(0, 10);


    fecha_pedido.value = hoy;
    fecha_pedido.min = hoy;
  });

