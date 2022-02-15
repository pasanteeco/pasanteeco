document.addEventListener('DOMContentLoaded', function() {
    var docentes = null;
    function iniciar_select(id){
        var elemento = document.querySelector(`#${id}`);
        var instances = M.FormSelect.init(elemento, {
            classes : "select_"
        });
    }
    M.AutoInit();
    function incializacion_inicial_selects(){
        var elementos = document.querySelectorAll(`select`);
        var instances = M.FormSelect.init(elementos, {
            classes : "select_"
        });
    }

    function idUnico() {
        //Acá se podría usar alguna función mejor para generar un UUID 
        return Number.parseInt(Date.now() + (new Date()).getMilliseconds());
    }

    var select_tipo_pedido = document.querySelector("#select_tipo_pedido");
    var cantidad_fechas_recurrentes = 1;
    var boton_agregar_fecha = document.querySelector("#boton_agregar_fecha");
    function elegir_tipo_pedido(){
        var contenedor_contenedor_fecha = document.querySelector(".contenedor_fecha");
        var contenedor_recurrente = document.querySelector(".recurrente");
        var tipo_pedido = document.querySelector("#tipo_pedido input");
        switch (tipo_pedido.value) {
            case "Fecha única":
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
  
    boton_agregar_fecha.addEventListener("click", (e) => {
        e.preventDefault();
        var backup_valores = {};
        var contenedor_recurrente = document.querySelector(".fechas_recurrentes");
        var selects = document.querySelectorAll(".fechas_recurrentes select");

        var id_unico = idUnico();
        var fila_nueva = document.createElement("div");
        fila_nueva.classList.add("row");
        fila_nueva.id = "fecha_hora_" + id_unico;
        fila_nueva.innerHTML += `
                <div class="input-field col s4">
                    <select name="fecha_${id_unico}" id="fecha_${id_unico}">
                        <option>Lunes</option>
                        <option>Martes</option>
                        <option>Miércoles</option>
                        <option>Jueves</option>
                        <option>Sábado</option>
                    </select>
                    <label>Día</label>
                </div>
                <div class="input-field col s4">
                    <input name="hora_${id_unico}" id="hora_${id_unico}" type="time" min="08:00" max="20:00">
                    <label for="hora_${id_unico}">Ingrese Hora</label>
                </div>
                <div class="input-field col s2">
                    <button id="boton_eliminar_${id_unico}" class="waves-effect waves-light btn-floating" title="Eliminar Fecha"><i class="material-icons left">delete</i></button>
                </div>
        `;
        contenedor_recurrente.appendChild(fila_nueva);

        var select = document.querySelector(`#fecha_${id_unico}`);
        iniciar_select(select.id);


        document.querySelector(`#boton_eliminar_${id_unico}`).addEventListener("click", (e) => {
            e.preventDefault();
            let contenedor_actual = e.target.closest(".row");
            let select_actual = contenedor_actual.querySelector("select");
            M.FormSelect.getInstance(select_actual).destroy();
            contenedor_actual.remove();
        });
    })


    incializacion_inicial_selects();
    select_tipo_pedido.addEventListener("change", elegir_tipo_pedido);
    elegir_tipo_pedido();
    var select_tipo_pedido = document.querySelector("#contenedor_fecha");
    var select_equipos = document.querySelector("#select_equipos");
    var fecha_final_recurrente = document.querySelector("#fecha_final_recurrente");
    var fecha_pedido = document.querySelector("#fecha");
    var hoy = (new Date()).toISOString().slice(0, 10);

    fecha_final_recurrente.min = hoy;
    fecha_final_recurrente.value = hoy;
    fecha_pedido.value = hoy;
    fecha_pedido.min = hoy;


    async function autocomplete_docentes(){
        var URL_DOCENTES = "https://script.google.com/macros/s/AKfycbyYROZGmlbpY9Dn-G6XRss_tQ5KCHiui7ApARqFefYXv0jXMqa0V9hWeNGAoO7Z2wzi/exec?pagina=docentes"; 
        respuesta = await fetch(URL_DOCENTES, {method: "GET"});
        docentes = await respuesta.json();
        nombres_apellidos_docentes = {};
        docentes.forEach((e) => {
            nombres_apellidos_docentes[e["apellido"] + " " + e["nombre"]] = null;
        });
        M.Autocomplete.init(document.querySelector("#nombre_apellido"), {data: nombres_apellidos_docentes})
    }

    (async () => {
        autocomplete_docentes();

        // url = "https://script.google.com/macros/s/AKfycbzK79DVl8TAFriI-28b66pZWWLRoj3sIBz8KoKEx2U6BGmzoZr3KvXvn-sqJphUdBY-/exec";
    })();


  });

