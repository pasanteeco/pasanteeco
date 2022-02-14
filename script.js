document.addEventListener('DOMContentLoaded', function() {
    function iniciar_select(id){
        var elemento = document.querySelectorAll(`#${id}`);
        var instances = M.FormSelect.init(elemento, {
            classes : "select_"
        });
    }
    M.AutoInit();

    var select_tipo_pedido = document.querySelector("#select_tipo_pedido");
    var cantidad_fechas_recurrentes = 1;
    var boton_agregar_fecha = document.querySelector("#boton_agregar_fecha");
    function elegir_tipo_pedido(){
        var contenedor_contenedor_fecha = document.querySelector(".contenedor_fecha");
        var contenedor_recurrente = document.querySelector(".recurrente");
        var tipo_pedido = document.querySelector("#tipo_pedido input");
        switch (tipo_pedido.value) {
            case "Para una fecha específica":
                contenedor_contenedor_fecha.classList.replace("oculto", "visible");
                contenedor_recurrente.classList.replace("visible", "oculto");
                break;
            case "Recurrente":
                contenedor_recurrente.classList.replace("oculto", "visible");
                contenedor_contenedor_fecha.classList.replace("visible", "oculto");
                break;        
            default:
                contenedor_contenedor_fecha.classList.replace("visible", "oculto");
                contenedor_recurrente.classList.replace("visible", "oculto");
                break;
        }
        
    }

    boton_agregar_fecha.addEventListener("click", () => {
        var contenedor_recurrente = document.querySelector(".fechas_recurrentes");
        cantidad_fechas_recurrentes += 1;
        contenedor_recurrente.innerHTML += `
            <div class="row" id="fecha_hora_${cantidad_fechas_recurrentes}">
                <div class="input-field col s4">
                    <select name="fecha_${cantidad_fechas_recurrentes}" class="no-autoinit" id="fecha_${cantidad_fechas_recurrentes}">
                        <option>Lunes</option>
                        <option>Martes</option>
                        <option>Miércoles</option>
                        <option>Jueves</option>
                        <option>Sábado</option>
                    </select>
                    <label>Día</label>
                </div>
                <div class="input-field col s4">
                    <input class="no-autoinit" name="hora_${cantidad_fechas_recurrentes}" id="hora_${cantidad_fechas_recurrentes}" type="time">
                    <label for="hora_${cantidad_fechas_recurrentes}">Ingrese Hora</label>
                </div>
                <div class="col s2">
                    <button class="waves-effect waves-light btn-floating"><i class="material-icons left">delete</i></button>
                </div>
            </div>
        `;
        iniciar_select(`fecha_${cantidad_fechas_recurrentes}`);
    })


    // iniciar_selects();
    select_tipo_pedido.addEventListener("change", elegir_tipo_pedido);
    elegir_tipo_pedido();
    var select_tipo_pedido = document.querySelector("#contenedor_fecha");
    var select_equipos = document.querySelector("#select_equipos");

    var fecha_pedido = document.querySelector("#fecha");
    var hoy = (new Date()).toISOString().slice(0, 10);

    fecha_pedido.value = hoy;
    fecha_pedido.min = hoy;
  });

