document.addEventListener("DOMContentLoaded", function() {
    // --- Variables ---
    const pagoList = document.getElementById('lista-pagos');
    const API = "../../datos/pagos.json";
    const modal = document.querySelector(".modal");
    const inputFecha = document.getElementById("fecha");
    const display = document.getElementById("display"); // para mostrar DD/MM/YYYY
    const form = document.getElementById("form");

    const btnAgregarFila = document.getElementById("agregar-fila");
    const btnAceptar = document.getElementById("aceptar");
    const btnCancelar = document.getElementById("cancelar");
    const btnSalir = document.getElementById("salir");  
    const formPagos = document.getElementById("form-pagos");  
    const formComp = document.getElementById("form-comp");

    const tbodyGrilla = document.querySelector(".tbody-grilla");


    // --- Cargar ordenes de compra ---
    fetch(API)
        .then(response => response.json())
        .then(data => {
            const oc = data.pagos;
            oc.forEach(pago => {
                const item = document.createElement('tr');
                item.className = 'registro';
                item.innerHTML = `
                    <td class="nro" data-label="ID:">${pago.id}</td>
                    <td class="fec" data-label="Fecha:">${pago.fecha}</td>
                    <td class="metodo" data-label="Metodo:">${pago.metodo}</td>
                    <td class="gto" data-label="Total:">${pago.total}</td>
                `;
                pagoList.appendChild(item);
            });
        })
        .catch(error => console.error('Error al cargar ordenes de compra:', error));

    // --- Delegación de eventos para abrir modal al click en una fila ---
    pagoList.addEventListener("click", function(e) {
        const fila = e.target.closest("tr");
        if (fila) {
            modal.style.display = "flex";
        }
    });

    // cambio entre pestañas
    document.getElementById("pest-comp").addEventListener("click", function(){
        formComp.style.display = "block";
        formPagos.style.display = "none";
    });
    document.getElementById("pest-pagos").addEventListener("click", function(){
        formPagos.style.display = "block";
        formComp.style.display = "none";
    });

    // --- Inicializar fecha del día ---
    const hoy = new Date();
    const dd = String(hoy.getDate()).padStart(2, '0');
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const yyyy = hoy.getFullYear();

    inputFecha.value = `${yyyy}-${mm}-${dd}`;  // valor interno para input type=date
    if (display) {
        display.textContent = `${dd}/${mm}/${yyyy}`; // valor visual
    }

    // --- Agregar fila a la grilla ---
    document.querySelector(".tbody-grilla").addEventListener("click", function(e){
        if(e.target.classList.contains("btn-agregar")){
            const tbody = document.querySelector(".tbody-grilla");
            const nuevaFila = document.createElement("tr");

            nuevaFila.innerHTML = `
            <td data-label="Gasto"><input type="text" class="gasto"></td>
            <td data-label="Moneda"><input type="text" class="moneda"></td>
            <td data-label="Monto"><input type="text" class="monto"></td>
            <td data-label="Comparte"><input type="checkbox" class="comparte"></td>
            `;

            // Insertamos antes del último tr (el de agregar)
            tbody.insertBefore(nuevaFila, document.querySelector(".fila-agregar"));
        }
    });

    // --- Botón aceptar: resetear form ---
    btnAceptar.addEventListener("click", function() {
        form.reset();

        // Reiniciar fecha al día de hoy
        inputFecha.value = `${yyyy}-${mm}-${dd}`;
        if (display) {
            display.textContent = `${dd}/${mm}/${yyyy}`;
        }
        // --- Eliminar filas agregadas dinámicamente ---
        const tbody = document.querySelector(".tbody-grilla");
        const filas = tbody.querySelectorAll("tr:not(.fila-agregar)"); // todas excepto la de agregar
        filas.forEach(fila => fila.remove());

        // --- Agregar una fila vacía inicial ---
        const nuevaFila = document.createElement("tr");
        nuevaFila.innerHTML = `
            <td data-label="Gasto"><input type="text" class="gasto"></td>
            <td data-label="Moneda"><input type="text" class="moneda"></td>
            <td data-label="Monto"><input type="text" class="monto"></td>
            <td data-label="Comparte"><input type="checkbox" class="comparte"></td>
        `;
        tbody.insertBefore(nuevaFila, tbody.querySelector(".fila-agregar")); // justo antes de la fila de agregar
    });

    // --- Botón cancelar: cerrar modal y resetear form---
    btnCancelar.addEventListener("click", function() {
        form.reset();

        // Reiniciar fecha al día de hoy
        inputFecha.value = `${yyyy}-${mm}-${dd}`;
        if (display) {
            display.textContent = `${dd}/${mm}/${yyyy}`;
        }
        modal.style.display = "none";

        // --- Eliminar filas agregadas dinámicamente ---
        const tbody = document.querySelector(".tbody-grilla");
        const filas = tbody.querySelectorAll("tr:not(.fila-agregar)"); // todas excepto la de agregar
        filas.forEach(fila => fila.remove());

        // --- Agregar una fila vacía inicial ---
        const nuevaFila = document.createElement("tr");
        nuevaFila.innerHTML = `
            <td data-label="Gasto"><input type="text" class="gasto"></td>
            <td data-label="Moneda"><input type="text" class="moneda"></td>
            <td data-label="Monto"><input type="text" class="monto"></td>
            <td data-label="Comparte"><input type="checkbox" class="comparte"></td>
        `;
        tbody.insertBefore(nuevaFila, tbody.querySelector(".fila-agregar")); // justo antes de la fila de agregar
    });

    // --- Botón salir: redirigir ---
    btnSalir.addEventListener("click", function() {
        window.location.href = "../../index.html";
    });
});
