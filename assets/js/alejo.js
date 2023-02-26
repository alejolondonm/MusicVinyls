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

}

//Función para el login
function loginFunc(e) {
    event.preventDefault();

    var user = document.getElementById('user').value;
    var password = document.getElementById('clave1').value;

    var username = localStorage.getItem(myUser);
    var data = JSON.parse(username);
    console.log(data);

}