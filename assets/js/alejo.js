let frm_login, frm_registro, home;
let btn_ir_a_registro, btn_enviar_registrar, btn_enviar;
let correo;
let img_perfil = "https://icons.iconarchive.com/icons/saviourmachine/chat/48/music-icon.png";

window.onload = init; window.onload = init;

function init() {
    console.log("Page loaded")
    hideElementIfLogged();
}

function init() {
    func_ocultar();
}

//Registrar usuarios
function registrar() {

    let miUser;
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let usuario = document.getElementById("usuario");
    let celular = document.getElementById("celular");
    let correo = document.getElementById("correo1");
    let genero = document.getElementById("genero");
    let clave = document.getElementById("clave1");
    let clave2 = document.getElementById("clave2");

    if (clave == clave2) {
        miUser = {
            nombre: nombre.value,
            apellido: apellido.value,
            usuario: usuario.value,
            celular: celular.value,
            correo: correo.value,
            genero: genero.value,
            clave: clave.value
        };
        localStorage.setItem("usuario", JSON.stringify(miUser));
        alert("¡Muy bien, registro exitoso!");
        //cambiarFormulario();
    }
    else {
        alert("Revisa los campos");
    }

}

//Función activada con el submit
const form_registro = document.getElementById('form_registro');


try {
    if (form_registro) {
        form_registro.addEventListener('submit', (event) => {
            event.preventDefault();

            registrar();
            alert("Registrado con éxito!")
            window.location.href = 'index.html';
        });
    }
} catch (error) {
    console.log(error);
}

//PARA EL LOGIN
//Función activada con el submit
const login_form = document.getElementById('frm_login');

if (login_form) {
    login_form.addEventListener('submit', (event) => {
        event.preventDefault();

        let user1 = document.getElementById('usuario').value;
        let psw = document.getElementById('clave').value;
        //let hashedPass = md5(uPassword);

        login(user1, psw);
    });
}

function login(username, clave) {

    let usuario_ls = localStorage.getItem("usuario");

    let user = JSON.parse(usuario_ls);

    if ((user.usuario === username && user.clave === clave)) {
        localStorage.setItem("logueado", true);
        alert('Bienvenido ${user.nombre}');
        window.location.href = "index.html";
    } else {
        alert("Revise los datos");
    }
}


const inicio = document.getElementById('iniciosesion');
const cierre = document.getElementById('cierresesion');

const navigateTo = (url) => {
    window.location.href = url;
};

inicio.addEventListener('click', () => {
    navigateTo('login.html');
});

cierre.addEventListener('click', () => {
    navigateTo('index.html');
});


// Comprobación de logueo de un usuario
// En este caso, será del API de Spotify
document.addEventListener('DOMContentLoaded', function () {
    const apiSpotify = document.getElementById('miapi');

    let siLog = localStorage.getItem("logueado");

    if (apiSpotify) {
        apiSpotify.addEventListener('click', () => {
            if (logueado === 'true') {
                window.location.href = 'spotifyapi/playlist.html';
            } else {
                alert('Debes crear una cuenta para buscar playlists')
                return window.location.href = 'register.html';
            }
        })
    }

});


//Para ocultar el botón de inicio sesión
function func_ocultar() {
    if (localStorage.getItem('logueado') === 'true') {
        const showElement = document.getElementById('cierresesion')
        const elementToHide = document.getElementById('iniciosesion');
        elementToHide.style.display = 'none';
        showElement.style.display = 'block';
    } else {
        const showElement = document.getElementById('cierresesion');
        if (showElement) showElement.style.display = 'none';

    }
}

//Cerrar Sesión
const showElement = document.getElementById('cierresesion')

showElement ? showElement.addEventListener('click', () => {
    localStorage.removeItem('logueado');

    return window.location.href = 'index.html';

}) : false;

















/*
window.onload = function () {
    frm_login = document.getElementById("frm_login");
    btn_enviar = document.getElementById("btn_enviar");
    btn_enviar_registrar = document.getElementById("btn_enviar_registrar");
    frm_registro = document.getElementById("frm_registro");
    home = document.getElementById("home");
    btn_ir_a_registro = document.getElementById("btn_ir_a_registro");
    btn_ir_a_registro.addEventListener("click", irARegistro);
    btn_enviar.addEventListener("click", validar);
    btn_enviar_registrar.addEventListener("click", registrar);
    configurar_login();
    configurar_registro();
}
*/


function configurar_login() {
    frm_login.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();
        if (frm_login.checkValidity()) {
            compararClave();
        }
        frm_login.classList.add('was-validated')
    }, false);
}

function configurar_registro() {
    frm_registro.addEventListener('submit', event => {
        event.preventDefault();
        event.stopPropagation();
        if (frm_registro.checkValidity()) {
            registrar();
        }
        frm_registro.classList.add('was-validated');
    }, false);
}

function irARegistro(event) {
    frm_login.reset();
    cambiarFormulario();
}

function cambiarFormulario() {
    frm_login.classList.toggle("ocultar");
    frm_registro.classList.toggle("ocultar");
}

function compararClave() {
    let correo = document.getElementById("correo");
    let clave = document.getElementById("clave");
    event.preventDefault();
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let html;
    if (correo.value == usuario.correo && clave.value == usuario.clave) {
        frm_login.classList.remove('was-validated');
        frm_login.reset();
        frm_login.classList.add("ocultar");
        home.classList.remove("ocultar");
        html = `
        <span>
            <img src="assets/img/gallery/male.jpeg" alt="">
        </span>
        <form class="d-flex">
            <a class="text-1000" href="login.html">Cerrar Sesión</a>
            <a href="javascript:void(0)" id="btn_cerrar_sesion" 
                onClick="cerrarSesion();" class="btn">
        </form>
        `;
        home.innerHTML = html;
    }
    else {
        alert("Datos incorrectos");
    }
}

function cerrarSesion(event) {
    frm_login.classList.remove("ocultar");
    home.classList.add("ocultar");
}








function toBlog() {
    location.href = "blog.html";
}

function toCollection() {
    location.href = "collection.html";
}

function toIndex() {
    location.href = "index.html";
}

function toNewArrivals() {
    location.href = "newArrivals.html";
}

function toPromos() {
    location.href = "promos.html";
}

function toLogin() {
    location.href = "login.html";
}

function toRegistro() {
    location.href = "registrate.html";
}

function toVinyls() {
    location.href = "vinyls.html";
}

function toAPI() {
    //let isLogged = localStorage.getItem("isLogged");

    //if (isLogged === 'true')
    location.href = "spotifyapi/playlist.html";
}


/*
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

    /*[if (nombre.length > 5 && nombre.length < 20) {
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


    //}

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

*/
