export default class MapService {
    constructor() {
        this.map = this.initMap();
        this.markers = [];
        this.selectedMarker = null;
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
        
        // Создаем кастомную иконку для маркера
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div class="marker-pin" style="background: ${this.getScoreColor(place.score)}"></div>
                <div class="marker-label">${place.score}%</div>
            `,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        // Добавляем маркер
        this.selectedMarker = L.marker([place.lat, place.lng], { icon: customIcon })
            .addTo(this.map)
            .bindPopup(`
                <div class="popup-content">
                    <p class="popup-address"><strong>${place.address}</strong></p>
                    <div class="popup-coordinates">
                        <div><strong>Широта:</strong> ${place.lat.toFixed(6)}</div>
                        <div><strong>Долгота:</strong> ${place.lng.toFixed(6)}</div>
                    </div>
                    <div class="popup-score">
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${place.score}%; background: ${this.getScoreColor(place.score)}"></div>
                        </div>
                        <div class="score-value">Соответствие: ${place.score}%</div>
                    </div>
                </div>
            `)
            .openPopup();

        this.markers.push(this.selectedMarker);
    }

    getScoreColor(score) {
        if (score >= 80) return '#4CAF50'; // Зеленый
        if (score >= 60) return '#FFC107'; // Желтый
        return '#F44336'; // Красный
    }

    clearMarkers() {
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];
        this.selectedMarker = null;
    }

    // Метод для отображения всех результатов на карте
    showAllResults(results) {
        this.clearMarkers();
        
        results.forEach(place => {
            const marker = L.marker([place.lat, place.lng])
                .addTo(this.map)
                .bindPopup(`
                    <div class="popup-content">
                        <p class="popup-address"><strong>${place.address}</strong></p>
                        <div class="popup-coordinates">
                            <div><strong>Широта:</strong> ${place.lat.toFixed(6)}</div>
                            <div><strong>Долгота:</strong> ${place.lng.toFixed(6)}</div>
                        </div>
                        <div class="popup-score">
                            <div class="score-value">Соответствие: ${place.score}%</div>
                        </div>
                        <button class="popup-select-btn" data-id="${place.id}">Выбрать</button>
                    </div>
                `);
            
            this.markers.push(marker);
        });

        // Если есть результаты, подстраиваем вид карты чтобы показать все маркеры
        if (results.length > 0) {
            const group = new L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    }
}
