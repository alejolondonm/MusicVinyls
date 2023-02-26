

function toLogin() {
    location.href = "login.html";
}

function toPromos() {
    let isLogged = localStorage.getItem("isLogged");

    if (isLogged === 'true')
        location.href = "promos.html";
}



function registro(e) {
    event.preventDefault();

    //Datos de login y registro
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var user = document.getElementById('user').value;
    var email = document.getElementById('email').value;
    var celular = document.getElementById('celular').value;
    var password = document.getElementById('clave1').value;
    var password2 = document.getElementById('clave2').value;

    if (nombre.length > 5 && nombre.length < 20) {
        alert('El nombre debe tener entre 5 y 20 caracteres');
    }
    else if (length(apellido) > 5 && length(apellido) < 20) {
        alert('El apellido debe tener entre 5 y 20 caracteres');
    }
    else if (length(user) > 8 && length(user) < 15) {
        alert('El usuario debe tener entre 8 y 15 caracteres');
    }
    else {
        //Creación del usuario
        var myUser = {
            nombre: nombre,
            apellido: apellido,
            user: user,
            email: email,
            celular: celular,
            password: password,
        };

        var json = JSON.stringify(myUser);
        localStorage.setItem(user, json);
        console.log('¡Usuario creado con éxito!');
        alert('¡Usuario creado con éxito!');
        location.href = "login.html";
    }

}

//Función para el login
function loginFunc(e) {
    event.preventDefault();

    var user = document.getElementById('userlog').value;
    var password = document.getElementById('clavelog').value;
    var result = document.getElementById('result');

    var username = localStorage.getItem(user);
    var data = JSON.parse(username);
    console.log(data);

    if (username == null) {
        result.innerHTML = 'Usuario incorrecto';
    }
    else if (user == data.user && password == data.password) {
        localStorage.setItem("estadologin", true);
        location.href = 'index.html';
    }
    else {
        result.innerHTML = 'Contraseña incorrecta';
    }
}


//Función para Cerrar Sesión
function cerrarSesion() {

    const showElement = document.getElementById('iniciosesion')
    const elementToHide = document.getElementById('cierresesion');

    if (localStorage.getItem('estadologin') === 'true') {
        localStorage.setItem("estadologin", false);
        elementToHide.style.display = 'none';
        showElement.style.display = 'block';
    } else {
        const showElement = document.getElementById('iniciosesion');
        if (showElement) showElement.style.display = 'none';

    }
}