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

    //funcion para desplegar menu
    document.getElementById("menu").addEventListener("click", function() {
        const menuL = document.getElementById("menu-l");
        const menuR = document.getElementById("menu-r");

        // Verifica si está visible y alterna
        if (menuL.style.display === "block") {
            menuL.style.display = "none";
            menuR.style.display = "none";
        } else {
            menuL.style.display = "block";
            menuR.style.display = "block";
        }
    });


    //funcion para desplegar sub-menu
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

    //funcion para redirigir
    document.querySelectorAll(".btn-enlace").forEach(function(boton){
        boton.addEventListener("click", function(){
            const direc = this.dataset.url;
            window.location.href = direc;
        });
    });

});
