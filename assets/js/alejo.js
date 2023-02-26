let imagen, btn_cerrar, titulo, mensaje;

function toLogin() {
    location.href = "login.html";
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

    if (password == password2) {
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
    else {
        alert('Revisa los datos');
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

    /*
    if (username == null) {
        result.innerHTML = 'Usuario incorrecto';
    }
    else if (user == data.user && password == data.password) {
        location.href = 'index.html';
    }
    else {
        result.innerHTML = 'Contraseña incorrecta';
    }
    */
}
