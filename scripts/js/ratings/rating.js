class StarredRatings extends HTMLElement {
    constructor(){
        super();
        this._rate = 0.0;
        this._isShow = false;
        this.render();
    }

    set rate(rate){
        this._rate = rate > 5 ? 5 : rate;
        this._updateAttrs();
    }

    get rate() {
        return this._rate;
    }

    toggleShow(){
        this._isShow = !this._isShow;
        this._updateAttrs();
    }

    render() {
        let content = '';
        let _p = Math.floor(this._rate * 10 % 10),
            _f = Math.floor(this._rate);
        // grow max _f
        let _i = 0;
        for (; _i < _f; _i++){
            content+= '<i class="material-icons">star</i>';
        }
        // any half ?
        if(_f != 5) content += `<i class='material-icons'>${_p < 5 ? 'star_border' : 'star_half'}</i>`;
        // if less than 4, add more regular stars
        for(_i = 0; _i < 4 - _f; _i++){
            content+='<i class="material-icons">star_border</i>';
        }
        this.innerHTML = content;
    }

    _updateAttrs() {
        this.setAttribute('rate', this._rate);
        this.setAttribute('show', this._isShow);
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(oldValue != newValue){
            if(name === 'rate'){
                const nValue = parseFloat(newValue);
                this._rate = (nValue > 5) ? 5 : nValue;
                console.log(this._rate);
            }
            if(name === 'show'){
                this._isShow = newValue === 'true' ? true : false;
            }
            this.render();
        }
    }

    static get observedAttributes() {
        return ['rate', 'show'];
    }
}
customElements.define('starred-rating', StarredRatings);