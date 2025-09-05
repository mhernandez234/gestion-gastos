document.addEventListener("DOMContentLoaded", function(){
    const ingList = document.getElementById('lista-ingresos');
    const API = "../../datos/ingresos.json";

    fetch(API)
    .then(response => response.json())
    .then(data => {
        const ing = data.ingresos;

        ing.forEach(ingreso => {
            const item = document.createElement('tr');
            item.className = 'registro';

            item.innerHTML = `
                <td class="codigo" data-label="ID:">${ingreso.id}</td>
                <td class="codigo" data-label="Descripcion:">${ingreso.desc}</td>
                <td class="codigo" data-label="Categoria:">${ingreso.cat}</td>
                <td class="codigo" data-label="Metodo:">${ingreso.metodo}</td>
                <td class="codigo" data-label="Moneda:">${ingreso.moneda}</td>
                <td class="codigo" data-label="Monto:">${ingreso.monto}</td>
                <td class="codigo" data-label="Dia Ingreso:">${ingreso.dia_ing}</td>
            `;
            ingList.appendChild(item);
        });
    })
    .catch(error => console.error('Error al cargar ingresos:', error));
    //Modal
    const modal = document.querySelector(".modal");
    const filas = document.querySelectorAll("#lista-ingresos");
    filas.forEach(fila => {
        fila.addEventListener("click", function() {
            modal.style.display = "flex";
        });
    });

    const checkRepetir = document.getElementById("repetir");
    const lineaFrecuencia = document.getElementById("linea-frecuencia");

    // función que actualiza la visibilidad
    function mostrarFrecuencia() {
        if (checkRepetir.checked) {
            lineaFrecuencia.style.display = "flex";
        } else {
            lineaFrecuencia.style.display = "none";
            document.getElementById("num").value = "";
            document.getElementById("frec").value = "0"; // vuelve a "Ingrese Frecuencia"
        }
    }

    // escucha cuando cambia el checkbox
    checkRepetir.addEventListener("change", mostrarFrecuencia);

    document.getElementById("aceptar").addEventListener("click", function(){
        const form = document.getElementById("form");
        form.reset();
    });
    document.getElementById("cancelar").addEventListener("click", function() {
        modal.style.display = "none";
    });
    document.getElementById("salir").addEventListener("click", function(){
        window.location = "../../index.html"
    })

})