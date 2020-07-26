class MovieDetail extends MainUIController {
    constructor() {
        super();
    }

    setPreData(data){
        this._movieData = data;
    }

    addCallbacks(callbacks){
        this._backCallbacks = callbacks;
    }
    
    reload() {
        this._render();
    }

    _render() {
        this.innerHTML = '';
        const fab = $(`
            <div class="fixed-action-btn tooltipped" data-position='top' data-tooltip='Go back'>
                <a class="btn-floating btn-large red waves-effect waves-light">
                    <i class="large material-icons">arrow_back</i>
                </a>
            </div>
        `);
        let content = null;
        if(this._movieData){
            content = $('<movie-item></movie-item>');
            console.log(content[0]);
            content[0].render(this._movieData);
        } else {
            content = $(`
                <h4 class="white-text">Cannot show the detail. Your content is null <i class='material-icons'>sentiment_dissatisfied</i></h4>
            `);
        }
        fab.on('click', this._backCallbacks);
        $(this).append(content).append(fab);
    }
}

customElements.define('movie-detail', MovieDetail);