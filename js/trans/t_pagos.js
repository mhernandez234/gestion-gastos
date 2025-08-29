document.addEventListener("DOMContentLoaded", function(){
    const ocompList = document.getElementById('lista-ocompras');
    const API = "../../datos/ocompras.json";

    fetch(API)
    .then(response => response.json())
    .then(data => {
        const oc = data.ocompras;

        oc.forEach(ocompra => {
            const item = document.createElement('tr');
            item.className = 'registro';

            item.innerHTML = `
                <td class="nro" data-label="Nro Transaccion:">${ocompra.oc}</td>
                <td class="fec" data-label="Fecha:">${ocompra.prov}</td>
                <td class="metodo" data-label="Metodo:">${ocompra.fec}</td>
                <td class="gto" data-label="Gasto:">${ocompra.fec}</td>
                <td class="monto" data-label="Monto:">${ocompra.fec}</td>
            `;
            ocompList.appendChild(item);
        });
    })
    .catch(error => console.error('Error al cargar ordenes de compra:', error));
    //Modal
    const modal = document.querySelector(".modal");
    const filas = document.querySelectorAll("#lista-ocompras");
    filas.forEach(fila => {
        fila.addEventListener("click", function() {
            modal.style.display = "flex";
        });
    });
    document.getElementById("agregar-fila").addEventListener("click", function() {
        const tbody = document.querySelector(".tbody-grilla");
        const nuevaFila = document.createElement("tr");

        nuevaFila.innerHTML = `
            <td><input type="text" class="cod-art"></td>
            <td><input type="text" class="desc-art"></td>
            <td><input type="text" class="moneda"></td>
            <td><input type="number" class="precio"></td>
        `;

        tbody.appendChild(nuevaFila);
    });
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