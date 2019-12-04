/*jslint browser: true, evil: true */

// define correct path for files inclusion
var scripts = document.getElementsByTagName('script'),
    path = scripts[scripts.length - 1].src.split('?')[0],
    GDPRtoolkitForceCDN = (GDPRtoolkitForceCDN === undefined) ? '' : GDPRtoolkitForceCDN,
    cdn = (GDPRtoolkitForceCDN === '') ? path.split('/').slice(0, -1).join('/') + '/' : GDPRtoolkitForceCDN,
    alreadyLaunch = (alreadyLaunch === undefined) ? 0 : alreadyLaunch,
    GDPRtoolkitForceLanguage = (GDPRtoolkitForceLanguage === undefined) ? '' : GDPRtoolkitForceLanguage,
    GDPRtoolkitForceExpire = (GDPRtoolkitForceExpire === undefined) ? '' : GDPRtoolkitForceExpire,
    GDPRtoolkitCustomText = (GDPRtoolkitCustomText === undefined) ? '' : GDPRtoolkitCustomText,
    // GDPRtoolkitExpireInDay: true for day(s) value - false for hour(s) value
    GDPRtoolkitExpireInDay = (GDPRtoolkitExpireInDay === undefined || typeof GDPRtoolkitExpireInDay !== "boolean") ? true : GDPRtoolkitExpireInDay,
    timeExpire = 31536000000,
    GDPRtoolkitProLoadServices,
    GDPRtoolkitNoAdBlocker = false;



