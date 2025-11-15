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
            <form class="d-flex gap-2">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Введите адрес..."
                    id="searchInput"
                >
                <button type="submit" class="btn btn-primary">Найти</button>
            </form>
        `;
    }

    setupEventListeners() {
        this.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        this.querySelector('#searchInput').addEventListener('input', (e) => {
            this.handleInput(e.target.value);
        });
    }

    handleInput(value) {
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            if (value.length >= 3) {
                this.handleSearch();
            }
        }, 500);
    }

    handleSearch() {
        const query = this.querySelector('#searchInput').value.trim();
        if (query) {
            document.dispatchEvent(new CustomEvent('search', {
                detail: query
            }));
        }
    }
}
