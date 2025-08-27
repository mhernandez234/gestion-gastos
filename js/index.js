document.addEventListener("DOMContentLoaded", function(){
    let usuario = localStorage.getItem("usuario") || sessionStorage.getItem("usuario");
    
    if (!usuario){
        window.location = "login.html";
        return;
    }

    document.getElementById("salir").addEventListener("click", function(){
        sessionStorage.removeItem("usuario");
        localStorage.removeItem("usuario");
        window.location.reload();
    })

    document.querySelectorAll(".has-submenu > a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Evita que el enlace recargue la página

            let parentLi = this.parentElement;

    // Cierra otros submenús si hay abiertos
            document.querySelectorAll(".has-submenu").forEach(li => {
                if (li !== parentLi) {
                    li.classList.remove("open");
                }
            });

    // Alterna el menú clicado
            parentLi.classList.toggle("open");
        });
    });
});