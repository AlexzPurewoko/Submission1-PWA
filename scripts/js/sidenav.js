class SideNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <ul id="mobile-demo" class="sidenav grey darken-4 white-text" >
            <li>
                <div class="user-view">
                    <div class="background">
                        <img src="data/images/office.jpg">
                    </div>
                    <a href="#user"><img class="circle" src="data/images/me.jpg"></a>
                    <a href="#name"><span class="white-text name" style="font-weight: bold;font-family: sans-serif;">Alexzander Purwoko Widiantoro</span></a>
                    <a href="#email"><span class="white-text email" style="font-family: sans-serif;">purwoko908@gmail.com</span></a>
                </div>
            </li>
            <li><a id='sidenav-home' class="waves-effect white-text" href="#!" style="font-weight: bold;"><i class="material-icons white-text">home</i>Home</a></li>
            <li><a id='sidenav-about' class="waves-effect white-text" href="#!" style="font-weight: bold;"><i class="material-icons white-text">info</i>About Me</a></li>
        </ul>
        `;
    }
}
customElements.define('side-nav', SideNav);