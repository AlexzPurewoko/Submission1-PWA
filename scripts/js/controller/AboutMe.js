class AboutMe extends MainUIController {
    constructor() {
        super();
    }
    setPreData(data){

    }

    addCallbacks(callbacks){

    }
    
    reload() {
        this._render();
    }
    _render() {
        this.innerHTML = `
        <div class="container">
            <div class="card grey darken-4">
                <div class="card-content white-text">
                    <div class="row">
                        <div class="col s12 m4 l4 xl4 valign-wrapper">
                            <img class="responsive-img valign-wrapper" src="/data/images/movie-banner.svg" width="650">
                        </div>
                        <div class="col s12 m8 l8 xl8">
                            <span class="card-title text-bold" style="font-weight:bold;margin-top:10px;">Movie Apps</span>
                            <p style="font-weight: 400;">Created by Alexzander Purwoko Widiantoro</p>
                            <p style="margin-top: 10px;">Lets know everything's about movie around the world! Take a look and enjoy! Hopefully you love my articles. Thank you :).</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}
customElements.define('about-me', AboutMe);