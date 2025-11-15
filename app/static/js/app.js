import SearchForm from '/static/js/components/SearchForm.js';
import SearchResults from '/static/js/components/SearchResults.js';
import MapService from '/static/js/services/MapService.js';

class App {
    constructor() {
        this.mapService = new MapService();
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
    }

    async handleSearch(query) {
        try {
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
            document.dispatchEvent(new CustomEvent('search-results', {
                detail: data.results
            }));
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
