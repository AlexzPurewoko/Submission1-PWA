class GenreBadges extends HTMLElement {
    constructor(){
        super();
        this._isShow = false;
        this._genres = '';
        this.render();
    }

    set genres(genre){
        this._genres = genre;
        this._updateAttrs();
    }

    get genres() {
        return this._genres;
    }

    toggleShow(){
        this._isShow = !this._isShow;
        this._updateAttrs();
    }

    _updateAttrs() {
        this.setAttribute('items', this._genres);
        this.setAttribute('show', this._isShow);
        this.render();
    }

    render() {
        let content = '<div style="display:block;">';
        this._genres.split(',').forEach(item => {
            if(item != '')
                content += `
                    <span style='margin-left:0;margin-right:10px;font-weight: bold;' class="new badge red" data-badge-caption='${item}'></span>
                `;
        });
        content+='</div>';
        this.innerHTML = content;
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue != newValue){
            if(name === 'items'){
                this._genres = newValue;
            }
            if(name === 'show'){
                this._isShow = newValue === 'true' ? true : false;
            }
            this.render();
        }
    }

    static get observedAttributes()  {
        return ['items', 'show']
    }
}
customElements.define('genre-list', GenreBadges);