var GDPRtoolkit = {
    "version": 20191031,
    "cdn": cdn,
    "user": {},
    "lang": {},
    "services": {},
    "added": [],
    "idprocessed": [],
    "state": [],
    "launch": [],
    "parameters": {},
    "isAjax": false,
    "reloadThePage": false,
    "events": {
        "init": function () {},
        "load": function () {},
    },
    "init": function (params) {
        "use strict";
        var origOpen;

        GDPRtoolkit.parameters = params;
        if (alreadyLaunch === 0) {
            alreadyLaunch = 1;
            if (window.addEventListener) {
                window.addEventListener("load", function () {
                    GDPRtoolkit.load();
                    GDPRtoolkit.fallback(['GDPRtoolkitOpenPanel'], function (elem) {
                        elem.addEventListener("click", function (event) {
                            GDPRtoolkit.userInterface.openPanel();
                            event.preventDefault();
                        }, false);
                    }, true);
                }, false);
                window.addEventListener("scroll", function () {
                    var scrollPos = window.pageYOffset || document.documentElement.scrollTop,
                        heightPosition;
                    if (document.getElementById('GDPRtoolkitAlertBig') !== null && !GDPRtoolkit.highPrivacy) {
                        if (document.getElementById('GDPRtoolkitAlertBig').style.display === 'block') {
                            heightPosition = document.getElementById('GDPRtoolkitAlertBig').offsetHeight + 'px';

                            if (scrollPos > (screen.height * 2)) {
                                GDPRtoolkit.userInterface.respondAll(true);
                            } else if (scrollPos > (screen.height / 2)) {
                                document.getElementById('GDPRtoolkitDisclaimerAlert').innerHTML = '<strong>' + GDPRtoolkit.lang.alertBigScroll + '</strong> ' + GDPRtoolkit.lang.alertBig;
                            }

                            if (GDPRtoolkit.orientation === 'top') {
                                document.getElementById('GDPRtoolkitPercentage').style.top = heightPosition;
                            } else {
                                document.getElementById('GDPRtoolkitPercentage').style.bottom = heightPosition;
                            }
                            document.getElementById('GDPRtoolkitPercentage').style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
                        }
                    }
                }, false);

                window.addEventListener("keydown", function (evt) {
                    if (evt.keyCode === 27) {
                        GDPRtoolkit.userInterface.closePanel();
                    }
                }, false);
                window.addEventListener("hashchange", function () {
                    if (document.location.hash === GDPRtoolkit.hashtag && GDPRtoolkit.hashtag !== '') {
                        GDPRtoolkit.userInterface.openPanel();
                    }
                }, false);
                window.addEventListener("resize", function () {
                    if (document.getElementById('GDPRtoolkit') !== null) {
                        if (document.getElementById('GDPRtoolkit').style.display === 'block') {
                            GDPRtoolkit.userInterface.jsSizing('main');
                        }
                    }

                    if (document.getElementById('GDPRtoolkitCookiesListContainer') !== null) {
                        if (document.getElementById('GDPRtoolkitCookiesListContainer').style.display === 'block') {
                            GDPRtoolkit.userInterface.jsSizing('cookie');
                        }
                    }
                }, false);
            } else {
                window.attachEvent("onload", function () {
                    GDPRtoolkit.load();
                    GDPRtoolkit.fallback(['GDPRtoolkitOpenPanel'], function (elem) {
                        elem.attachEvent("onclick", function (event) {
                            GDPRtoolkit.userInterface.openPanel();
                            event.preventDefault();
                        });
                    }, true);
                });
                window.attachEvent("onscroll", function () {
                    var scrollPos = window.pageYOffset || document.documentElement.scrollTop,
                        heightPosition;
                    if (document.getElementById('GDPRtoolkitAlertBig') !== null && !GDPRtoolkit.highPrivacy) {
                        if (document.getElementById('GDPRtoolkitAlertBig').style.display === 'block') {
                            heightPosition = document.getElementById('GDPRtoolkitAlertBig').offsetHeight + 'px';

                            if (scrollPos > (screen.height * 2)) {
                                GDPRtoolkit.userInterface.respondAll(true);
                            } else if (scrollPos > (screen.height / 2)) {
                                document.getElementById('GDPRtoolkitDisclaimerAlert').innerHTML = '<strong>' + GDPRtoolkit.lang.alertBigScroll + '</strong> ' + GDPRtoolkit.lang.alertBig;
                            }
                            if (GDPRtoolkit.orientation === 'top') {
                                document.getElementById('GDPRtoolkitPercentage').style.top = heightPosition;
                            } else {
                                document.getElementById('GDPRtoolkitPercentage').style.bottom = heightPosition;
                            }
                            document.getElementById('GDPRtoolkitPercentage').style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
                        }
                    }
                });
                window.attachEvent("onkeydown", function (evt) {
                    if (evt.keyCode === 27) {
                        GDPRtoolkit.userInterface.closePanel();
                    }

                    if ( evt.keyCode === 9 && focusableEls.indexOf(evt.target) >= 0) {
                        if ( evt.shiftKey ) /* shift + tab */ {
                            if (document.activeElement === firstFocusableEl) {
                                lastFocusableEl.focus();
                                evt.preventDefault();
                            }
                        } else /* tab */ {
                            if (document.activeElement === lastFocusableEl) {
                                firstFocusableEl.focus();
                                evt.preventDefault();
                            }
                        }
                    }

                });
                window.attachEvent("onhashchange", function () {
                    if (document.location.hash === GDPRtoolkit.hashtag && GDPRtoolkit.hashtag !== '') {
                        GDPRtoolkit.userInterface.openPanel();
                    }
                });
                window.attachEvent("onresize", function () {
                    if (document.getElementById('GDPRtoolkit') !== null) {
                        if (document.getElementById('GDPRtoolkit').style.display === 'block') {
                            GDPRtoolkit.userInterface.jsSizing('main');
                        }
                    }

                    if (document.getElementById('GDPRtoolkitCookiesListContainer') !== null) {
                        if (document.getElementById('GDPRtoolkitCookiesListContainer').style.display === 'block') {
                            GDPRtoolkit.userInterface.jsSizing('cookie');
                        }
                    }
                });
            }

            if (typeof XMLHttpRequest !== 'undefined') {
                origOpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function () {

                    if (window.addEventListener) {
                        this.addEventListener("load", function () {
                            if (typeof GDPRtoolkitProLoadServices === 'function') {
                                GDPRtoolkitProLoadServices();
                            }
                        }, false);
                    } else if (typeof this.attachEvent !== 'undefined') {
                        this.attachEvent("onload", function () {
                            if (typeof GDPRtoolkitProLoadServices === 'function') {
                                GDPRtoolkitProLoadServices();
                            }
                        });
                    } else {
                        if (typeof GDPRtoolkitProLoadServices === 'function') {
                            setTimeout(GDPRtoolkitProLoadServices, 1000);
                        }
                    }

                    try {
                        origOpen.apply(this, arguments);
                    } catch (err) {}
                };
            }
        }

        if(GDPRtoolkit.events.init) {
            GDPRtoolkit.events.init();
        }
    },
    "load": function () {
        "use strict";
        var cdn = GDPRtoolkit.cdn,
            language = GDPRtoolkit.getLanguage(),
            pathToLang = cdn + 'lang/GDPRtoolkit.' + language + '.js?v=' + GDPRtoolkit.version,
            pathToServices = cdn + 'GDPRtoolkit.services.js?v=' + GDPRtoolkit.version,
            linkElement = document.createElement('link'),
            defaults = {
                "adblocker": false,
                "hashtag": '#GDPRtoolkit',
                "cookieName": 'GDPRtoolkit',
                "highPrivacy": true,
                "orientation": "middle",
                "removeCredit": false,
                "showAlertSmall": true,
                "cookieslist": true,
                "handleBrowserDNTRequest": false,
                "AcceptAllCta" : true,
                "moreInfoLink": true,
                "privacyUrl": "",
                "useExternalCss": false,
                "useExternalJs": false
            },
            params = GDPRtoolkit.parameters;

        // Step -1      
        if (typeof GDPRtoolkitCustomPremium !== 'undefined') {        
            GDPRtoolkitCustomPremium();       
        }
        
        // Step 0: get params
        if (params !== undefined) {

            for (var k in defaults) {
                if(!GDPRtoolkit.parameters.hasOwnProperty(k)) {
                    GDPRtoolkit.parameters[k] = defaults[k];
                }
            }
        }

        // global
        GDPRtoolkit.orientation = GDPRtoolkit.parameters.orientation;
        GDPRtoolkit.hashtag = GDPRtoolkit.parameters.hashtag;
        GDPRtoolkit.highPrivacy = GDPRtoolkit.parameters.highPrivacy;
        GDPRtoolkit.handleBrowserDNTRequest = GDPRtoolkit.parameters.handleBrowserDNTRequest;

        // Step 1: load css
        if ( !GDPRtoolkit.parameters.useExternalCss ) {
            linkElement.rel = 'stylesheet';
            linkElement.type = 'text/css';
            linkElement.href = cdn + 'css/GDPRtoolkit.css?v=' + GDPRtoolkit.version;
            document.getElementsByTagName('head')[0].appendChild(linkElement);
        }
        // Step 2: load language and services
        GDPRtoolkit.addScript(pathToLang, '', function () {

          if(GDPRtoolkitCustomText !== ''){
            GDPRtoolkit.lang = GDPRtoolkit.AddOrUpdate(GDPRtoolkit.lang, GDPRtoolkitCustomText);
          }
            GDPRtoolkit.addScript(pathToServices, '', function () {


                // css for new middle bar
                if (GDPRtoolkit.orientation === 'middle') {
                    var customThemeMiddle = document.createElement('style'),
                        cssRuleMiddle = 'div#GDPRtoolkitRoot.GDPRtoolkitBeforeVisible:before {content: \'\';position: fixed;width: 100%;height: 100%;background: white;top: 0;left: 0;z-index: 999;opacity: 0.5;}div#GDPRtoolkitAlertBig:before {content: \'' + GDPRtoolkit.lang.middleBarHead + '\';font-size: 50px;}body #GDPRtoolkitRoot div#GDPRtoolkitAlertBig {width: 60%;min-width: 285px;height: auto;margin: auto;left: 50%;top: 50%;transform: translate(-50%, -50%);box-shadow: 0 0 9000px #000;border-radius: 20px;padding: 50px 0;}span#GDPRtoolkitDisclaimerAlert {padding: 0 30px;}#GDPRtoolkitRoot span#GDPRtoolkitDisclaimerAlert {margin: 50px 0;display: block;text-align: center;font-size: 21px;}';

                    customThemeMiddle.type = 'text/css';
                    if (customThemeMiddle.styleSheet) {
                        customThemeMiddle.styleSheet.cssText = cssRuleMiddle;
                    } else {
                        customThemeMiddle.appendChild(document.createTextNode(cssRuleMiddle));
                    }
                    document.getElementsByTagName('head')[0].appendChild(customThemeMiddle);
                }

                var body = document.body,
                    div = document.createElement('div'),
                    html = '',
                    index,
                    orientation = 'Top',
                    cat = ['ads', 'analytic', 'api', 'comment', 'social', 'support', 'video', 'other'],
                    i;

                cat = cat.sort(function (a, b) {
                    if (GDPRtoolkit.lang[a].title > GDPRtoolkit.lang[b].title) { return 1; }
                    if (GDPRtoolkit.lang[a].title < GDPRtoolkit.lang[b].title) { return -1; }
                    return 0;
                });

                // Step 3: prepare the html
                html += '<div id="GDPRtoolkitPremium"></div>';
                html += '<button type="button" id="GDPRtoolkitBack" onclick="GDPRtoolkit.userInterface.closePanel();" aria-label="' + GDPRtoolkit.lang.close + '"></button>';
                html += '<div id="GDPRtoolkit" role="dialog" aria-labelledby="dialogTitle">';
                html += '   <button type="button" id="GDPRtoolkitClosePanel" onclick="GDPRtoolkit.userInterface.closePanel();">';
                html += '       ' + GDPRtoolkit.lang.close;
                html += '   </button>';
                html += '   <div id="GDPRtoolkitServices">';
                html += '      <div class="GDPRtoolkitLine GDPRtoolkitMainLine" id="GDPRtoolkitMainLineOffset">';
                html += '         <span class="GDPRtoolkitH1" role="heading" aria-level="1" id="dialogTitle">'+ GDPRtoolkit.lang.title + '</span>';
                html += '         <div id="GDPRtoolkitInfo" class="GDPRtoolkitInfoBox">';
                html += '         ' + GDPRtoolkit.lang.disclaimer;
                if (GDPRtoolkit.parameters.privacyUrl !== "") {
                    html += '   <br/><br/>';
                    html += '   <button type="button" id="GDPRtoolkitPrivacyUrlDialog" onclick="document.location = GDPRtoolkit.parameters.privacyUrl">';
                    html += '       ' + GDPRtoolkit.lang.privacyUrl;
                    html += '   </button>';
                }
                html += '         </div>';
                html += '         <div class="GDPRtoolkitName">';
                html += '            <span class="GDPRtoolkitH2" role="heading" aria-level="2">' + GDPRtoolkit.lang.all + '</span>';
                html += '         </div>';
                html += '         <div class="GDPRtoolkitAsk" id="GDPRtoolkitScrollbarAdjust">';
                html += '            <button type="button" id="GDPRtoolkitAllAllowed" class="GDPRtoolkitAllow" onclick="GDPRtoolkit.userInterface.respondAll(true);">';
                html += '               &#10003; ' + GDPRtoolkit.lang.allowAll;
                html += '            </button> ';
                html += '            <button type="button" id="GDPRtoolkitAllDenied" class="GDPRtoolkitDeny" onclick="GDPRtoolkit.userInterface.respondAll(false);">';
                html += '               &#10007; ' + GDPRtoolkit.lang.denyAll;
                html += '            </button>';
                html += '         </div>';
                html += '      </div>';
                html += '      <div class="GDPRtoolkitBorder">';
                html += '         <div class="clear"></div><ul>';
                for (i = 0; i < cat.length; i += 1) {
                    html += '         <li id="GDPRtoolkitServicesTitle_' + cat[i] + '" class="GDPRtoolkitHidden">';
                    html += '            <div class="GDPRtoolkitTitle">';
                    html += '               <button type="button" onclick="GDPRtoolkit.userInterface.toggle(\'GDPRtoolkitDetails' + cat[i] + '\', \'GDPRtoolkitInfoBox\');return false">&#10011; ' + GDPRtoolkit.lang[cat[i]].title + '</button>';
                    html += '            </div>';
                    html += '            <div id="GDPRtoolkitDetails' + cat[i] + '" class="GDPRtoolkitDetails GDPRtoolkitInfoBox">';
                    html += '               ' + GDPRtoolkit.lang[cat[i]].details;
                    html += '            </div>';
                    html += '         <ul id="GDPRtoolkitServices_' + cat[i] + '"></ul></li>';
                }
                html += '             <li id="GDPRtoolkitNoServicesTitle" class="GDPRtoolkitLine">' + GDPRtoolkit.lang.noServices + '</li>';
                html += '         </ul>';
                html += '         <div class="GDPRtoolkitHidden" id="GDPRtoolkitScrollbarChild" style="height:20px;display:block"></div>';
                if (GDPRtoolkit.parameters.removeCredit === false) {
                    html += '     <a class="GDPRtoolkitSelfLink" href="https://opt-out.ferank.eu/" rel="nofollow noreferrer noopener" target="_blank" title="GDPRtoolkit ' + GDPRtoolkit.lang.newWindow + '">🍋 ' + GDPRtoolkit.lang.credit + '</a>';
                }
                html += '       </div>';
                html += '   </div>';
                html += '</div>';

                if (GDPRtoolkit.parameters.orientation === 'bottom') {
                    orientation = 'Bottom';
                }

                if (GDPRtoolkit.parameters.highPrivacy && !GDPRtoolkit.parameters.AcceptAllCta) {
                    html += '<div id="GDPRtoolkitAlertBig" class="GDPRtoolkitAlertBig' + orientation + '">';
                    //html += '<div class="GDPRtoolkitAlertBigWrapper">';
                    html += '   <span id="GDPRtoolkitDisclaimerAlert">';
                    html += '       ' + GDPRtoolkit.lang.alertBigPrivacy;
                    html += '   </span>';
                    //html += '   <span class="GDPRtoolkitAlertBigBtnWrapper">';
                    html += '   <button type="button" id="GDPRtoolkitPersonalize" onclick="GDPRtoolkit.userInterface.openPanel();">';
                    html += '       ' + GDPRtoolkit.lang.personalize;
                    html += '   </button>';

                    if (GDPRtoolkit.parameters.privacyUrl !== "") {
                        html += '   <button type="button" id="GDPRtoolkitPrivacyUrl" onclick="document.location = GDPRtoolkit.parameters.privacyUrl">';
                        html += '       ' + GDPRtoolkit.lang.privacyUrl;
                        html += '   </button>';
                    }
                    
                    //html += '   </span>';
                    //html += '</div>';
                    html += '</div>';
                } else {
                    html += '<div id="GDPRtoolkitAlertBig" class="GDPRtoolkitAlertBig' + orientation + '">';
                    //html += '<div class="GDPRtoolkitAlertBigWrapper">';
                    html += '   <span id="GDPRtoolkitDisclaimerAlert">';

                    if (GDPRtoolkit.parameters.highPrivacy) {
                        html += '       ' + GDPRtoolkit.lang.alertBigPrivacy;
                    } else {
                        html += '       ' + GDPRtoolkit.lang.alertBigClick + ' ' + GDPRtoolkit.lang.alertBig;
                    }

                    html += '   </span>';
                    //html += '   <span class="GDPRtoolkitAlertBigBtnWrapper">';
                    html += '   <button type="button" id="GDPRtoolkitPersonalize" onclick="GDPRtoolkit.userInterface.respondAll(true);">';
                    html += '       &#10003; ' + GDPRtoolkit.lang.acceptAll;
                    html += '   </button>';
                    html += '   <button type="button" id="GDPRtoolkitCloseAlert" onclick="GDPRtoolkit.userInterface.openPanel();">';
                    html += '       ' + GDPRtoolkit.lang.personalize;
                    html += '   </button>';

                    if (GDPRtoolkit.parameters.privacyUrl !== "") {
                        html += '   <button type="button" id="GDPRtoolkitPrivacyUrl" onclick="document.location = GDPRtoolkit.parameters.privacyUrl">';
                        html += '       ' + GDPRtoolkit.lang.privacyUrl;
                        html += '   </button>';
                    }

                    //html += '   </span>';
                    //html += '</div>';
                    html += '</div>';
                    html += '<div id="GDPRtoolkitPercentage"></div>';
                }

                if (GDPRtoolkit.parameters.showAlertSmall === true) {
                    html += '<div id="GDPRtoolkitAlertSmall" class="GDPRtoolkitAlertSmall' + orientation + '">';
                    html += '   <button type="button" id="GDPRtoolkitManager" onclick="GDPRtoolkit.userInterface.openPanel();">';
                    html += '       ' + GDPRtoolkit.lang.alertSmall;
                    html += '       <span id="GDPRtoolkitDot">';
                    html += '           <span id="GDPRtoolkitDotGreen"></span>';
                    html += '           <span id="GDPRtoolkitDotYellow"></span>';
                    html += '           <span id="GDPRtoolkitDotRed"></span>';
                    html += '       </span>';
                    if (GDPRtoolkit.parameters.cookieslist === true) {
                        html += '   </button><!-- @whitespace';
                        html += '   --><button type="button" id="GDPRtoolkitCookiesNumber" onclick="GDPRtoolkit.userInterface.toggleCookiesList();">0</button>';
                        html += '   <div id="GDPRtoolkitCookiesListContainer">';
                        html += '       <button type="button" id="GDPRtoolkitClosePanelCookie" onclick="GDPRtoolkit.userInterface.closePanel();">';
                        html += '           ' + GDPRtoolkit.lang.close;
                        html += '       </button>';
                        html += '       <div class="GDPRtoolkitCookiesListMain" id="GDPRtoolkitCookiesTitle">';
                        html += '            <span class="GDPRtoolkitH2" role="heading" aria-level="2" id="GDPRtoolkitCookiesNumberBis">0 cookie</span>';
                        html += '       </div>';
                        html += '       <div id="GDPRtoolkitCookiesList"></div>';
                        html += '    </div>';
                    } else {
                        html += '   </div>';
                    }
                    html += '</div>';
                }

                GDPRtoolkit.addScript(GDPRtoolkit.cdn + 'advertising.js?v=' + GDPRtoolkit.version, '', function () {
                    if (GDPRtoolkitNoAdBlocker === true || GDPRtoolkit.parameters.adblocker === false) {

                        // create a wrapper container at the same level than GDPRtoolkit so we can add an aria-hidden when GDPRtoolkit is opened
                        /*var wrapper = document.createElement('div');
                        wrapper.id = "contentWrapper";

                        while (document.body.firstChild)
                        {
                            wrapper.appendChild(document.body.firstChild);
                        }

                        // Append the wrapper to the body
                        document.body.appendChild(wrapper);*/

                        div.id = 'GDPRtoolkitRoot';
                        body.appendChild(div, body);
                        div.innerHTML = html;
                        
                        //ie compatibility
                        var tacRootAvailableEvent;
                        if(typeof(Event) === 'function') {
                            tacRootAvailableEvent = new Event("tac.root_available");
                        }else{
                            tacRootAvailableEvent = document.createEvent('Event');
                            tacRootAvailableEvent.initEvent("tac.root_available", true, true);
                        }
                        //end ie compatibility
                        
                        window.dispatchEvent(tacRootAvailableEvent);

                        if (GDPRtoolkit.job !== undefined) {
                            GDPRtoolkit.job = GDPRtoolkit.cleanArray(GDPRtoolkit.job);
                            for (index = 0; index < GDPRtoolkit.job.length; index += 1) {
                                GDPRtoolkit.addService(GDPRtoolkit.job[index]);
                            }
                        } else {
                            GDPRtoolkit.job = []
                        }

                        GDPRtoolkit.isAjax = true;

                        GDPRtoolkit.job.push = function (id) {

                            // ie <9 hack
                            if (typeof GDPRtoolkit.job.indexOf === 'undefined') {
                                GDPRtoolkit.job.indexOf = function (obj, start) {
                                    var i,
                                        j = this.length;
                                    for (i = (start || 0); i < j; i += 1) {
                                        if (this[i] === obj) { return i; }
                                    }
                                    return -1;
                                };
                            }

                            if (GDPRtoolkit.job.indexOf(id) === -1) {
                                Array.prototype.push.call(this, id);
                            }
                            GDPRtoolkit.launch[id] = false;
                            GDPRtoolkit.addService(id);
                        };

                        if (document.location.hash === GDPRtoolkit.hashtag && GDPRtoolkit.hashtag !== '') {
                            GDPRtoolkit.userInterface.openPanel();
                        }

                        GDPRtoolkit.cookie.number();
                        setInterval(GDPRtoolkit.cookie.number, 60000);
                    }
                }, GDPRtoolkit.parameters.adblocker);

                if (GDPRtoolkit.parameters.adblocker === true) {
                    setTimeout(function () {
                        if (GDPRtoolkitNoAdBlocker === false) {
                            html = '<div id="GDPRtoolkitAlertBig" class="GDPRtoolkitAlertBig' + orientation + '" style="display:block" role="alert" aria-live="polite">';
                            html += '   <p id="GDPRtoolkitDisclaimerAlert">';
                            html += '       ' + GDPRtoolkit.lang.adblock + '<br/>';
                            html += '       <strong>' + GDPRtoolkit.lang.adblock_call + '</strong>';
                            html += '   </p>';
                            html += '   <button type="button" id="GDPRtoolkitPersonalize" onclick="location.reload();">';
                            html += '       ' + GDPRtoolkit.lang.reload;
                            html += '   </button>';
                            html += '</div>';
                            html += '<div id="GDPRtoolkitPremium"></div>';

                            div.id = 'GDPRtoolkitRoot';
                            body.appendChild(div, body);
                            div.innerHTML = html;
                        }
                    }, 1500);
                }
            });
        });

        if(GDPRtoolkit.events.load) {
            GDPRtoolkit.events.load();
        }
    },
    "addService": function (serviceId) {
        "use strict";
        var html = '',
            s = GDPRtoolkit.services,
            service = s[serviceId],
            cookie = GDPRtoolkit.cookie.read(),
            hostname = document.location.hostname,
            hostRef = document.referrer.split('/')[2],
            isNavigating = (hostRef === hostname && window.location.href !== GDPRtoolkit.parameters.privacyUrl),
            isAutostart = (!service.needConsent),
            isWaiting = (cookie.indexOf(service.key + '=wait') >= 0),
            isDenied = (cookie.indexOf(service.key + '=false') >= 0),
            isAllowed = (cookie.indexOf(service.key + '=true') >= 0),
            isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0),
            isDNTRequested = (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1" || window.doNotTrack === "1");

        if (GDPRtoolkit.added[service.key] !== true) {
            GDPRtoolkit.added[service.key] = true;

            html += '<li id="' + service.key + 'Line" class="GDPRtoolkitLine">';
            html += '   <div class="GDPRtoolkitName">';
            html += '       <span class="GDPRtoolkitH3" role="heading" aria-level="3">' + service.name + '</span>';
            html += '       <span id="tacCL' + service.key + '" class="GDPRtoolkitListCookies"></span><br/>';

            if (GDPRtoolkit.parameters.moreInfoLink == true) {

                var link = 'https://opt-out.ferank.eu/service/' + service.key + '/';
                if (service.readmoreLink !== undefined && service.readmoreLink !== '') {
                    link = service.readmoreLink;
                }
                if (GDPRtoolkit.parameters.readmoreLink !== undefined && GDPRtoolkit.parameters.readmoreLink !== '') {
                    link = GDPRtoolkit.parameters.readmoreLink;
                }
                html += '       <a href="' + link + '" target="_blank" rel="noreferrer noopener" title="'+ GDPRtoolkit.lang.cookieDetail + ' ' + service.name + ' ' + GDPRtoolkit.lang.ourSite + ' ' + GDPRtoolkit.lang.newWindow +'">';
                html += '           ' + GDPRtoolkit.lang.more;
                html += '       </a>';
                html += '        - ';
                html += '       <a href="' + service.uri + '" target="_blank" rel="noreferrer noopener" title="' + service.name + ' ' + GDPRtoolkit.lang.newWindow + '">';
                html += '           ' + GDPRtoolkit.lang.source;
                html += '       </a>';
            }

            html += '   </div>';
            html += '   <div class="GDPRtoolkitAsk">';
            html += '       <button type="button" id="' + service.key + 'Allowed" class="GDPRtoolkitAllow" onclick="GDPRtoolkit.userInterface.respond(this, true);">';
            html += '           &#10003; ' + GDPRtoolkit.lang.allow;
            html += '       </button> ';
            html += '       <button type="button" id="' + service.key  + 'Denied" class="GDPRtoolkitDeny" onclick="GDPRtoolkit.userInterface.respond(this, false);">';
            html += '           &#10007; ' + GDPRtoolkit.lang.deny;
            html += '       </button>';
            html += '   </div>';
            html += '</li>';

            GDPRtoolkit.userInterface.css('GDPRtoolkitServicesTitle_' + service.type, 'display', 'block');

            if (document.getElementById('GDPRtoolkitServices_' + service.type) !== null) {
                document.getElementById('GDPRtoolkitServices_' + service.type).innerHTML += html;
            }

            GDPRtoolkit.userInterface.css('GDPRtoolkitNoServicesTitle', 'display', 'none');

            GDPRtoolkit.userInterface.order(service.type);
        }

        GDPRtoolkit.pro('!' + service.key + '=' + isAllowed);

        // allow by default for non EU
        if (isResponded === false && GDPRtoolkit.user.bypass === true) {
            isAllowed = true;
            GDPRtoolkit.cookie.create(service.key, true);
        }

        if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !GDPRtoolkit.highPrivacy) || isAllowed) {
            if (!isAllowed) {
                GDPRtoolkit.cookie.create(service.key, true);
            }
            if (GDPRtoolkit.launch[service.key] !== true) {
                GDPRtoolkit.launch[service.key] = true;
                service.js();
                GDPRtoolkit.sendEvent(service.key + '_loaded');
            }
            GDPRtoolkit.state[service.key] = true;
            GDPRtoolkit.userInterface.color(service.key, true);
        } else if (isDenied) {
            if (typeof service.fallback === 'function') {
                service.fallback();
            }
            GDPRtoolkit.state[service.key] = false;
            GDPRtoolkit.userInterface.color(service.key, false);
        } else if (!isResponded && isDNTRequested && GDPRtoolkit.handleBrowserDNTRequest) {
            GDPRtoolkit.cookie.create(service.key, 'false');
            if (typeof service.fallback === 'function') {
                service.fallback();
            }
            GDPRtoolkit.state[service.key] = false;
            GDPRtoolkit.userInterface.color(service.key, false);
        } else if (!isResponded) {
            GDPRtoolkit.cookie.create(service.key, 'wait');
            if (typeof service.fallback === 'function') {
                service.fallback();
            }
            GDPRtoolkit.userInterface.color(service.key, 'wait');
            GDPRtoolkit.userInterface.openAlert();
        }

        GDPRtoolkit.cookie.checkCount(service.key);
    },
    "sendEvent" : function(event_key) {
        if(event_key !== undefined) {
            //ie compatibility
            var send_event_item;
            if(typeof(Event) === 'function') {
                send_event_item = new Event(event_key);
            }else{
                send_event_item = document.createEvent('Event');
                send_event_item.initEvent(event_key, true, true);
            }
            //end ie compatibility

            document.dispatchEvent(send_event_item);
        }
    },
    "cleanArray": function cleanArray(arr) {
        "use strict";
        var i,
            len = arr.length,
            out = [],
            obj = {},
            s = GDPRtoolkit.services;

        for (i = 0; i < len; i += 1) {
            if (!obj[arr[i]]) {
                obj[arr[i]] = {};
                if (GDPRtoolkit.services[arr[i]] !== undefined) {
                    out.push(arr[i]);
                }
            }
        }

        out = out.sort(function (a, b) {
            if (s[a].type + s[a].key > s[b].type + s[b].key) { return 1; }
            if (s[a].type + s[a].key < s[b].type + s[b].key) { return -1; }
            return 0;
        });

        return out;
    },
    "userInterface": {
        "css": function (id, property, value) {
            "use strict";
            if (document.getElementById(id) !== null) {
                document.getElementById(id).style[property] = value;
            }
        },
        "addClass": function (id, className) {
            "use strict";
            if (document.getElementById(id) !== null) {
                document.getElementById(id).classList.add(className);
            }
        },
        "removeClass": function (id, className) {
            "use strict";
            if (document.getElementById(id) !== null) {
                document.getElementById(id).classList.remove(className);
            }
        },
        "respondAll": function (status) {
            "use strict";
            var s = GDPRtoolkit.services,
                service,
                key,
                index = 0;

            for (index = 0; index < GDPRtoolkit.job.length; index += 1) {
                service = s[GDPRtoolkit.job[index]];
                key = service.key;
                if (GDPRtoolkit.state[key] !== status) {
                    if (status === false && GDPRtoolkit.launch[key] === true) {
                        GDPRtoolkit.reloadThePage = true;
                    }
                    if (GDPRtoolkit.launch[key] !== true && status === true) {

                        GDPRtoolkit.pro('!' + key + '=engage');

                        GDPRtoolkit.launch[key] = true;
                        GDPRtoolkit.services[key].js();
                    }
                    GDPRtoolkit.state[key] = status;
                    GDPRtoolkit.cookie.create(key, status);
                    GDPRtoolkit.userInterface.color(key, status);
                }
            }
        },
        "respond": function (el, status) {
            "use strict";
            var key = el.id.replace(new RegExp("(Eng[0-9]+|Allow|Deni)ed", "g"), '');

            // return if same state
            if (GDPRtoolkit.state[key] === status) {
                return;
            }

            if (status === false && GDPRtoolkit.launch[key] === true) {
                GDPRtoolkit.reloadThePage = true;
            }

            // if not already launched... launch the service
            if (status === true) {
                if (GDPRtoolkit.launch[key] !== true) {

                    GDPRtoolkit.pro('!' + key + '=engage');

                    GDPRtoolkit.launch[key] = true;
                    GDPRtoolkit.services[key].js();
                }
            }
            GDPRtoolkit.state[key] = status;
            GDPRtoolkit.cookie.create(key, status);
            GDPRtoolkit.userInterface.color(key, status);
        },
        "color": function (key, status) {
            "use strict";
            var c = 'GDPRtoolkit',
                nbDenied = 0,
                nbPending = 0,
                nbAllowed = 0,
                sum = GDPRtoolkit.job.length,
                index;

            if (status === true) {
                document.getElementById(key + 'Line').classList.add('GDPRtoolkitIsAllowed');
                document.getElementById(key + 'Line').classList.remove('GDPRtoolkitIsDenied');
            } else if (status === false) {
                document.getElementById(key + 'Line').classList.remove('GDPRtoolkitIsAllowed');
                document.getElementById(key + 'Line').classList.add('GDPRtoolkitIsDenied');
            }

            // check if all services are allowed
            for (index = 0; index < sum; index += 1) {
                if (GDPRtoolkit.state[GDPRtoolkit.job[index]] === false) {
                    nbDenied += 1;
                } else if (GDPRtoolkit.state[GDPRtoolkit.job[index]] === undefined) {
                    nbPending += 1;
                } else if (GDPRtoolkit.state[GDPRtoolkit.job[index]] === true) {
                    nbAllowed += 1;
                }
            }

            GDPRtoolkit.userInterface.css(c + 'DotGreen', 'width', ((100 / sum) * nbAllowed) + '%');
            GDPRtoolkit.userInterface.css(c + 'DotYellow', 'width', ((100 / sum) * nbPending) + '%');
            GDPRtoolkit.userInterface.css(c + 'DotRed', 'width', ((100 / sum) * nbDenied) + '%');

            if (nbDenied === 0 && nbPending === 0) {
                GDPRtoolkit.userInterface.removeClass(c + 'AllDenied', c + 'IsSelected');
                GDPRtoolkit.userInterface.addClass(c + 'AllAllowed', c + 'IsSelected');

                GDPRtoolkit.userInterface.addClass(c + 'MainLineOffset', c + 'IsAllowed');
                GDPRtoolkit.userInterface.removeClass(c + 'MainLineOffset', c + 'IsDenied');
            } else if (nbAllowed === 0 && nbPending === 0) {
                GDPRtoolkit.userInterface.removeClass(c + 'AllAllowed', c + 'IsSelected');
                GDPRtoolkit.userInterface.addClass(c + 'AllDenied', c + 'IsSelected');

                GDPRtoolkit.userInterface.removeClass(c + 'MainLineOffset', c + 'IsAllowed');
                GDPRtoolkit.userInterface.addClass(c + 'MainLineOffset', c + 'IsDenied');
            } else {
                GDPRtoolkit.userInterface.removeClass(c + 'AllAllowed', c + 'IsSelected');
                GDPRtoolkit.userInterface.removeClass(c + 'AllDenied', c + 'IsSelected');

                GDPRtoolkit.userInterface.removeClass(c + 'MainLineOffset', c + 'IsAllowed');
                GDPRtoolkit.userInterface.removeClass(c + 'MainLineOffset', c + 'IsDenied');
            }

            // close the alert if all service have been reviewed
            if (nbPending === 0) {
                GDPRtoolkit.userInterface.closeAlert();
            }

            if (GDPRtoolkit.services[key].cookies.length > 0 && status === false) {
                GDPRtoolkit.cookie.purge(GDPRtoolkit.services[key].cookies);
            }

            if (status === true) {
                if (document.getElementById('tacCL' + key) !== null) {
                    document.getElementById('tacCL' + key).innerHTML = '...';
                }
                setTimeout(function () {
                    GDPRtoolkit.cookie.checkCount(key);
                }, 2500);
            } else {
                GDPRtoolkit.cookie.checkCount(key);
            }
        },
        "openPanel": function () {
            "use strict";

            GDPRtoolkit.userInterface.css('GDPRtoolkit', 'display', 'block');
            GDPRtoolkit.userInterface.css('GDPRtoolkitBack', 'display', 'block');
            GDPRtoolkit.userInterface.css('GDPRtoolkitCookiesListContainer', 'display', 'none');

            document.getElementById('GDPRtoolkitClosePanel').focus();
            document.getElementsByTagName('body')[0].classList.add('modal-open');
            GDPRtoolkit.userInterface.focusTrap();
            GDPRtoolkit.userInterface.jsSizing('main');
            
            //ie compatibility
            var tacOpenPanelEvent;
            if(typeof(Event) === 'function') {
                tacOpenPanelEvent = new Event("tac.open_panel");
            }else{
                tacOpenPanelEvent = document.createEvent('Event');
                tacOpenPanelEvent.initEvent("tac.open_panel", true, true);
            }
            //end ie compatibility
            
            window.dispatchEvent(tacOpenPanelEvent);
        },
        "closePanel": function () {
            "use strict";

            if (document.location.hash === GDPRtoolkit.hashtag) {
                if (window.history) {
                    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
                } else {
                    document.location.hash = '';
                }
            }
            GDPRtoolkit.userInterface.css('GDPRtoolkit', 'display', 'none');
            GDPRtoolkit.userInterface.css('GDPRtoolkitCookiesListContainer', 'display', 'none');

            GDPRtoolkit.fallback(['GDPRtoolkitInfoBox'], function (elem) {
                elem.style.display = 'none';
            }, true);

            if (GDPRtoolkit.reloadThePage === true) {
                window.location.reload();
            } else {
                GDPRtoolkit.userInterface.css('GDPRtoolkitBack', 'display', 'none');
            }
            if (document.getElementById('GDPRtoolkitCloseAlert') !== null) {
                document.getElementById('GDPRtoolkitCloseAlert').focus();
            }
            document.getElementsByTagName('body')[0].classList.remove('modal-open');
            
            //ie compatibility
            var tacClosePanelEvent;
            if(typeof(Event) === 'function') {
                tacClosePanelEvent = new Event("tac.close_panel");
            }else{
                tacClosePanelEvent = document.createEvent('Event');
                tacClosePanelEvent.initEvent("tac.close_panel", true, true);
            }
            //end ie compatibility
            
            window.dispatchEvent(tacClosePanelEvent);
        },
        "focusTrap": function() {
            "use strict";

            var focusableEls,
                firstFocusableEl,
                lastFocusableEl,
                filtered;

            focusableEls = document.getElementById('GDPRtoolkit').querySelectorAll('a[href], button');
            filtered = [];

            // get only visible items
            for (var i = 0, max = focusableEls.length; i < max; i++) {
                if (focusableEls[i].offsetHeight > 0) {
                   filtered.push(focusableEls[i]);
                }
            }

            firstFocusableEl = filtered[0];
            lastFocusableEl = filtered[filtered.length - 1];

            //loop focus inside GDPRtoolkit
            document.getElementById('GDPRtoolkit').addEventListener("keydown", function (evt) {

                if ( evt.key === 'Tab' || evt.keyCode === 9 ) {

                    if ( evt.shiftKey ) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            evt.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            evt.preventDefault();
                        }
                    }
                }
            })
        },
        "openAlert": function () {
            "use strict";
            var c = 'GDPRtoolkit';
            GDPRtoolkit.userInterface.css(c + 'Percentage', 'display', 'block');
            GDPRtoolkit.userInterface.css(c + 'AlertSmall', 'display', 'none');
            GDPRtoolkit.userInterface.css(c + 'AlertBig',   'display', 'block');
            GDPRtoolkit.userInterface.addClass(c + 'Root',   'GDPRtoolkitBeforeVisible');

            //ie compatibility
            var tacOpenAlertEvent;
            if(typeof(Event) === 'function') {
                tacOpenAlertEvent = new Event("tac.open_alert");
            }else{
                tacOpenAlertEvent = document.createEvent('Event');
                tacOpenAlertEvent.initEvent("tac.open_alert", true, true);
            }
            //end ie compatibility
            
            window.dispatchEvent(tacOpenAlertEvent);
        },
        "closeAlert": function () {
            "use strict";
            var c = 'GDPRtoolkit';
            GDPRtoolkit.userInterface.css(c + 'Percentage', 'display', 'none');
            GDPRtoolkit.userInterface.css(c + 'AlertSmall', 'display', 'block');
            GDPRtoolkit.userInterface.css(c + 'AlertBig',   'display', 'none');
            GDPRtoolkit.userInterface.removeClass(c + 'Root',   'GDPRtoolkitBeforeVisible');
            GDPRtoolkit.userInterface.jsSizing('box');
            
            //ie compatibility
            var tacCloseAlertEvent;
            if(typeof(Event) === 'function') {
                tacCloseAlertEvent = new Event("tac.close_alert");
            }else{
                tacCloseAlertEvent = document.createEvent('Event');
                tacCloseAlertEvent.initEvent("tac.close_alert", true, true);
            }
            //end ie compatibility
            
            window.dispatchEvent(tacCloseAlertEvent);
        },
        "toggleCookiesList": function () {
            "use strict";
            var div = document.getElementById('GDPRtoolkitCookiesListContainer');

            if (div === null) {
                return;
            }

            if (div.style.display !== 'block') {
                GDPRtoolkit.cookie.number();
                div.style.display = 'block';
                GDPRtoolkit.userInterface.jsSizing('cookie');
                GDPRtoolkit.userInterface.css('GDPRtoolkit', 'display', 'none');
                GDPRtoolkit.userInterface.css('GDPRtoolkitBack', 'display', 'block');
                GDPRtoolkit.fallback(['GDPRtoolkitInfoBox'], function (elem) {
                    elem.style.display = 'none';
                }, true);
            } else {
                div.style.display = 'none';
                GDPRtoolkit.userInterface.css('GDPRtoolkit', 'display', 'none');
                GDPRtoolkit.userInterface.css('GDPRtoolkitBack', 'display', 'none');
            }
        },
        "toggle": function (id, closeClass) {
            "use strict";
            var div = document.getElementById(id);

            if (div === null) {
                return;
            }

            if (closeClass !== undefined) {
                GDPRtoolkit.fallback([closeClass], function (elem) {
                    if (elem.id !== id) {
                        elem.style.display = 'none';
                    }
                }, true);
            }

            if (div.style.display !== 'block') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        },
        "order": function (id) {
            "use strict";
            var main = document.getElementById('GDPRtoolkitServices_' + id),
                allDivs,
                store = [],
                i;

            if (main === null) {
                return;
            }

            allDivs = main.childNodes;

            if (typeof Array.prototype.map === 'function' && typeof Enumerable === 'undefined') {
                Array.prototype.map.call(main.children, Object).sort(function (a, b) {
                //var mainChildren = Array.from(main.children);
                //mainChildren.sort(function (a, b) {
                    if (GDPRtoolkit.services[a.id.replace(/Line/g, '')].name > GDPRtoolkit.services[b.id.replace(/Line/g, '')].name) { return 1; }
                    if (GDPRtoolkit.services[a.id.replace(/Line/g, '')].name < GDPRtoolkit.services[b.id.replace(/Line/g, '')].name) { return -1; }
                    return 0;
                }).forEach(function (element) {
                    main.appendChild(element);
                });
            }
        },
        "jsSizing": function (type) {
            "use strict";
            var scrollbarMarginRight = 10,
                scrollbarWidthParent,
                scrollbarWidthChild,
                servicesHeight,
                e = window,
                a = 'inner',
                windowInnerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                mainTop,
                mainHeight,
                closeButtonHeight,
                headerHeight,
                cookiesListHeight,
                cookiesCloseHeight,
                cookiesTitleHeight,
                paddingBox,
                alertSmallHeight,
                cookiesNumberHeight;

            if (type === 'box') {
                if (document.getElementById('GDPRtoolkitAlertSmall') !== null && document.getElementById('GDPRtoolkitCookiesNumber') !== null) {

                    // reset
                    GDPRtoolkit.userInterface.css('GDPRtoolkitCookiesNumber', 'padding', '0px 10px');

                    // calculate
                    alertSmallHeight = document.getElementById('GDPRtoolkitAlertSmall').offsetHeight;
                    cookiesNumberHeight = document.getElementById('GDPRtoolkitCookiesNumber').offsetHeight;
                    paddingBox = (alertSmallHeight - cookiesNumberHeight) / 2;

                    // apply
                    GDPRtoolkit.userInterface.css('GDPRtoolkitCookiesNumber', 'padding', paddingBox + 'px 10px');
                }
            } else if (type === 'main') {

                // get the real window width for media query
                if (window.innerWidth === undefined) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }

                // height of the services list container
                if (document.getElementById('GDPRtoolkit') !== null && document.getElementById('GDPRtoolkitClosePanel') !== null && document.getElementById('GDPRtoolkitMainLineOffset') !== null) {

                    // reset
                    GDPRtoolkit.userInterface.css('GDPRtoolkitServices', 'height', 'auto');

                    // calculate
                    mainHeight = document.getElementById('GDPRtoolkit').offsetHeight;
                    closeButtonHeight = document.getElementById('GDPRtoolkitClosePanel').offsetHeight;

                    // apply
                    servicesHeight = (mainHeight - closeButtonHeight + 2);
                    GDPRtoolkit.userInterface.css('GDPRtoolkitServices', 'height', servicesHeight + 'px');
                    GDPRtoolkit.userInterface.css('GDPRtoolkitServices', 'overflow-x', 'auto');
                }

                // align the main allow/deny button depending on scrollbar width
                if (document.getElementById('GDPRtoolkitServices') !== null && document.getElementById('GDPRtoolkitScrollbarChild') !== null) {

                    // media query
                    if (e[a + 'Width'] <= 479) {
                        GDPRtoolkit.userInterface.css('GDPRtoolkitScrollbarAdjust', 'marginLeft', '11px');
                    } else if (e[a + 'Width'] <= 767) {
                        scrollbarMarginRight = 12;
                    }

                    scrollbarWidthParent = document.getElementById('GDPRtoolkitServices').offsetWidth;
                    scrollbarWidthChild = document.getElementById('GDPRtoolkitScrollbarChild').offsetWidth;
                    GDPRtoolkit.userInterface.css('GDPRtoolkitScrollbarAdjust', 'marginRight', ((scrollbarWidthParent - scrollbarWidthChild) + scrollbarMarginRight) + 'px');
                }

                // center the main panel
                if (document.getElementById('GDPRtoolkit') !== null) {

                    // media query
                    if (e[a + 'Width'] <= 767) {
                        mainTop = 0;
                    } else {
                        mainTop = ((windowInnerHeight - document.getElementById('GDPRtoolkit').offsetHeight) / 2) - 21;
                    }

                    if (document.getElementById('GDPRtoolkitMainLineOffset') !== null) {
                        if (document.getElementById('GDPRtoolkit').offsetHeight < (windowInnerHeight / 2)) {
                            mainTop -= document.getElementById('GDPRtoolkitMainLineOffset').offsetHeight;
                        }
                    }

                    // correct
                    if (mainTop < 0) {
                        mainTop = 0;
                    }

                    // apply
                    GDPRtoolkit.userInterface.css('GDPRtoolkit', 'top', mainTop + 'px');
                }


            } else if (type === 'cookie') {

                // put cookies list at bottom
                if (document.getElementById('GDPRtoolkitAlertSmall') !== null) {
                    GDPRtoolkit.userInterface.css('GDPRtoolkitCookiesListContainer', 'bottom', (document.getElementById('GDPRtoolkitAlertSmall').offsetHeight) + 'px');
                }

                // height of cookies list
                if (document.getElementById('GDPRtoolkitCookiesListContainer') !== null) {

                    // reset
                    GDPRtoolkit.userInterface.css('GDPRtoolkitCookiesList', 'height', 'auto');

                    // calculate
                    cookiesListHeight = document.getElementById('GDPRtoolkitCookiesListContainer').offsetHeight;
                    cookiesCloseHeight = document.getElementById('GDPRtoolkitClosePanelCookie').offsetHeight;
                    cookiesTitleHeight = document.getElementById('GDPRtoolkitCookiesTitle').offsetHeight;

                    // apply
                    GDPRtoolkit.userInterface.css('GDPRtoolkitCookiesList', 'height', (cookiesListHeight - cookiesCloseHeight - cookiesTitleHeight - 2) + 'px');
                }
            }
        }
    },
    "cookie": {
        "owner": {},
        "create": function (key, status) {
            "use strict";

            if (GDPRtoolkitForceExpire !== '') {
                // The number of day(s)/hour(s) can't be higher than 1 year
                if ((GDPRtoolkitExpireInDay && GDPRtoolkitForceExpire < 365) || (!GDPRtoolkitExpireInDay && GDPRtoolkitForceExpire < 8760)) {
                    if (GDPRtoolkitExpireInDay) {
                        // Multiplication to tranform the number of days to milliseconds
                        timeExpire = GDPRtoolkitForceExpire * 86400000;
                    } else {
                        // Multiplication to tranform the number of hours to milliseconds
                        timeExpire = GDPRtoolkitForceExpire * 3600000;
                    }
                }
            }

            var d = new Date(),
                time = d.getTime(),
                expireTime = time + timeExpire, // 365 days
                regex = new RegExp("!" + key + "=(wait|true|false)", "g"),
                cookie = GDPRtoolkit.cookie.read().replace(regex, ""),
                value = GDPRtoolkit.parameters.cookieName + '=' + cookie + '!' + key + '=' + status,
                domain = (GDPRtoolkit.parameters.cookieDomain !== undefined && GDPRtoolkit.parameters.cookieDomain !== '') ? 'domain=' + GDPRtoolkit.parameters.cookieDomain + ';' : '';

            d.setTime(expireTime);
            document.cookie = value + '; expires=' + d.toGMTString() + '; path=/;' + domain;
        },
        "read": function () {
            "use strict";
            var nameEQ = GDPRtoolkit.parameters.cookieName + "=",
                ca = document.cookie.split(';'),
                i,
                c;

            for (i = 0; i < ca.length; i += 1) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return '';
        },
        "purge": function (arr) {
            "use strict";
            var i;

            for (i = 0; i < arr.length; i += 1) {
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';';
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';';
            }
        },
        "checkCount": function (key) {
            "use strict";
            var arr = GDPRtoolkit.services[key].cookies,
                nb = arr.length,
                nbCurrent = 0,
                html = '',
                i,
                status = document.cookie.indexOf(key + '=true');

            if (status >= 0 && nb === 0) {
                html += GDPRtoolkit.lang.useNoCookie;
            } else if (status >= 0) {
                for (i = 0; i < nb; i += 1) {
                    if (document.cookie.indexOf(arr[i] + '=') !== -1) {
                        nbCurrent += 1;
                        if (GDPRtoolkit.cookie.owner[arr[i]] === undefined) {
                            GDPRtoolkit.cookie.owner[arr[i]] = [];
                        }
                        if (GDPRtoolkit.cookie.crossIndexOf(GDPRtoolkit.cookie.owner[arr[i]], GDPRtoolkit.services[key].name) === false) {
                            GDPRtoolkit.cookie.owner[arr[i]].push(GDPRtoolkit.services[key].name);
                        }
                    }
                }

                if (nbCurrent > 0) {
                    html += GDPRtoolkit.lang.useCookieCurrent + ' ' + nbCurrent + ' cookie';
                    if (nbCurrent > 1) {
                        html += 's';
                    }
                    html += '.';
                } else {
                    html += GDPRtoolkit.lang.useNoCookie;
                }
            } else if (nb === 0) {
                html = GDPRtoolkit.lang.noCookie;
            } else {
                html += GDPRtoolkit.lang.useCookie + ' ' + nb + ' cookie';
                if (nb > 1) {
                    html += 's';
                }
                html += '.';
            }

            if (document.getElementById('tacCL' + key) !== null) {
                document.getElementById('tacCL' + key).innerHTML = html;
            }
        },
        "crossIndexOf": function (arr, match) {
            "use strict";
            var i;
            for (i = 0; i < arr.length; i += 1) {
                if (arr[i] === match) {
                    return true;
                }
            }
            return false;
        },
        "number": function () {
            "use strict";
            var cookies = document.cookie.split(';'),
                nb = (document.cookie !== '') ? cookies.length : 0,
                html = '',
                i,
                name,
                namea,
                nameb,
                c,
                d,
                s = (nb > 1) ? 's' : '',
                savedname,
                regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,
                regexedDomain = (GDPRtoolkit.cdn.match(regex) !== null) ? GDPRtoolkit.cdn.match(regex)[1] : GDPRtoolkit.cdn,
                host = (GDPRtoolkit.domain !== undefined) ? GDPRtoolkit.domain : regexedDomain;

            cookies = cookies.sort(function (a, b) {
                namea = a.split('=', 1).toString().replace(/ /g, '');
                nameb = b.split('=', 1).toString().replace(/ /g, '');
                c = (GDPRtoolkit.cookie.owner[namea] !== undefined) ? GDPRtoolkit.cookie.owner[namea] : '0';
                d = (GDPRtoolkit.cookie.owner[nameb] !== undefined) ? GDPRtoolkit.cookie.owner[nameb] : '0';
                if (c + a > d + b) { return 1; }
                if (c + a < d + b) { return -1; }
                return 0;
            });

            if (document.cookie !== '') {
                for (i = 0; i < nb; i += 1) {
                    name = cookies[i].split('=', 1).toString().replace(/ /g, '');
                    if (GDPRtoolkit.cookie.owner[name] !== undefined && GDPRtoolkit.cookie.owner[name].join(' // ') !== savedname) {
                        savedname = GDPRtoolkit.cookie.owner[name].join(' // ');
                        html += '<div class="GDPRtoolkitHidden">';
                        html += '     <span class="GDPRtoolkitTitle GDPRtoolkitH3" role="heading" aria-level="3">';
                        html += '        ' + GDPRtoolkit.cookie.owner[name].join(' // ');
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    } else if (GDPRtoolkit.cookie.owner[name] === undefined && host !== savedname) {
                        savedname = host;
                        html += '<div class="GDPRtoolkitHidden">';
                        html += '     <span class="GDPRtoolkitTitle GDPRtoolkitH3" role="heading" aria-level="3">';
                        html += '        ' + host;
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    }
                    html += '<li class="GDPRtoolkitCookiesListMain">';
                    html += '    <div class="GDPRtoolkitCookiesListLeft"><button type="button" onclick="GDPRtoolkit.cookie.purge([\'' + cookies[i].split('=', 1) + '\']);GDPRtoolkit.cookie.number();GDPRtoolkit.userInterface.jsSizing(\'cookie\');return false"><strong>&times;</strong></button> <strong>' + name + '</strong>';
                    html += '    </div>';
                    html += '    <div class="GDPRtoolkitCookiesListRight">' + cookies[i].split('=').slice(1).join('=') + '</div>';
                    html += '</li>';
                }
                html += '</ul>';
            } else {
                html += '<div class="GDPRtoolkitCookiesListMain">';
                html += '    <div class="GDPRtoolkitCookiesListLeft"><strong>-</strong></div>';
                html += '    <div class="GDPRtoolkitCookiesListRight"></div>';
                html += '</div>';
            }

            html += '<div class="GDPRtoolkitHidden" style="height:20px;display:block"></div>';

            if (document.getElementById('GDPRtoolkitCookiesList') !== null) {
                document.getElementById('GDPRtoolkitCookiesList').innerHTML = html;
            }

            if (document.getElementById('GDPRtoolkitCookiesNumber') !== null) {
                document.getElementById('GDPRtoolkitCookiesNumber').innerHTML = nb;
            }

            if (document.getElementById('GDPRtoolkitCookiesNumberBis') !== null) {
                document.getElementById('GDPRtoolkitCookiesNumberBis').innerHTML = nb + ' cookie' + s;
            }

            for (i = 0; i < GDPRtoolkit.job.length; i += 1) {
                GDPRtoolkit.cookie.checkCount(GDPRtoolkit.job[i]);
            }
        }
    },
    "getLanguage": function () {
        "use strict";

        var availableLanguages = 'cs,de,en,es,fr,it,nl,pl,pt,ru,el,ro,bg,ja,cn',
            defaultLanguage = 'en';
        
        if (GDPRtoolkitForceLanguage !== '') {
            if (availableLanguages.indexOf(GDPRtoolkitForceLanguage) !== -1) {
                return GDPRtoolkitForceLanguage;
            }
        }
        
        if (!navigator) { return 'en'; }
        
        var lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang ? lang.substr(0, 2) : null;

        if (availableLanguages.indexOf(userLanguage) === -1) {
            return defaultLanguage;
        }
        return userLanguage;
    },
    "getLocale": function () {
        "use strict";
        if (!navigator) { return 'en_US'; }

        var lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang ? lang.substr(0, 2) : null;

        if (userLanguage === 'fr') {
            return 'fr_FR';
        } else if (userLanguage === 'en') {
            return 'en_US';
        } else if (userLanguage === 'de') {
            return 'de_DE';
        } else if (userLanguage === 'es') {
            return 'es_ES';
        } else if (userLanguage === 'it') {
            return 'it_IT';
        } else if (userLanguage === 'pt') {
            return 'pt_PT';
        } else if (userLanguage === 'nl') {
            return 'nl_NL';
        } else if (userLanguage === 'el') {
            return 'el_EL';
        } else {
            return 'en_US';
        }
    },
    "addScript": function (url, id, callback, execute, attrName, attrVal) {
        "use strict";
        var script,
            done = false;

        if (execute === false) {
            if (typeof callback === 'function') {
                callback();
            }
        } else {
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = (id !== undefined) ? id : '';
            script.async = true;
            script.src = url;

            if (attrName !== undefined && attrVal !== undefined) {
                script.setAttribute(attrName, attrVal);
            }

            if (typeof callback === 'function') {
                if ( !GDPRtoolkit.parameters.useExternalJs ) {
                    script.onreadystatechange = script.onload = function () {
                        var state = script.readyState;
                        if (!done && (!state || /loaded|complete/.test(state))) {
                            done = true;
                            callback();
                        }
                    };
                } else {
                    callback();
                }
            }

            if ( !GDPRtoolkit.parameters.useExternalJs ) {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    },
    "makeAsync": {
        "antiGhost": 0,
        "buffer": '',
        "init": function (url, id) {
            "use strict";
            var savedWrite = document.write,
                savedWriteln = document.writeln;

            document.write = function (content) {
                GDPRtoolkit.makeAsync.buffer += content;
            };
            document.writeln = function (content) {
                GDPRtoolkit.makeAsync.buffer += content.concat("\n");
            };

            setTimeout(function () {
                document.write = savedWrite;
                document.writeln = savedWriteln;
            }, 20000);

            GDPRtoolkit.makeAsync.getAndParse(url, id);
        },
        "getAndParse": function (url, id) {
            "use strict";
            if (GDPRtoolkit.makeAsync.antiGhost > 9) {
                GDPRtoolkit.makeAsync.antiGhost = 0;
                return;
            }
            GDPRtoolkit.makeAsync.antiGhost += 1;
            GDPRtoolkit.addScript(url, '', function () {
                if (document.getElementById(id) !== null) {
                    document.getElementById(id).innerHTML += "<span style='display:none'>&nbsp;</span>" + GDPRtoolkit.makeAsync.buffer;
                    GDPRtoolkit.makeAsync.buffer = '';
                    GDPRtoolkit.makeAsync.execJS(id);
                }
            });
        },
        "execJS": function (id) {
            /* not strict because third party scripts may have errors */
            var i,
                scripts,
                childId,
                type;

            if (document.getElementById(id) === null) {
                return;
            }

            scripts = document.getElementById(id).getElementsByTagName('script');
            for (i = 0; i < scripts.length; i += 1) {
                type = (scripts[i].getAttribute('type') !== null) ? scripts[i].getAttribute('type') : '';
                if (type === '') {
                    type = (scripts[i].getAttribute('language') !== null) ? scripts[i].getAttribute('language') : '';
                }
                if (scripts[i].getAttribute('src') !== null && scripts[i].getAttribute('src') !== '') {
                    childId = id + Math.floor(Math.random() * 99999999999);
                    document.getElementById(id).innerHTML += '<div id="' + childId + '"></div>';
                    GDPRtoolkit.makeAsync.getAndParse(scripts[i].getAttribute('src'), childId);
                } else if (type.indexOf('javascript') !== -1 || type === '') {
                    eval(scripts[i].innerHTML);
                }
            }
        }
    },
    "fallback": function (matchClass, content, noInner) {
        "use strict";
        var elems = document.getElementsByTagName('*'),
            i,
            index = 0;

        for (i in elems) {
            if (elems[i] !== undefined) {
                for (index = 0; index < matchClass.length; index += 1) {
                    if ((' ' + elems[i].className + ' ')
                            .indexOf(' ' + matchClass[index] + ' ') > -1) {
                        if (typeof content === 'function') {
                            if (noInner === true) {
                                content(elems[i]);
                            } else {
                                elems[i].innerHTML = content(elems[i]);
                            }
                        } else {
                            elems[i].innerHTML = content;
                        }
                    }
                }
            }
        }
    },
    "engage": function (id) {
        "use strict";
        var html = '',
            r = Math.floor(Math.random() * 100000),
            engage = GDPRtoolkit.services[id].name + ' ' + GDPRtoolkit.lang.fallback;

        if (GDPRtoolkit.lang['engage-' + id] !== undefined) {
            engage = GDPRtoolkit.lang['engage-' + id];
        }

        html += '<div class="tac_activate">';
        html += '   <div class="tac_float">';
        html += '      ' + engage;
        html += '      <button type="button" class="GDPRtoolkitAllow" id="Eng' + r + 'ed' + id + '" onclick="GDPRtoolkit.userInterface.respond(this, true);">';
        html += '          &#10003; ' + GDPRtoolkit.lang.allow;
        html += '       </button>';
        html += '   </div>';
        html += '</div>';

        return html;
    },
    "extend": function (a, b) {
        "use strict";
        var prop;
        for (prop in b) {
            if (b.hasOwnProperty(prop)) {
                a[prop] = b[prop];
            }
        }
    },
    "proTemp": '',
    "proTimer": function () {
        "use strict";
        setTimeout(GDPRtoolkit.proPing, 500);
    },
    "pro": function (list) {
        "use strict";
        GDPRtoolkit.proTemp += list;
        clearTimeout(GDPRtoolkit.proTimer);
        GDPRtoolkit.proTimer = setTimeout(GDPRtoolkit.proPing, 500);
    },
    "proPing": function () {
        "use strict";
        if (GDPRtoolkit.uuid !== '' && GDPRtoolkit.uuid !== undefined && GDPRtoolkit.proTemp !== '') {
            var div = document.getElementById('GDPRtoolkitPremium'),
                timestamp = new Date().getTime(),
                url = 'https://opt-out.ferank.eu/log/?';

            if (div === null) {
                return;
            }

            url += 'account=' + GDPRtoolkit.uuid + '&';
            url += 'domain=' + GDPRtoolkit.domain + '&';
            url += 'status=' + encodeURIComponent(GDPRtoolkit.proTemp) + '&';
            url += '_time=' + timestamp;

            div.innerHTML = '<img src="' + url + '" style="display:none" />';

            GDPRtoolkit.proTemp = '';
        }

        GDPRtoolkit.cookie.number();
    },
    "AddOrUpdate" : function(source, custom){
        /**
         Utility function to Add or update the fields of obj1 with the ones in obj2
         */
        for(key in custom){
            if(custom[key] instanceof Object){
                source[key] = GDPRtoolkit.AddOrUpdate(source[key], custom[key]);
            }else{
                source[key] = custom[key];
            }
        }
        return source;
    },
    "getElemWidth": function(elem) {
        return elem.getAttribute('width') || elem.clientWidth;
    },
    "getElemHeight": function(elem) {
        return elem.getAttribute('height') || elem.clientHeight;
    }
};
