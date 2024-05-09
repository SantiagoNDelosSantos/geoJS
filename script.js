// Función para solicitar la ubicación del usuario y verificar si está dentro del área habilitada
function verificarUbicacion() {
    // Definir los puntos que delimitan el área
    let puntos = [
        { lat: -27.343541, lng: -56.035848 },
        { lat: -27.347477, lng: -55.892335 },
        { lat: -27.452130, lng: -55.811615 },
        { lat: -27.503693, lng: -55.815179 },
        { lat: -27.484567, lng: -55.974452 },
        { lat: -27.405423, lng: -56.029561 }
    ];

    // Función para verificar si un punto está dentro de un polígono
    function puntoDentroDelPoligono(lat, lng, puntos) {
        let dentro = false;
        for (let i = 0, j = puntos.length - 1; i < puntos.length; j = i++) {
            let xi = puntos[i].lat, yi = puntos[i].lng;
            let xj = puntos[j].lat, yj = puntos[j].lng;
            let intersecta = ((yi > lng) != (yj > lng)) &&
                (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
            if (intersecta) dentro = !dentro;
        }
        return dentro;
    }

    // Función para mostrar la ubicación del usuario
 // Función para mostrar la ubicación del usuario
function mostrarUbicacion(posicion) {
    let latitude = posicion.coords.latitude;
    let longitude = posicion.coords.longitude;
    let estaDentro = puntoDentroDelPoligono(latitude, longitude, puntos);
    let resultadoUbi = document.getElementById('resultadoUbi');
    let link = document.getElementById('link');
    if (estaDentro) {
       resultadoUbi.innerHTML = 'El usuario está dentro del área habilitada. ' + latitude + ', ' + longitude;
       link.innerHTML = `<a href="https://maps.google.com/?q=${latitude},${longitude}" target="_blank">Mostrar tu posición en un mapa</a>`;
     } else {
        resultadoUbi.innerHTML = 'El usuario está fuera del área habilitada. ' + latitude + ', ' + longitude;
        link.innerHTML = '';
    }
}

    // Función para manejar el caso de error al obtener la ubicación del usuario
    function errorObteniendoUbicacion(error) {
        console.error('Error al obtener la ubicación del usuario:', error.message);
        // Aquí puedes manejar el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario
    }

    // Solicitar la ubicación del usuario
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarUbicacion, errorObteniendoUbicacion);
    } else {
        console.error("La geolocalización no está disponible en este navegador.");
        // Aquí puedes manejar el caso en que la geolocalización no esté disponible
    }
}

let btnVerificar = document.getElementById('verificarUbicacion')

btnVerificar.addEventListener('click', (e) => {
    e.preventDefault()
    // Llamar a la función para verificar la ubicación del usuario
    verificarUbicacion();
})

