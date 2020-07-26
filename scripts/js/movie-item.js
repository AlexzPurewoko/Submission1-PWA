
/**
 * Data of class
 * const attribute = {
 *      name: '',
 *      date: '',
 *      rating: <float max 5 otherwise will returned 5>,
 *      voteCount: <int>,
 *      genres: <splitted commas strings>,
 *      posterPath: <path to image (src),
 *      overview: ''
 * }
 */

class MovieItem extends HTMLElement {
    constructor() {
        super();
    }
    render(_movieData) {
        this.innerHTML = `
            <div class='row white-text'>
                <div class='col s12 m3 l2'>
                    <img style="display:block;margin-left:auto;margin-right:auto;" class="materialbox responsive-img hoverable" alt='movie poster' src='${_movieData.posterPath}' onerror="this.onerror=null;this.src='/data/images/warning-icon.svg';">
                </div>
                <div class='col s12 m9 l10'>
                    <h4 class="white-text" style="margin-bottom:0;">${_movieData.name}</h4>
                    <h6 style="margin-top: 2px;">${_movieData.date}</h6>
                    <div style='width: 100%;height: auto;'>
                        <starred-rating class='left yellow-text' rate='${_movieData.rating}' show='true'></starred-rating>
                        <div style='margin-left: 10px;'>
                            <p style="margin-bottom: 0;">(${_movieData.voteCount})</p>
                        </div>
                    </div>
                    <div class='row'>
                        <div class="col s12">
                            <genre-list class='left' items='${_movieData.genres}' show ='true'></genre-list>
                        </div>
                        <div class='col s12'>
                            <p>${_movieData.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        console.log(this.innerHTML);
    }
}
customElements.define('movie-item', MovieItem);