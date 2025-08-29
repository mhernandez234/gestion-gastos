document.addEventListener("DOMContentLoaded", function(){
    const artList = document.getElementById('lista-articulos');
    const API = "../../datos/articulos.json";

    fetch(API)
    .then(response => response.json())
    .then(data => {
        const arts = data.articulos;

        arts.forEach(articulo => {
            const item = document.createElement('tr');
            item.className = 'registro';

            item.innerHTML = `
                <td class="codigo" data-label="Codigo:">${articulo.codigo}</td>
                <td class="codigo" data-label="Nombre:">${articulo.nombre}</td>
                <td class="codigo" data-label="Categoria:">${articulo.categoria}</td>
                <td class="codigo" data-label="Titular:">Marcos</td>
                <td class="codigo" data-label="Moneda:">${articulo.moneda}</td>
                <td class="codigo" data-label="Precio:">${articulo.precio}</td>
                <td class="codigo" data-label="Vencimiento:">-- / -- / ----</td>
                <td class="codigo" data-label="Cuota:">-- / --</td>
            `;
            artList.appendChild(item);
        });
    })
    .catch(error => console.error('Error al cargar productos:', error));
    //Modal
    const modal = document.querySelector(".modal");
    const filas = document.querySelectorAll("#lista-articulos");
    filas.forEach(fila => {
        fila.addEventListener("click", function() {
            modal.style.display = "flex";
        });
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