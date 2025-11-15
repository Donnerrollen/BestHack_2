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
            <div class="results-container">
                <h2>Результаты поиска</h2>
                <div class="results-list" id="resultsList"></div>
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
        
        if (!results || results.length === 0) {
            container.innerHTML = '<div class="no-results">Ничего не найдено</div>';
            return;
        }

        container.innerHTML = results.map(result => `
            <div class="result-item" data-id="${result.id}">
                <div class="result-address">${result.address}</div>
                <div class="result-coordinates">
                    <span class="coord-item">
                        <strong>Широта:</strong> ${result.lat.toFixed(6)}
                    </span>
                    <span class="coord-item">
                        <strong>Долгота:</strong> ${result.lon.toFixed(6)}
                    </span>
                </div>
                <div class="result-meta">
                    <div class="result-score">
                        <div class="score-value">${result.score}%</div>
                        <div class="score-label">соответствие</div>
                    </div>
                    <button class="result-action">Показать на карте</button>
                </div>
            </div>
        `).join('');

        this.addResultListeners();
    }

    addResultListeners() {
        this.querySelectorAll('.result-item').forEach(item => {
            const resultId = parseInt(item.dataset.id);
            const result = this.results.find(r => r.id === resultId);
            
            if (!result) return;
            
            // Клик по всей карточке
            item.addEventListener('click', (e) => {
                // Не срабатывает при клике на кнопку
                if (!e.target.classList.contains('result-action')) {
                    this.selectResult(result);
                }
            });

            // Клик по кнопке "Показать на карте"
            const actionBtn = item.querySelector('.result-action');
            actionBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Предотвращаем срабатывание клика по карточке
                this.selectResult(result);
            });
        });
    }

    selectResult(result) {
        // Добавляем класс активности к выбранной карточке
        this.querySelectorAll('.result-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const selectedItem = this.querySelector(`[data-id="${result.id}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }
        
        // Отправляем событие с выбранным результатом
        document.dispatchEvent(new CustomEvent('result-click', {
            detail: result
        }));
    }
}
