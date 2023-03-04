let frm_registro, home;
let btn_iniciar_sesion;
let img_perfil = "https://icons.iconarchive.com/icons/saviourmachine/chat/48/music-icon.png";

window.onload = init;

function init() {

    func_ocultar();

    btn_iniciar_sesion = document.getElementById("btn_iniciar_sesion");
    btn_enviar.addEventListener("click", login);

}

//Registrar usuarios
function registrar() {

    let miUser;
    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let usuario = document.getElementById("usuario");
    let celular = document.getElementById("celular");
    let correo = document.getElementById("email");
    let genero = document.getElementById("genero");
    let clave = document.getElementById("clave1");
    let clave2 = document.getElementById("clave2");

    if (nombre.value != "" && apellido.value != "" && usuario.value != "" &&
        celular.value != "" && correo.value != "" && genero.value != "" &&
        clave.value != "" && clave2.value != "" && clave.value === clave2.value) {
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
        //alert("¡Muy bien, registro exitoso!");
        //window.location.href = 'index.html';
    }

}

//Función activada con el submit
const form_registro = document.getElementById('form_registro');

try {
    if (form_registro) {
        form_registro.addEventListener('submit', (event) => {
            event.preventDefault();
            registrar();
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
        alert('Bienvenido ' + user.nombre);
        window.location.href = "index.html";
    } /*else {
        alert("Revise los datos");
    }*/
}


const inicio = document.getElementById('iniciosesion');
const registro = document.getElementById("btn_enviar_registro");
const cierre = document.getElementById('cierresesion');

const navigateTo = (url) => {
    location.href = url;
};

registro.addEventListener('click', () => {
    console.log("Hiciste click en ir a registro");
    irARegistro();
});

inicio.addEventListener('click', () => {
    console.log("click en iniciar sesión");
    navigateTo('login.html');
});

cierre.addEventListener('click', () => {
    console.log("click en cerrar sesión");
    //localStorage.removeItem("logueado");
    //func_ocultar();
    //navigateTo('index.html');
});



// Comprobación de logueo de un usuario
// En este caso, será del API de Spotify
document.addEventListener('DOMContentLoaded', function () {
    const apiSpotify = document.getElementById('miapi');

    let logueado = localStorage.getItem("logueado");

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
        const showElement = document.getElementById('iniciosesion')
        const elementToHide = document.getElementById('cierresesion');
        elementToHide.style.display = 'none';
        showElement.style.display = 'block';

    }
}

//Resetear el formulario del login e ir a registrate
function irARegistro(event) {
    console.log("Hice click en ir a registro");
    login_form.reset();
    window.location.href = 'registrate.html';
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
