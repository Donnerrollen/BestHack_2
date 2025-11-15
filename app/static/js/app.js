import SearchForm from '/static/js/components/SearchForm.js';
import SearchResults from '/static/js/components/SearchResults.js';
import MapService from '/static/js/services/MapService.js';

class ThemeManager {
    constructor() {
        this.themeSwitch = document.getElementById('themeSwitch');
        this.themeIcon = this.themeSwitch.querySelector('.theme-icon');
        this.init();
    }

    init() {
        // Загружаем сохраненную тему
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);

        this.themeSwitch.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.body.classList.remove('dark-theme', 'light-theme');
        document.body.classList.add(`${theme}-theme`);
        
        // Обновляем иконку
        this.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        
        // Сохраняем в localStorage
        localStorage.setItem('theme', theme);
    }
}

class App {
    constructor() {
        this.mapService = new MapService();
        this.themeManager = new ThemeManager();
        this.currentResults = [];
        this.init();
    }

    init() {
        customElements.define('search-form', SearchForm);
        customElements.define('search-results', SearchResults);
        
        document.addEventListener('search', (event) => {
            this.handleSearch(event.detail);
        });

        document.addEventListener('result-click', (event) => {
            this.handleResultClick(event.detail);
        });

        // Обработка выбора места из popup на карте
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup-select-btn')) {
                const placeId = parseInt(event.target.dataset.id);
                const place = this.currentResults.find(r => r.id === placeId);
                if (place) {
                    this.handleResultClick(place);
                }
            }
        });
    }

    async handleSearch(query) {
        try {
            if (!query.trim()) {
                this.currentResults = [];
                document.dispatchEvent(new CustomEvent('search-results', {
                    detail: []
                }));
                this.mapService.clearMarkers();
                return;
            }

            const response = await fetch('/api/search/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query })
            });
            
            if (!response.ok) {
                throw new Error('Ошибка поиска');
            }
            
            const data = await response.json();
            this.currentResults = data.results;
            
            document.dispatchEvent(new CustomEvent('search-results', {
                detail: data.results
            }));

            // Показываем все результаты на карте
            this.mapService.showAllResults(data.results);
            
        } catch (error) {
            console.error('Ошибка поиска:', error);
            document.dispatchEvent(new CustomEvent('search-error', {
                detail: 'Не удалось выполнить поиск'
            }));
        }
    }

    handleResultClick(result) {
        this.mapService.highlightPlace(result);
    }
}

new App();
