document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("iniciar").addEventListener("click", function(){
        let usuario = document.getElementById("usuario").value;
        let contrasena = document.getElementById("contrasena").value;
        let mantener = document.getElementById("mantener").checked;
        if (!usuario || !contrasena){
            alert("El usuario y la contraseña no pueden ser nulos");
        }else if (!mantener){
            alert("Sesion iniciada!");
            sessionStorage.setItem("usuario", usuario);
            window.location = "index.html";
        }else{
            alert("Sesion iniciada!");
            localStorage.setItem("usuario", usuario);
            window.location = "index.html";
        };

        
    });
});