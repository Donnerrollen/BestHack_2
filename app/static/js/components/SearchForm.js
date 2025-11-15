export default class SearchForm extends HTMLElement {
    constructor() {
        super();
        this.debounceTimeout = null;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <form class="search-form">
                <div class="search-input-wrapper">
                    <input 
                        type="text" 
                        class="search-input" 
                        placeholder="Введите название места, адрес..."
                        id="searchInput"
                    >
                </div>
                <div class="search-actions">
                    <button type="button" class="clear-btn">Очистить</button>
                    <button type="submit" class="search-btn">Найти</button>
                </div>
            </form>
        `;
    }

    setupEventListeners() {
        const form = this.querySelector('form');
        const input = this.querySelector('#searchInput');
        const clearBtn = this.querySelector('.clear-btn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        input.addEventListener('input', (e) => {
            this.handleInput(e.target.value);
            this.toggleClearButton(e.target.value);
        });

        clearBtn.addEventListener('click', () => {
            this.clearSearch();
        });

        // Показывать/скрывать кнопку очистки
        this.toggleClearButton(input.value);
    }

    toggleClearButton(value) {
        const clearBtn = this.querySelector('.clear-btn');
        clearBtn.style.display = value ? 'block' : 'none';
    }

    clearSearch() {
        const input = this.querySelector('#searchInput');
        input.value = '';
        input.focus();
        this.toggleClearButton('');
        document.dispatchEvent(new CustomEvent('search', {
            detail: ''
        }));
    }

    handleInput(value) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            if (value.length >= 2 || value.length === 0) {
                this.handleSearch();
            }
        }, 400);
    }

    handleSearch() {
        const query = this.querySelector('#searchInput').value.trim();
        document.dispatchEvent(new CustomEvent('search', {
            detail: query
        }));
    }
}
