let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: -34.397, lng: 150.644 },
        mapTypeId: 'roadmap'
    });

    // Tenta obter a localização atual do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                placeMarker(pos);
                reverseGeocode(pos);
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // O navegador não suporta Geolocalização
        handleLocationError(false, map.getCenter());
    }
}

function placeMarker(position) {
    if (marker) {
        marker.setPosition(position);
    } else {
        marker = new google.maps.Marker({
            position: position,
            map: map
        });
    }
}

function reverseGeocode(position) {
    const url = `/reverse_geocode?lat=${position.lat}&lng=${position.lng}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const address = data.results[0].formatted;
                document.getElementById('location-address').textContent = 'Endereço: ' + address;
            } else {
                document.getElementById('location-address').textContent = 'Endereço: Não encontrado';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('location-address').textContent = 'Erro ao buscar endereço';
        });
}

function handleLocationError(browserHasGeolocation, pos) {
    console.error('Error: The Geolocation service failed.');
    console.error('Error: Your browser doesnt support geolocation.');
    map.setCenter(pos);
}
