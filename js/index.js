document.addEventListener("DOMContentLoaded", function(){
    //verifica que el usuario no este logeado para enviarlo al login
    let usuario = localStorage.getItem("usuario") || sessionStorage.getItem("usuario");
    
    if (!usuario){
        window.location = "login.html";
        return;
    }

    //funcion para cerrar sesion
    document.getElementById("salir").addEventListener("click", function(){
        sessionStorage.removeItem("usuario");
        localStorage.removeItem("usuario");
        window.location.reload();
    });

    //carga el formulario de saldos disponibles
    const saldoDisp = document.getElementById('saldos-disponibles');
    const URLSaldos = "../datos/saldos.json";

    fetch(URLSaldos)
    .then(response => response.json())
    .then(data => {
        const saldos = data.saldos || [];

        saldos.forEach(saldo => {
            const item = document.createElement('div');
            item.className = 'fila';

            item.innerHTML = `
                <label class="metodo">${saldo.metodo}:</label>
                <div class="saldo">${saldo.saldo}</div>
            `;
            saldoDisp.appendChild(item);
        });
    });

    //carga la tabla de vencimientos de gastos
    const vencGastos = document.getElementById('venc-gastos'); 
    const URLGastos = "../datos/gastos.json";

    fetch(URLGastos)
    .then(response => response.json())
    .then(data => {
        const gastosActivos = (data.gastos || []).filter(gasto => gasto.activo === "S");

        gastosActivos.forEach(gasto => {
            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${gasto.desc}</td>
                <td>${gasto.tit}</td>
                <td>${gasto.sim_moneda}</td>
                <td>${gasto.monto.toLocaleString()}</td>
                <td>${gasto.dia_venc}</td>
            `;

            vencGastos.appendChild(fila);
        });
    });

    

    //funcion para desplegar menu
    document.querySelectorAll(".has-submenu > a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            let parentLi = this.parentElement;

            document.querySelectorAll(".has-submenu").forEach(li => {
                if (li !== parentLi) li.classList.remove("open");
            });

            parentLi.classList.toggle("open");
        });
    });
});
