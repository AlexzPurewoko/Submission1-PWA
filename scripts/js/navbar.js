class NavBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="nav-extended grey darken-4">
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo" style="padding-left: 10px;"><i class="material-icons">live_tv</i>movie</a>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger waves-effect"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down">
                    <li id='toolbar-home' class="waves-effect tooltipped" data-position='left' data-tooltip='Home'><a><i class="material-icons">home</i></a></li>
                    <li id='toolbar-info' class="waves-effect tooltipped" data-position='left' data-tooltip='Info'><a><i class="material-icons">info</i></a></li>
                </ul>
                <ul class="right">
                    <li id="toolbar-refresh" class="waves-effect tooltipped" data-position='left' data-tooltip='Reload'><a><i class="material-icons">refresh</i></a></li>
                </ul>
            </div>
            <div class="nav-content">
                <ul class="tabs tabs-transparent">
                    <li class="tab" id='nav-discover'><a class='waves-effect active'>DISCOVER</a></li>
                    <li class="tab" id='nav-trending'><a class="waves-effect">TRENDING</a></li>
                    <li class="tab" id='nav-latest'><a class="waves-effect">LATEST</a></li>
                </ul>
            </div>
        </nav>
        `;
    }
}
customElements.define('nav-bar', NavBar);