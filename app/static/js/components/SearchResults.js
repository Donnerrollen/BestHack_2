export default class SearchResults extends HTMLElement {
    constructor() {
        super();
        this.results = [];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="mt-4">
                <h2 class="h5 mb-3">Результаты поиска</h2>
                <div id="resultsList"></div>
            </div>
        `;
    }

    setupEventListeners() {
        document.addEventListener('search-results', (event) => {
            this.updateResults(event.detail);
        });
    }

    updateResults(results) {
        this.results = results;
        const container = this.querySelector('#resultsList');
        
        if (results.length === 0) {
            container.innerHTML = '<p class="text-muted">Ничего не найдено</p>';
            return;
        }

        container.innerHTML = results.map(result => `
            <div class="result-item p-3 border-bottom" data-id="${result.id}">
                <h6 class="mb-1">${result.name}</h6>
                <p class="text-muted small mb-1">${result.address}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-warning">★ ${result.rating}</small>
                    <button class="btn btn-sm btn-outline-primary">Показать</button>
                </div>
            </div>
        `).join('');

        this.addResultListeners();
    }

    addResultListeners() {
        this.querySelectorAll('.result-item').forEach(item => {
            item.addEventListener('click', () => {
                const resultId = parseInt(item.dataset.id);
                const result = this.results.find(r => r.id === resultId);
                document.dispatchEvent(new CustomEvent('result-click', {
                    detail: result
                }));
            });
        });
    }
}
