// scopes for global variable
const states = {
    discover: "STATE_DISCOVER",
    trending: "STATE_TRENDING",
    latest: "STATE_LATEST",
    about: "STATE_ABOUT",
    detail: "STATE_DETAIL"
};

let state = {

    // a perform back button (states)
    previousState: null,

    // indicates current state running (states)
    currentState: null,

    // data to managed (ex: STATE_DETAIL)
    preferredData: null
}

let genres = null;

const uiManager = {
    discover: $('<movie-discover></movie-discover>'),
    trending: $('<movie-trending></movie-trending>'),
    latest: $('<movie-latest></movie-latest>'),
    about: $('<about-me></about-me>'),
    detail: $('<movie-detail></movie-detail>'),
    progressView : $(`
        <div style='width:100%;'>
            <div class="preloader-wrapper active center-align" style='display:block;margin-left:auto;margin-right:auto;margin-top:40px;'>
                <div class="spinner-layer spinner-red-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
    `)
}
// run on ready
$(_ => {
    M.AutoInit();

    // init all elements on main.... (from uiManager)
    initAllElements();

    // starts the loading 
    uiManager.progressView.show();

    Data.loadGenres((fail, response, error) => {
        if(fail){
            M.toast({html: `Error1: ${error}. Click reload to try again...`});
        } else {
            genres = response;
            initializeUI();
        }
    });
})

function initializeUI() {
    // set onclick handlers for tab layout 
    $('#nav-discover').on('click', () => {
        handleTabs(state.currentState, uiManager.discover);
    })
    $('#nav-trending').on('click', () => {
        handleTabs(state.currentState, uiManager.trending);
    });
    $('#nav-latest').on('click', () => {
        handleTabs(state.currentState, uiManager.latest);
    });

    // set handlers for reload
    $('#toolbar-refresh').on('click', () => {
        if(state.currentState){
            state.currentState.hide();
            state.currentState[0].reload();
            uiManager.progressView.show();
            setTimeout(() => {
                uiManager.progressView.hide();
                state.currentState.show();
            }, 600);
        }
    })

    // clicking on discover first
    setTimeout(() => {
        $('#nav-discover').click();
    }, 600);
    initToolbar();
    //
}

function initAllElements() {
    $('main')
        .append(uiManager.discover)
        .append(uiManager.trending)
        .append(uiManager.latest)
        .append(uiManager.about)
        .append(uiManager.detail)
        .append(uiManager.progressView);

    // lets hide all
    uiManager.discover.hide();
    uiManager.trending.hide();
    uiManager.latest.hide();
    uiManager.about.hide();
    uiManager.detail.hide();
    uiManager.progressView.hide();
}

function onItemGoDetail(index, movies){
    $('.nav-content').slideUp('slow');
    state.currentState.hide();
    uiManager.progressView.show();
    state.previousState = state.currentState;
    state.currentState = uiManager.detail;
    state.preferredData = () => {
        state.currentState.fadeOut('500', () => {
            state.previousState.show();
            const s = state.previousState;
            state.previousState = state.currentState;
            state.currentState = s;
            $('.nav-content').slideDown('slow');
        });
    }

    uiManager.detail[0].addCallbacks(state.preferredData);
    uiManager.detail[0].setPreData(movies);
    uiManager.detail[0].reload();
    setTimeout(() => {
        uiManager.progressView.hide();
        uiManager.detail.fadeIn('slow');
    }, 500);
}

// for handling tabs only
function handleTabs(current, next){
    updateTabsUI(current, next);
    state.currentState[0].setPreData(genres);
    state.currentState[0].addCallbacks(state.preferredData);
    state.currentState[0].reload();
}
function updateTabsUI(current, next){
    uiManager.progressView.hide();
    if(current)
        current.hide();
    next.show();
    state.previousState = current;
    state.currentState = next;
    state.preferredData = onItemGoDetail;
}

// function for handling about me
function initToolbar() {
    const sidenav = M.Sidenav.getInstance($('.sidenav')[0]);
    const homeHandler = _ => {
        if(state.currentState === uiManager.about){
            if(state.previousState === uiManager.detail){
                state.currentState = state.previousState;
                state.previousState = state.preferredData;
                uiManager.about.fadeOut('fast', _ => {
                    state.currentState.fadeIn();
                });
            } else {
                const a = state.previousState;
                state.previousState = state.currentState;
                state.currentState = a;
                state.previousState.fadeOut('fast', _ => {
                    state.currentState.fadeIn();
                });

                $('.nav-content').slideDown('slow');
            }
        } else if(state.currentState === uiManager.detail){
            const a = state.previousState;
            state.currentState.hide();
            state.previousState.show();
            state.previousState = state.currentState;
            state.currentState = state.previousState;
            state.preferredData = onItemGoDetail;
        }
    };

    const aboutHandler = _ => {
        if(state.currentState !== uiManager.about){

            $('.nav-content').slideUp('slow', () => {
                M.toast({html: `Click Home navigation to go back`});
            });
            uiManager.about[0].reload();
            if(state.currentState === uiManager.detail){
                state.preferredData = state.previousState;
                state.previousState = state.currentState;
                state.currentState = uiManager.about;
            } else {
                state.previousState = state.currentState;
                state.currentState = uiManager.about;
            }
            state.previousState.fadeOut('fast', _ => {
                state.currentState.fadeIn();
            });
        }
    }
    $('#sidenav-home').on('click', function() {
        homeHandler();
        sidenav.close();
    });
    $('#sidenav-about').on('click', function() {
        aboutHandler();
        sidenav.close();
    });

    // for toolbar area
    $('#toolbar-home').on('click', _ => {
        homeHandler();
    });
    $('#toolbar-info').on('click', _ => {
        aboutHandler();
    });
}