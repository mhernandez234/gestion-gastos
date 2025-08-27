document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("cambiar-contrasena").addEventListener("click", function(){
        document.querySelector(".modal").style.display = "flex";
    });
    document.getElementById("guardar").addEventListener("click", function(){
        document.querySelector(".modal").style.display = "none";
        const form = document.getElementById("form-contrasena");
        form.reset();
    });
    document.getElementById("salir").addEventListener("click", function(){
        window.location = "index.html";
    });

    let usuario = localStorage.getItem("usuario") || sessionStorage.getItem("usuario");

    if (usuario) {
        document.getElementById("usuario").value = usuario;
    }
});