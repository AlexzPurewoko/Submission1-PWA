// movieListData.... needs jquery 
/**
 * movieData -> [
 *  {
 *      name: <string>,
 *      date: <string>,
 *      rating: <float>,
 *      voteCount: <int>
 *      genres: ['', ''],
 *      posterPath: <string>,
 *      overview: <string>
 *  }
 * ]
 * 
 * callbackEvent(click) -> function(index, movieData){}
 */

class MovieList extends HTMLElement {
    
    set clickEvent(event) {
        this._clickEvent = event;
    }

    set movieData(data) {
        this._movieData = data;
        this._render();
    }

    _render() {
        if(this._movieData){
            this.innerHTML = '';
            let cnt = $('<div class="row"></div>');
            this._movieData.forEach(element => {
                cnt.append($(`
                    <div class='movie-card'>
                        <div class="col s6 m2">
                            <div class="card grey darken-4">
                                <div class="card-image">
                                    <img class='hoverable' src="${element.posterPath}" onerror="this.onerror=null;this.src='data/images/warning-icon.svg';">
                                </div>
                            </div>
                        </div>
                    </div>
                `));
            });
            $(this).append(cnt);
            const eventClick = this._clickEvent;
            const mvData = this._movieData;
            cnt.children().each(function(index){
                if(eventClick){
                    $(this).on('click', _ => {
                        eventClick(index, mvData[index]);
                    })
                }
            });
        }
    }
}
customElements.define('movie-list', MovieList);