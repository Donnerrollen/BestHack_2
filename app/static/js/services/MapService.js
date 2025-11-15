export default class MapService {
    constructor() {
        this.map = this.initMap();
        this.markers = [];
    }

    initMap() {
        const map = L.map('map').setView([55.751244, 37.618423], 10);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        return map;
    }

    highlightPlace(place) {
        // Очищаем предыдущие маркеры
        this.clearMarkers();
        
        // Устанавливаем вид на выбранное место
        this.map.setView([place.lat, place.lng], 15);
        
        // Добавляем маркер
        const marker = L.marker([place.lat, place.lng])
            .addTo(this.map)
            .bindPopup(`
                <h6>${place.name}</h6>
                <p class="text-muted">${place.address}</p>
                <small>Рейтинг: ${place.rating}/5</small>
            `)
            .openPopup();
        
        this.markers.push(marker);
    }

    clearMarkers() {
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
    }
}
