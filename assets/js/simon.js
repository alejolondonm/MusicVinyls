//Navegación centralizada
let pages = document.querySelectorAll('.nav_link');
let menu_pg = [];

console.log(pages);


//Spotify API
const APIController = (function () {

    const clientId = '77991a3d03b245ee8812b13d309e692e'; //Mi ID de cliente de api spotify (simón)
    const clientSecret = '18719a58001c424dbede9f96bbd90928'; //Mi client secret de api spotify (simón)

    // Métodos privados
    const _getToken = async () => { //Solicitud, obtener token, obtiene los datos

        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        return data.access_token;
    }

    const _getGenres = async (token) => { //Get a generos

        const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.categories.items;
    }

    const _getPlaylistByGenre = async (token, genreId) => {

        const limit = 10;

        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.playlists.items;
    }

    const _getTracks = async (token, tracksEndPoint) => {

        const limit = 10;

        const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data.items;
    }

    const _getTrack = async (token, trackEndPoint) => {

        const result = await fetch(`${trackEndPoint}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await result.json();
        return data;
    }

    return {
        getToken() {
            return _getToken();
        },
        getGenres(token) {
            return _getGenres(token);
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTracks(token, tracksEndPoint) {
            return _getTracks(token, tracksEndPoint);
        },
        getTrack(token, trackEndPoint) {
            return _getTrack(token, trackEndPoint);
        }
    }
})();


// Interfaz
const UIController = (function () {

    //Array que guarda los selectores
    const DOMElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        buttonSubmit: '#btn_submit',
        divSongDetail: '#song-detail',
        hfToken: '#hidden_token',
        divSonglist: '.song-list'
    }

    //Métodos públicos
    return {

        //Obtenemos los campos
        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist),
                tracks: document.querySelector(DOMElements.divSonglist),
                submit: document.querySelector(DOMElements.buttonSubmit),
                songDetail: document.querySelector(DOMElements.divSongDetail)
            }
        },

        // List option
        createGenre(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        },

        createPlaylist(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        },

        // Lista de canciones de la playlist
        createTrack(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
            document.querySelector(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
        },

        // Detalle de las canciones
        createTrackDetail(img, title, artist) {

            const detailDiv = document.querySelector(DOMElements.divSongDetail);
            // Cada vez que el usuario le de click a una canción, limpiar.
            detailDiv.innerHTML = '';

            const html =
                `
            <div class="row col-sm-12 px-0">
                <img src="${img}" alt="">        
            </div>
            <div class="row col-sm-12 px-0">
                <label for="Genre" class="form-label col-sm-12">${title}</label>
            </div>
            <div class="row col-sm-12 px-0">
                <label for="artist" class="form-label col-sm-12">By ${artist}</label>
            </div> 
            `;

            detailDiv.insertAdjacentHTML('beforeend', html)
        },

        resetTrackDetail() {
            this.inputField().songDetail.innerHTML = '';
        },

        resetTracks() {
            this.inputField().tracks.innerHTML = '';
            this.resetTrackDetail();
        },

        resetPlaylist() {
            this.inputField().playlist.innerHTML = '';
            this.resetTracks();
        },

        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }
    }

})();

const APPController = (function (UICtrl, APICtrl) {

    // Input
    const DOMInputs = UICtrl.inputField();

    // get de los generos
    const loadGenres = async () => {
        //get del token
        const token = await APICtrl.getToken();
        //guardamos en token en la pagina
        UICtrl.storeToken(token);
        //get de los generos
        const genres = await APICtrl.getGenres(token);
        genres.forEach(element => UICtrl.createGenre(element.name, element.id));
    }

    // EventListener para generos
    DOMInputs.genre.addEventListener('change', async () => {
        //reseteamos la playlist
        UICtrl.resetPlaylist();
        //get al token de la pagina
        const token = UICtrl.getStoredToken().token;
        // get al genero seleccionado
        const genreSelect = UICtrl.inputField().genre;
        // get el id del genero que esta asociado al seleccionado
        const genreId = genreSelect.options[genreSelect.selectedIndex].value;
        // get playlist basadas en el genero
        const playlist = await APICtrl.getPlaylistByGenre(token, genreId);
        // crear una lista de playlist dependiendo del genero selaccionado
        playlist.forEach(p => UICtrl.createPlaylist(p.name, p.tracks.href));
    });


    // Botón de submit
    DOMInputs.submit.addEventListener('click', async (e) => {

        e.preventDefault();
        // Limpiamos las canciones
        UICtrl.resetTracks();
        //get al token
        const token = UICtrl.getStoredToken().token;
        // get al campo de playlist
        const playlistSelect = UICtrl.inputField().playlist;
        // get de la canción a partir de la playlist seleccionada
        const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
        // get de la lista de canciones de la playlist
        const tracks = await APICtrl.getTracks(token, tracksEndPoint);
        // creación de una lista de canciones
        tracks.forEach(el => UICtrl.createTrack(el.track.href, el.track.name))

    });

    // creción de un selector de canciones
    DOMInputs.tracks.addEventListener('click', async (e) => {

        e.preventDefault();
        UICtrl.resetTrackDetail();
        // get al token
        const token = UICtrl.getStoredToken().token;
        // get a la canción
        const trackEndpoint = e.target.id;
        //get el objeto canción
        const track = await APICtrl.getTrack(token, trackEndpoint);
        // cargar la metadata de la canción
        UICtrl.createTrackDetail(track.album.images[2].url, track.name, track.artists[0].name);
    });

    return {
        init() {
            console.log('App is starting');
            loadGenres();
        }
    }

})(UIController, APIController);

// Método para cargar los generos
APPController.init();



