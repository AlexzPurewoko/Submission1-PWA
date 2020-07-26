class MovieLatest extends MainUIController {
    constructor() {
        super();
    }

    setPreData(data){
        this._genres = data;
    }

    addCallbacks(callbacks){
        
    }
    
    reload() {
        if(this._genres){
        // load from inet...
        Data.getLatest((fail, response, error) => {
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
        const title = $(`
            <h4 style='font-weight:bold;'class='center-align white-text'>Latest Movie</h4>
        `);
        let content = null;
        if(fail){
            content = $(`
                <h5 class="white-text">No latest here! <i class='material-icons'>sentiment_satisfied</i></h4>
            `);
        } else {
            content = $('<movie-item></movie-item>');
            console.log(response);
            content[0].render(response);
            
        }
        $(this).append(title).append(content);
    }
}

customElements.define('movie-latest', MovieLatest);