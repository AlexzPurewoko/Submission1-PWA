class MovieDiscover extends MainUIController {
    constructor() {
        super();
    }

    // pre-data is genres.
    setPreData(data){
        this._genres = data;
    }

    /**
     * 
     * @param {function(int, JSON)} callbacks 
     */
    addCallbacks(callbacks){
        this._clickItemCallbacks = callbacks;
    }
    
    reload() {
        if(this._genres){
            // load from inet...
            Data.getDiscover((fail, response, error) => {
                if(fail){
                    this._render(true, error)
                } else {
                    this._render(false, response);
                }
            }, this._genres);
        }
    }

    _render(fail, response) {
        this.innerHTML = '';
        if(fail){
            M.toast({html: `Error: ${response}`});
        } else {
            const element = document.createElement('movie-list');
            element.clickEvent = this._clickItemCallbacks;
            element.movieData = response;
            this.appendChild(element);
        }
    }
}

customElements.define('movie-discover', MovieDiscover);