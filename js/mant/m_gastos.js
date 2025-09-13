document.addEventListener("DOMContentLoaded", function(){
    const artList = document.getElementById('lista-gastos');
    const API = "../../datos/gastos.json";
    const form = document.getElementById("form");

    fetch(API)
    .then(response => response.json())
    .then(data => {
        const arts = data.gastos;

        arts.forEach(gasto => {
            const item = document.createElement('tr');
            item.className = 'registro';

            item.innerHTML = `
                <td class="codigo" data-label="ID:">${gasto.id}</td>
                <td class="codigo" data-label="Descripcion:">${gasto.desc}</td>
                <td class="codigo" data-label="Vencimiento:">${gasto.dia_venc}</td>
                <td class="codigo" data-label="Moneda:">${gasto.moneda}</td>
                <td class="codigo" data-label="Monto:">${gasto.monto}</td>
            `;
            artList.appendChild(item);
        });
    })
    .catch(error => console.error('Error al cargar productos:', error));
    //Modal
    const modal = document.querySelector(".modal");
    const filas = document.querySelectorAll("#lista-gastos");
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
        form.reset();
    });
    document.getElementById("cancelar").addEventListener("click", function() {
        form.reset();
        modal.style.display = "none";
    });
    document.getElementById("salir").addEventListener("click", function(){
        window.location = "../../index.html"
    })

})