/*global GDPRtoolkit, ga, Shareaholic, stLight, clicky, top, google, Typekit, FB, ferankReady, IN, stButtons, twttr, PCWidget*/
/*jslint regexp: true, nomen: true*/

// generic iframe
GDPRtoolkit.services.iframe = {
    "key": "iframe",
    "type": "other",
    "name": "Web content",
    "uri": "",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['tac_iframe'], function (x) {
            var width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = x.getAttribute("data-url");

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'iframe';
        GDPRtoolkit.fallback(['tac_iframe'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// abtasty
GDPRtoolkit.services.abtasty = {
    "key": "abtasty",
    "type": "api",
    "name": "ABTasty",
    "uri": "https://www.abtasty.com/terms-of-use/",
    "needConsent": true,
    "cookies": ['ABTasty', 'ABTastySession'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.abtastyID === undefined) {
            return;
        }
        GDPRtoolkit.addScript('//try.abtasty.com/'+GDPRtoolkit.user.abtastyID+'.js');
    }
};


// yandex metrica
GDPRtoolkit.services.metrica = {
    "key": "metrica",
    "type": "analytic",
    "name": "Yandex Metrica",
    "uri": "https://yandex.com/legal/confidential/",
    "needConsent": true,
    "cookies": ['_ym_metrika_enabled','_ym_isad', '_ym_uid', '_ym_d','yabs-sid','_ym_debug','_ym_mp2_substs','_ym_hostIndex','_ym_mp2_track','yandexuid','usst'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.yandexmetrica === undefined) {
            return;
        }
        GDPRtoolkit.addScript('https://mc.yandex.ru/metrika/tag.js', '', function() {

            window.ym = window.ym || function () {
                (window["ym"].a = window["ym"].a || []).push(arguments)
            };
            window["ym"].l = 1 * new Date();

            window.ym(GDPRtoolkit.user.yandexmetrica, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            });
        });
    }
};

// addthis
GDPRtoolkit.services.addthis = {
    "key": "addthis",
    "type": "social",
    "name": "AddThis",
    "uri": "https://www.addthis.com/privacy/privacy-policy#publisher-visitors",
    "needConsent": true,
    "cookies": ['__atuvc', '__atuvs'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.addthisPubId === undefined) {
            return;
        }
        if (GDPRtoolkit.isAjax === true) {
            window.addthis = null;
            window._adr = null;
            window._atc = null;
            window._atd = null;
            window._ate = null;
            window._atr = null;
            window._atw = null;
        }
        GDPRtoolkit.fallback(['addthis_sharing_toolbox'], '');
        GDPRtoolkit.addScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=' + GDPRtoolkit.user.addthisPubId);
    },
    "fallback": function () {
        "use strict";
        var id = 'addthis';
        GDPRtoolkit.fallback(['addthis_sharing_toolbox'], GDPRtoolkit.engage(id));
    }
};

// addtoanyfeed
GDPRtoolkit.services.addtoanyfeed = {
    "key": "addtoanyfeed",
    "type": "social",
    "name": "AddToAny (feed)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.addtoanyfeedUri === undefined) {
            return;
        }
        GDPRtoolkit.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + GDPRtoolkit.user.addtoanyfeedUri;
        window.a2a_config = window.a2a_config || {};
        window.a2a_config.linkurl = GDPRtoolkit.user.addtoanyfeedUri;
        GDPRtoolkit.addScript('//static.addtoany.com/menu/feed.js');
    },
    "fallback": function () {
        "use strict";
        GDPRtoolkit.user.addtoanyfeedSubscribeLink = 'https://www.addtoany.com/subscribe?linkurl=' + GDPRtoolkit.user.addtoanyfeedUri;
    }
};

// addtoanyshare
GDPRtoolkit.services.addtoanyshare = {
    "key": "addtoanyshare",
    "type": "social",
    "name": "AddToAny (share)",
    "uri": "https://www.addtoany.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['tac_addtoanyshare'], '');
        GDPRtoolkit.addScript('//static.addtoany.com/menu/page.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'addtoanyshare';
        GDPRtoolkit.fallback(['tac_addtoanyshare'], GDPRtoolkit.engage(id));
    }
};

// aduptech ads
GDPRtoolkit.services.aduptech_ads = {
    "key": "aduptech_ads",
    "type": "ads",
    "name": "Ad Up Technology (ads)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_ads",
            API_URL = "https://s.d.adup-tech.com/jsapi";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        GDPRtoolkit.fallback([IDENTIFIER], "");

        GDPRtoolkit.addScript(API_URL, "", function() {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                if (!element.getAttribute("id")) {
                    element.setAttribute("id", IDENTIFIER + Math.random().toString(36).substr(2, 9));
                }

                window.uAd.embed(element.getAttribute("id"), {
                    placementKey: element.getAttribute("placementKey"),
                    responsive: Boolean(element.getAttribute("responsive")),
                    lazy: Boolean(element.getAttribute("lazy")),
                    adtest: Boolean(element.getAttribute("test")),
                    query: element.getAttribute("query") || "",
                    minCpc: element.getAttribute("minCpc") || "",
                    pageUrl: element.getAttribute("pageUrl") || "",
                    skip: element.getAttribute("skip") || ""
                });
            }
        });

    },
    "fallback": function () {
        "use strict";
        GDPRtoolkit.fallback(["aduptech_ads"], GDPRtoolkit.engage("aduptech_ads"));
    }
};

// aduptech conversion
GDPRtoolkit.services.aduptech_conversion = {
    "key": "aduptech_conversion",
    "type": "ads",
    "name": "Ad Up Technology (conversion)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_conversion",
            CONVERSION_PIXEL_BASE_URL = "https://d.adup-tech.com/campaign/conversion";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        GDPRtoolkit.fallback([IDENTIFIER], "");

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (!element.getAttribute("advertiserId") || !element.getAttribute("conversionCode")) {
                continue;
            }

            var url = CONVERSION_PIXEL_BASE_URL +
                "/" + encodeURIComponent(element.getAttribute("advertiserId")) +
                "?t=" + encodeURIComponent(element.getAttribute("conversionCode"));

            if (element.getAttribute("price")) {
                url += "&price=" + encodeURIComponent(element.getAttribute("price"));
            }

            if (element.getAttribute("quantity")) {
                url += "&quantity=" + encodeURIComponent(element.getAttribute("quantity"));
            }

            if (element.getAttribute("total")) {
                url += "&total=" + encodeURIComponent(element.getAttribute("total"));
            }

            if (element.getAttribute("orderId")) {
                url += "&order_id=" + encodeURIComponent(element.getAttribute("orderId"));
            }

            if (element.getAttribute("itemNumber")) {
                url += "&item_number=" + encodeURIComponent(element.getAttribute("itemNumber"));
            }

            if (element.getAttribute("description")) {
                url += "&description=" + encodeURIComponent(element.getAttribute("description"));
            }

            (new Image()).src = url;
        }
    }
};

// aduptech retargeting
GDPRtoolkit.services.aduptech_retargeting = {
    "key": "aduptech_retargeting",
    "type": "ads",
    "name": "Ad Up Technology (retargeting)",
    "uri": "https://www.adup-tech.com/datenschutz",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        var IDENTIFIER = "aduptech_retargeting",
            API_URL = "https://s.d.adup-tech.com/services/retargeting.js";

        var elements = document.getElementsByClassName(IDENTIFIER);
        if (!elements || elements.length === 0) {
            return;
        }

        GDPRtoolkit.fallback([IDENTIFIER], "");

        window.AdUpRetargeting = function(api) {
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                api.init();

                api.setAccount(element.getAttribute("account"));

                if (element.getAttribute("email")) {
                    api.setEmail(element.getAttribute("email"));
                } else if (element.getAttribute("hashedEmail")) {
                    api.setHashedEmail(element.getAttribute("hashedEmail"));
                }

                if (element.getAttribute("product")) {
                    try {
                        api.setProduct(JSON.parse(element.getAttribute("product")));
                    } catch (e) {
                        api.setProduct(element.getAttribute("product"));
                    }
                }

                if (element.getAttribute("transaction")) {
                    try {
                        api.setTransaction(JSON.parse(element.getAttribute("transaction")));
                    } catch (e) {
                        api.setTransaction(element.getAttribute("transaction"));
                    }
                }

                if (element.getAttribute("demarkUser")) {
                    api.setDemarkUser();
                } else if (element.getAttribute("demarkProducts")) {
                    api.setDemarkProducts();
                }

                if (element.getAttribute("conversionCode")) {
                    api.setConversionCode(element.getAttribute("conversionCode"));
                }

                if (element.getAttribute("device")) {
                    var setter = "set" + element.getAttribute("device").charAt(0).toUpperCase() + element.getAttribute("device").slice(1);
                    if (typeof api[setter] === 'function') {
                        api[setter]();
                    }
                }

                if (element.getAttribute("track")) {
                    var tracker = "track" + element.getAttribute("track").charAt(0).toUpperCase() + element.getAttribute("track").slice(1);
                    if (typeof api[tracker] === "function") {
                        api[tracker]();
                    } else {
                        api.trackHomepage();
                    }
                }
            };
        };

        GDPRtoolkit.addScript(API_URL);
    }
};

// alexa
GDPRtoolkit.services.alexa = {
    "key": "alexa",
    "type": "analytic",
    "name": "Alexa",
    "uri": "https://www.alexa.com/help/privacy",
    "needConsent": true,
    "cookies": ['__asc', '__auc'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.alexaAccountID === undefined) {
            return;
        }
        window._atrk_opts = {
            atrk_acct: GDPRtoolkit.user.alexaAccountID,
            domain: window.location.hostname.match(/[^\.]*\.[^.]*$/)[0],
            dynamic: true
        };
        GDPRtoolkit.addScript('https://d31qbv1cthcecs.cloudfront.net/atrk.js');
    }
};

// amazon
GDPRtoolkit.services.amazon = {
    "key": "amazon",
    "type": "ads",
    "name": "Amazon",
    "uri": "https://www.amazon.com/gp/help/customer/display.html/ref=help_search_1-1?ie=UTF8&nodeId=201909010&qid=1544617177&sr=1-1",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['amazon_product'], function (x) {
            var amazonId = x.getAttribute("amazonid"),
                productId = x.getAttribute("productid"),
                url = '//ws-eu.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=' + GDPRtoolkit.getLanguage().toUpperCase() + '&source=ss&ref=ss_til&ad_type=product_link&tracking_id=' + amazonId + '&marketplace=amazon&region=' + GDPRtoolkit.getLanguage().toUpperCase() + '&placement=' + productId + '&asins=' + productId + '&show_border=true&link_opens_in_new_window=true',
                iframe = '<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="' + url + '"></iframe>';

            return iframe;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'amazon';
        GDPRtoolkit.fallback(['amazon_product'], GDPRtoolkit.engage(id));
    }
};

// calameo
GDPRtoolkit.services.calameo = {
    "key": "calameo",
    "type": "video",
    "name": "Calameo",
    "uri": "https://fr.calameo.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['calameo-canvas'], function (x) {
            var id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = '//v.calameo.com/?bkcode=' + id;

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'calameo';
        GDPRtoolkit.fallback(['calameo-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// clicky
GDPRtoolkit.services.clicky = {
    "key": "clicky",
    "type": "analytic",
    "name": "Clicky",
    "uri": "https://clicky.com/terms",
    "needConsent": true,
    "cookies": ['_jsuid', '_eventqueue', '_referrer_og', '_utm_og', '_first_pageview', 'clicky_olark', 'no_trackyy_' + GDPRtoolkit.user.clickyId, 'unpoco_' + GDPRtoolkit.user.clickyId, 'heatmaps_g2g_' + GDPRtoolkit.user.clickyId],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.clickyId === undefined) {
            return;
        }
        GDPRtoolkit.addScript('//static.getclicky.com/js', '', function () {
            if (typeof clicky.init === 'function') {
                clicky.init(GDPRtoolkit.user.clickyId);
            }
            if (typeof GDPRtoolkit.user.clickyMore === 'function') {
                GDPRtoolkit.user.clickyMore();
            }
        });
    }
};

// clicmanager
GDPRtoolkit.services.clicmanager = {
    "key": "clicmanager",
    "type": "ads",
    "name": "Clicmanager",
    "uri": "http://www.clicmanager.fr/infos_legales.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        GDPRtoolkit.fallback(['clicmanager-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" c="' + x.getAttribute('c') + '" s="' + x.getAttribute('s') + '" t="' + x.getAttribute('t') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//ads.clicmanager.fr/exe.php?';
            uri += 'c=' + document.getElementById(uniqIds[i]).getAttribute('c') + '&';
            uri += 's=' + document.getElementById(uniqIds[i]).getAttribute('s') + '&';
            uri += 't=' + document.getElementById(uniqIds[i]).getAttribute('t');

            GDPRtoolkit.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'clicmanager';
        GDPRtoolkit.fallback(['clicmanager-canvas'], GDPRtoolkit.engage(id));
    }
};

// contentsquare
GDPRtoolkit.services.contentsquare = {
    "key": "contentsquare",
    "type": "api",
    "name": "ContentSquare",
    "uri": "https://docs.contentsquare.com/uxa-en/#collected-data",
    "needConsent": true,
    "cookies": ['_cs_id', '_cs_s', '_cs_vars', '_cs_ex', '_cs_c', '_cs_optout'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.contentsquareID === undefined) {
            return;
        }
        GDPRtoolkit.addScript('//t.contentsquare.net/uxa/'+GDPRtoolkit.user.contentsquareID+'.js');
    }
};

// crazyegg
GDPRtoolkit.services.crazyegg = {
    "key": "crazyegg",
    "type": "analytic",
    "name": "Crazy Egg",
    "uri": "https://www.crazyegg.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (GDPRtoolkit.user.crazyeggId === undefined) {
            return;
        }

        GDPRtoolkit.addScript('//script.crazyegg.com/pages/scripts/' + GDPRtoolkit.user.crazyeggId.substr(0, 4) + '/' + GDPRtoolkit.user.crazyeggId.substr(4, 4) + '.js');
    }
};

// criteo
GDPRtoolkit.services.criteo = {
    "key": "criteo",
    "type": "ads",
    "name": "Criteo",
    "uri": "http://www.criteo.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        document.MAX_ct0 = '';
        var uniqIds = [],
            i,
            uri;

        GDPRtoolkit.fallback(['criteo-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" zoneid="' + x.getAttribute('zoneid') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//cas.criteo.com/delivery/ajs.php?';
            uri += 'zoneid=' + document.getElementById(uniqIds[i]).getAttribute('zoneid');
            uri += '&nodis=1&cb=' + Math.floor(Math.random() * 99999999999);
            uri += '&loc=' + encodeURI(window.location);
            uri += (document.MAX_used !== ',') ? '&exclude=' + document.MAX_used : '';
            uri += (document.charset !== undefined ? '&charset=' + document.charset : '');
            uri += (document.characterSet !== undefined ? '&charset=' + document.characterSet : '');
            uri += (document.referrer !== undefined) ? '&referer=' + encodeURI(document.referrer) : '';
            uri += (document.context !== undefined) ? '&context=' + encodeURI(document.context) : '';
            uri += ((document.MAX_ct0 !== undefined) && (document.MAX_ct0.substring(0, 4) === 'http')) ? '&ct0=' + encodeURI(document.MAX_ct0) : '';
            uri += (document.mmm_fo !== undefined) ? '&mmm_fo=1' : '';

            GDPRtoolkit.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'criteo';
        GDPRtoolkit.fallback(['criteo-canvas'], GDPRtoolkit.engage(id));
    }
};

// dailymotion
GDPRtoolkit.services.dailymotion = {
    "key": "dailymotion",
    "type": "video",
    "name": "Dailymotion",
    "uri": "https://www.dailymotion.com/legal/privacy",
    "needConsent": true,
    "cookies": ['ts', 'dmvk', 'hist', 'v1st', 's_vi'],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['dailymotion_player'], function (x) {
            var video_id = x.getAttribute("videoID"),
                video_width = x.getAttribute("width"),
                frame_width = 'width=',
                video_height = x.getAttribute("height"),
                frame_height = 'height=',
                video_frame,
                params = 'info=' + x.getAttribute("showinfo") + '&autoPlay=' + x.getAttribute("autoplay");

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height +=  '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe src="//www.dailymotion.com/embed/video/' + video_id + '?' + params + '" ' + frame_width + frame_height + ' frameborder="0" allowfullscreen></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'dailymotion';
        GDPRtoolkit.fallback(['dailymotion_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// dating affiliation
GDPRtoolkit.services.datingaffiliation = {
    "key": "datingaffiliation",
    "type": "ads",
    "name": "Dating Affiliation",
    "uri": "http://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['datingaffiliation-canvas'], function (x) {
            var comfrom = x.getAttribute("data-comfrom"),
                r = x.getAttribute("data-r"),
                p = x.getAttribute("data-p"),
                cf0 = x.getAttribute("data-cf0"),
                langue = x.getAttribute("data-langue"),
                forward_affiliate = x.getAttribute("data-forwardAffiliate"),
                cf2 = x.getAttribute("data-cf2"),
                cfsa2 = x.getAttribute("data-cfsa2"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = 'http://www.tools-affil2.com/rotaban/ban.php?' + comfrom;

            return '<iframe src="' + url + '&r=' + r + '&p=' + p + '&cf0=' + cf0 + '&langue=' + langue + '&forward_affiliate=' + forward_affiliate + '&cf2=' + cf2 + '&cfsa2=' + cfsa2 + '" width="' + width + '" height="' + height + '" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliation';
        GDPRtoolkit.fallback(['datingaffiliation-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// dating affiliation popup
GDPRtoolkit.services.datingaffiliationpopup = {
    "key": "datingaffiliationpopup",
    "type": "ads",
    "name": "Dating Affiliation (Pop Up)",
    "uri": "http://www.dating-affiliation.com/conditions-generales.php",
    "needConsent": true,
    "cookies": ['__utma', '__utmb', '__utmc', '__utmt_Tools', '__utmv', '__utmz', '_ga', '_gat', '_gat_UA-65072040-17', '__da-pu-xflirt-ID-pc-o169'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        GDPRtoolkit.fallback(['datingaffiliationpopup-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" uri="' + x.getAttribute('uri') + '" comfrom="' + x.getAttribute('comfrom') + '" promo="' + x.getAttribute('promo') + '" productid="' + x.getAttribute('productid') + '" submitconfig="' + x.getAttribute('submitconfig') + '" ur="' + x.getAttribute('ur') + '" brand="' + x.getAttribute('brand') + '" lang="' + x.getAttribute('lang') + '" cf0="' + x.getAttribute('cf0') + '" cf2="' + x.getAttribute('cf2') + '" subid1="' + x.getAttribute('subid1') + '" cfsa2="' + x.getAttribute('cfsa2') + '" subid2="' + x.getAttribute('subid2') + '" nicheid="' + x.getAttribute('nicheid') + '" degreid="' + x.getAttribute('degreid') + '" bt="' + x.getAttribute('bt') + '" vis="' + x.getAttribute('vis') + '" hid="' + x.getAttribute('hid') + '" snd="' + x.getAttribute('snd') + '" aabd="' + x.getAttribute('aabd') + '" aabs="' + x.getAttribute('aabs') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'http://www.promotools.biz/da/popunder/script.php?';
            uri += 'comfrom=' + document.getElementById(uniqIds[i]).getAttribute('comfrom') + '&';
            uri += 'promo=' + document.getElementById(uniqIds[i]).getAttribute('promo') + '&';
            uri += 'product_id=' + document.getElementById(uniqIds[i]).getAttribute('productid') + '&';
            uri += 'submitconfig=' + document.getElementById(uniqIds[i]).getAttribute('submitconfig') + '&';
            uri += 'ur=' + document.getElementById(uniqIds[i]).getAttribute('ur') + '&';
            uri += 'brand=' + document.getElementById(uniqIds[i]).getAttribute('brand') + '&';
            uri += 'lang=' + document.getElementById(uniqIds[i]).getAttribute('lang') + '&';
            uri += 'cf0=' + document.getElementById(uniqIds[i]).getAttribute('cf0') + '&';
            uri += 'cf2=' + document.getElementById(uniqIds[i]).getAttribute('cf2') + '&';
            uri += 'subid1=' + document.getElementById(uniqIds[i]).getAttribute('subid1') + '&';
            uri += 'cfsa2=' + document.getElementById(uniqIds[i]).getAttribute('cfsa2') + '&';
            uri += 'subid2=' + document.getElementById(uniqIds[i]).getAttribute('subid2') + '&';
            uri += 'nicheId=' + document.getElementById(uniqIds[i]).getAttribute('nicheid') + '&';
            uri += 'degreId=' + document.getElementById(uniqIds[i]).getAttribute('degreid') + '&';
            uri += 'bt=' + document.getElementById(uniqIds[i]).getAttribute('bt') + '&';
            uri += 'vis=' + document.getElementById(uniqIds[i]).getAttribute('vis') + '&';
            uri += 'hid=' + document.getElementById(uniqIds[i]).getAttribute('hid') + '&';
            uri += 'snd=' + document.getElementById(uniqIds[i]).getAttribute('snd') + '&';
            uri += 'aabd=' + document.getElementById(uniqIds[i]).getAttribute('aabd') + '&';
            uri += 'aabs=' + document.getElementById(uniqIds[i]).getAttribute('aabs');

            GDPRtoolkit.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'datingaffiliationpopup';
        GDPRtoolkit.fallback(['datingaffiliationpopup-canvas'], GDPRtoolkit.engage(id));
    }
};

// leadforensics
GDPRtoolkit.services.leadforensics = {
    "key": "leadforensics",
    "type": "analytic",
    "name": "LeadForensics",
    "uri": "https://www.leadforensics.com/privacy-policy/",
    "needConsent": true,
    "cookies": ['trackalyzer'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.leadforensicsSf14gv === undefined ||
            GDPRtoolkit.user.leadforensicsIidentifier === undefined) {
            return;
        }

        window.sf14gv = GDPRtoolkit.user.leadforensicsSf14gv;

        (function() {
            var sf14g = document.createElement('script'); sf14g.type = 'text/javascript'; sf14g.async = true;
            sf14g.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 't.sf14g.com/sf14g.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sf14g, s);
        })();

        GDPRtoolkit.addScript('//secure.leadforensics.com/js/' + GDPRtoolkit.user.leadforensicsIidentifier + '.js');
    }
};

// disqus
GDPRtoolkit.services.disqus = {
    "key": "disqus",
    "type": "comment",
    "name": "Disqus",
    "uri": "https://help.disqus.com/customer/portal/articles/466259-privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.disqusShortname === undefined) {
            return;
        }
        GDPRtoolkit.addScript('//' + GDPRtoolkit.user.disqusShortname + '.disqus.com/embed.js');
        GDPRtoolkit.addScript('//' + GDPRtoolkit.user.disqusShortname + '.disqus.com/count.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'disqus';

        if (document.getElementById('disqus_thread')) {
            document.getElementById('disqus_thread').innerHTML = GDPRtoolkit.engage(id);
        }
    }
};

// ekomi
GDPRtoolkit.services.ekomi = {
    "key": "ekomi",
    "type": "social",
    "name": "eKomi",
    "uri": "http://www.ekomi-us.com/us/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.ekomiCertId === undefined) {
            return;
        }
        window.eKomiIntegrationConfig = [
            {certId: GDPRtoolkit.user.ekomiCertId}
        ];
        GDPRtoolkit.addScript('//connect.ekomi.de/integration_1410173009/' + GDPRtoolkit.user.ekomiCertId + '.js');
    }
};

// etracker
GDPRtoolkit.services.etracker = {
    "key": "etracker",
    "type": "analytic",
    "name": "eTracker",
    "uri": "https://www.etracker.com/en/data-protection.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.etracker === undefined) {
            return;
        }

        GDPRtoolkit.addScript('//static.etracker.com/code/e.js', '_etLoader', function () {}, true, "data-secure-code", GDPRtoolkit.user.etracker);
    }
};

// facebook
GDPRtoolkit.services.facebook = {
    "key": "facebook",
    "type": "social",
    "name": "Facebook",
    "uri": "https://www.facebook.com/policies/cookies/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], '');
        GDPRtoolkit.addScript('//connect.facebook.net/' + GDPRtoolkit.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (GDPRtoolkit.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebook';
        GDPRtoolkit.fallback(['fb-post', 'fb-follow', 'fb-activity', 'fb-send', 'fb-share-button', 'fb-like', 'fb-video'], GDPRtoolkit.engage(id));
    }
};

// facebooklikebox
GDPRtoolkit.services.facebooklikebox = {
    "key": "facebooklikebox",
    "type": "social",
    "name": "Facebook (like box)",
    "uri": "https://www.facebook.com/policies/cookies/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['fb-like-box', 'fb-page'], '');
        GDPRtoolkit.addScript('//connect.facebook.net/' + GDPRtoolkit.getLocale() + '/sdk.js#xfbml=1&version=v2.3', 'facebook-jssdk');
        if (GDPRtoolkit.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebooklikebox';
        GDPRtoolkit.fallback(['fb-like-box', 'fb-page'], GDPRtoolkit.engage(id));
    }
};

// facebookcomment
GDPRtoolkit.services.facebookcomment = {
    "key": "facebookcomment",
    "type": "comment",
    "name": "Facebook (commentaire)",
    "uri": "https://www.facebook.com/policies/cookies/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['fb-comments'], '');
        GDPRtoolkit.addScript('//connect.facebook.net/' + GDPRtoolkit.getLocale() + '/sdk.js#xfbml=1&version=v2.0', 'facebook-jssdk');
        if (GDPRtoolkit.isAjax === true) {
            if (typeof FB !== "undefined") {
                FB.XFBML.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'facebookcomment';
        GDPRtoolkit.fallback(['fb-comments'], GDPRtoolkit.engage(id));
    }
};

// ferank
GDPRtoolkit.services.ferank = {
    "key": "ferank",
    "type": "analytic",
    "name": "FERank",
    "uri": "https://www.ferank.fr/respect-vie-privee/#mesureaudience",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.addScript('//static.ferank.fr/pixel.js', '', function () {
            if (typeof GDPRtoolkit.user.ferankMore === 'function') {
                GDPRtoolkit.user.ferankMore();
            }
        });
    }
};

// ferank pub
GDPRtoolkit.services.ferankpub = {
    "key": "ferankpub",
    "type": "ads",
    "name": "FERank (pub)",
    "uri": "https://www.ferank.fr/respect-vie-privee/#regiepublicitaire",
    "needConsent": false,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.addScript('//static.ferank.fr/publicite.async.js');
        if (GDPRtoolkit.isAjax === true) {
            if (typeof ferankReady === 'function') {
                ferankReady();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'ferankpub';
        GDPRtoolkit.fallback(['ferank-publicite'], GDPRtoolkit.engage(id));
    }
};

// get+
GDPRtoolkit.services.getplus = {
    "key": "getplus",
    "type": "analytic",
    "name": "Get+",
    "uri": "http://www.getplus.fr/Conditions-generales-de-vente_a226.html",
    "needConsent": true,
    "cookies": ['_first_pageview', '_jsuid', 'no_trackyy_' + GDPRtoolkit.user.getplusId, '_eventqueue'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.getplusId === undefined) {
            return;
        }

        window.webleads_site_ids = window.webleads_site_ids || [];
        window.webleads_site_ids.push(GDPRtoolkit.user.getplusId);
        GDPRtoolkit.addScript('//stats.webleads-tracker.com/js');
    }
};

// google+
GDPRtoolkit.services.gplus = {
    "key": "gplus",
    "type": "social",
    "name": "Google+",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplus';
        GDPRtoolkit.fallback(['g-plus', 'g-plusone'], GDPRtoolkit.engage(id));
    }
};

// google+ badge
GDPRtoolkit.services.gplusbadge = {
    "key": "gplusbadge",
    "type": "social",
    "name": "Google+ (badge)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'gplusbadge';
        GDPRtoolkit.fallback(['g-page', 'g-person'], GDPRtoolkit.engage(id));
    }
};

// google adsense
GDPRtoolkit.services.adsense = {
    "key": "adsense",
    "type": "ads",
    "name": "Google Adsense",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.addScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'adsense';
        GDPRtoolkit.fallback(['adsbygoogle'], GDPRtoolkit.engage(id));
    }
};

// google partners badge
GDPRtoolkit.services.googlepartners = {
    "key": "googlepartners",
    "type": "ads",
    "name": "Google Partners Badge",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.addScript('https://apis.google.com/js/platform.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'googlepartners';
        GDPRtoolkit.fallback(['g-partnersbadge'], GDPRtoolkit.engage(id));
    }
};

// google adsense search (form)
GDPRtoolkit.services.adsensesearchform = {
    "key": "adsensesearchform",
    "type": "ads",
    "name": "Google Adsense Search (form)",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.addScript('//www.google.com/coop/cse/brand?form=cse-search-box&lang=' + GDPRtoolkit.getLanguage());
    }
};

// google adsense search (result)
GDPRtoolkit.services.adsensesearchresult = {
    "key": "adsensesearchresult",
    "type": "ads",
    "name": "Google Adsense Search (result)",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.adsensesearchresultCx === undefined) {
            return;
        }
        GDPRtoolkit.addScript('//www.google.com/cse/cse.js?cx=' + GDPRtoolkit.user.adsensesearchresultCx);
    },
    "fallback": function () {
        "use strict";
        var id = 'adsensesearchresult';

        if (document.getElementById('gcse_searchresults')) {
            document.getElementById('gcse_searchresults').innerHTML = GDPRtoolkit.engage(id);
        }
    }
};

// googleadwordsconversion
GDPRtoolkit.services.googleadwordsconversion = {
    "key": "googleadwordsconversion",
    "type": "ads",
    "name": "Google Adwords (conversion)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.adwordsconversionId === undefined) {
            return;
        }

        GDPRtoolkit.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: GDPRtoolkit.user.adwordsconversionId,
                google_conversion_label: GDPRtoolkit.user.adwordsconversionLabel,
                google_conversion_language: GDPRtoolkit.user.adwordsconversionLanguage,
                google_conversion_format: GDPRtoolkit.user.adwordsconversionFormat,
                google_conversion_color: GDPRtoolkit.user.adwordsconversionColor,
                google_conversion_value: GDPRtoolkit.user.adwordsconversionValue,
                google_conversion_currency: GDPRtoolkit.user.adwordsconversionCurrency,
                google_custom_params: {
                    parameter1: GDPRtoolkit.user.adwordsconversionCustom1,
                    parameter2: GDPRtoolkit.user.adwordsconversionCustom2
                }
            });
        });
    }
};

// googleadwordsremarketing
GDPRtoolkit.services.googleadwordsremarketing = {
    "key": "googleadwordsremarketing",
    "type": "ads",
    "name": "Google Adwords (remarketing)",
    "uri": "https://www.google.com/settings/ads",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.adwordsremarketingId === undefined) {
            return;
        }

        GDPRtoolkit.addScript('//www.googleadservices.com/pagead/conversion_async.js', '', function () {
            window.google_trackConversion({
                google_conversion_id: GDPRtoolkit.user.adwordsremarketingId,
                google_remarketing_only: true
            });
        });
    }
};

// google analytics (old)
GDPRtoolkit.services.gajs = {
    "key": "gajs",
    "type": "analytic",
    "name": "Google Analytics (ga.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'],
    "js": function () {
        "use strict";
        window._gaq = window._gaq || [];
        window._gaq.push(['_setAccount', GDPRtoolkit.user.gajsUa]);

        if (GDPRtoolkit.user.gajsAnonymizeIp) {
            window._gaq.push (['_gat._anonymizeIp']);
        }

        if (GDPRtoolkit.user.gajsPageView) {
            window._gaq.push(['_trackPageview, ' + GDPRtoolkit.user.gajsPageView]);
        } else {
            window._gaq.push(['_trackPageview']);
        }

        GDPRtoolkit.addScript('//www.google-analytics.com/ga.js', '', function () {
            if (typeof GDPRtoolkit.user.gajsMore === 'function') {
                GDPRtoolkit.user.gajsMore();
            }
        });
    }
};

// google analytics
GDPRtoolkit.services.analytics = {
    "key": "analytics",
    "type": "analytic",
    "name": "Google Analytics (universal)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'],
    "js": function () {
        "use strict";
        window.GoogleAnalyticsObject = 'ga';
        window.ga = window.ga || function () {
            window.ga.q = window.ga.q || [];
            window.ga.q.push(arguments);
        };
        window.ga.l = new Date();
        GDPRtoolkit.addScript('https://www.google-analytics.com/analytics.js', '', function () {
            var uaCreate = {'cookieExpires': 34128000};
            GDPRtoolkit.extend(uaCreate, GDPRtoolkit.user.analyticsUaCreate || {});
            ga('create', GDPRtoolkit.user.analyticsUa, uaCreate);

            if (GDPRtoolkit.user.analyticsAnonymizeIp) {
                ga('set', 'anonymizeIp', true);
            }

            if (typeof GDPRtoolkit.user.analyticsPrepare === 'function') {
                GDPRtoolkit.user.analyticsPrepare();
            }

            if (GDPRtoolkit.user.analyticsPageView) {
                ga('send', 'pageview', GDPRtoolkit.user.analyticsPageView);
            } else {
                ga('send', 'pageview');
            }

            if (typeof GDPRtoolkit.user.analyticsMore === 'function') {
                GDPRtoolkit.user.analyticsMore();
            }
        });
    }
};

// google analytics
GDPRtoolkit.services.gtag = {
    "key": "gtag",
    "type": "analytic",
    "name": "Google Analytics (gtag.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "cookies": (function () {
        // Add _gat_gtag_UA_XXXXXXX_XX cookie to cookies array
        var gatGtagUaCookie = '_gat_gtag_' + GDPRtoolkit.user.gtagUa;
        gatGtagUaCookie = gatGtagUaCookie.replace(/-/g, '_');
        return ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', gatGtagUaCookie];
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];
        GDPRtoolkit.addScript('https://www.googletagmanager.com/gtag/js?id=' + GDPRtoolkit.user.gtagUa, '', function () {
            window.gtag = function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', GDPRtoolkit.user.gtagUa);

            if (typeof GDPRtoolkit.user.gtagMore === 'function') {
                GDPRtoolkit.user.gtagMore();
            }
        });
    }
};

// google maps
GDPRtoolkit.services.googlemaps = {
    "key": "googlemaps",
    "type": "api",
    "name": "Google Maps",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var mapOptions,
            map,
            uniqIds = [],
            i;

        if (GDPRtoolkit.user.mapscallback === undefined) {
            GDPRtoolkit.user.mapscallback = 'tac_googlemaps_callback';
        }

        // Add Google Maps libraries if any (https://developers.google.com/maps/documentation/javascript/libraries)
        var googleMapsLibraries = '';
        if (GDPRtoolkit.user.googlemapsLibraries) {
            googleMapsLibraries = '&libraries=' + GDPRtoolkit.user.googlemapsLibraries;
        }

        GDPRtoolkit.addScript('//maps.googleapis.com/maps/api/js?v=3.exp&key=' + GDPRtoolkit.user.googlemapsKey + '&callback='+GDPRtoolkit.user.mapscallback + googleMapsLibraries);

        window.tac_googlemaps_callback = function () {
            GDPRtoolkit.fallback(['googlemaps-canvas'], function (x) {
                var uniqId = '_' + Math.random().toString(36).substr(2, 9);
                uniqIds.push(uniqId);
                return '<div id="' + uniqId + '" zoom="' + x.getAttribute('zoom') + '" latitude="' + x.getAttribute('latitude') + '" longitude="' + x.getAttribute('longitude') + '" style="width:' + x.offsetWidth + 'px;height:' + x.offsetHeight + 'px"></div>';
            });

            for (i = 0; i < uniqIds.length; i += 1) {
                mapOptions = {
                    zoom: parseInt(document.getElementById(uniqIds[i]).getAttribute('zoom'), 10),
                    center: new google.maps.LatLng(parseFloat(document.getElementById(uniqIds[i]).getAttribute('latitude'), 10), parseFloat(document.getElementById(uniqIds[i]).getAttribute('longitude'), 10))
                };
                map = new google.maps.Map(document.getElementById(uniqIds[i]), mapOptions);
            }
        };
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemaps';
        GDPRtoolkit.fallback(['googlemaps-canvas'], GDPRtoolkit.engage(id));
    }
};

// googlemaps search
GDPRtoolkit.services.googlemapssearch = {
    "key": "googlemapssearch",
    "type": "api",
    "name": "Google Maps Search API",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": ['nid'],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['googlemapssearch'], function (x) {
            var width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                // url = x.getAttribute("data-url");
                query = escape(x.getAttribute("data-search")),
                key = x.getAttribute("data-api-key");

            // return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
            return '<iframe width="' + width +'" height="' + height + '" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q='+query+'&key='+key+'" allowfullscreen></iframe> '
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapssearch';
        GDPRtoolkit.fallback(['googlemapssearch'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// googlemaps embed iframe
GDPRtoolkit.services.googlemapsembed = {
    "key": "googlemapsembed",
    "type": "api",
    "name": "Google Maps Embed",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": ['apisid', 'hsid', 'nid', 'sapisid', 'sid', 'sidcc', 'ssid', '1p_jar'],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['googlemapsembed'], function (x) {
            var width = GDPRtoolkit.getElemWidth(x),
                height = GDPRtoolkit.getElemHeight(x),
                url = x.getAttribute("data-url");

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'googlemapsembed';
        GDPRtoolkit.fallback(['googlemapsembed'], function (elem) {
            elem.style.width = GDPRtoolkit.getElemWidth(elem) + 'px';
            elem.style.height = GDPRtoolkit.getElemHeight(elem) + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// google tag manager
GDPRtoolkit.services.googletagmanager = {
    "key": "googletagmanager",
    "type": "api",
    "name": "Google Tag Manager",
    "uri": "https://adssettings.google.com/",
    "needConsent": true,
    "cookies": ['_ga', '_gat', '__utma', '__utmb', '__utmc', '__utmt', '__utmz', '__gads', '_drt_', 'FLC', 'exchange_uid', 'id', 'fc', 'rrs', 'rds', 'rv', 'uid', 'UIDR', 'UID', 'clid', 'ipinfo', 'acs'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.googletagmanagerId === undefined) {
            return;
        }
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        GDPRtoolkit.addScript('//www.googletagmanager.com/gtm.js?id=' + GDPRtoolkit.user.googletagmanagerId);
    }
};

// google webfonts
GDPRtoolkit.services.googlefonts = {
  "key": "googlefonts",
  "type": "api",
  "name": "Google Webfonts",
  "uri": "https://www.google.com/intl/de/policies/privacy/",
  "needConsent": true,
  "cookies": [],
  "js": function () {
    "use strict";
    if (GDPRtoolkit.user.googleFonts === undefined) {
      return;
    }
    GDPRtoolkit.addScript('//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', '', function () {
      WebFont.load({
        google: {
          families: GDPRtoolkit.user.googleFonts
        }
      });
    });
  }
};

// hubspot
GDPRtoolkit.services.hubspot = {
    "key": "hubspot",
    "type": "analytic",
    "name": "Hubspot",
    "uri": "https://legal.hubspot.com/privacy-policy",
    "needConsent": true,
    "cookies": ['hubspotutk', 'fr', '__hstc', '__hssrc', '__hssc', '__cfduid'],
    "js": function () {
        "use strict";
        GDPRtoolkit.addScript('//js.hs-scripts.com/' + GDPRtoolkit.user.hubspotId + '.js', 'hs-script-loader');
    }
};

// jsapi
GDPRtoolkit.services.jsapi = {
    "key": "jsapi",
    "type": "api",
    "name": "Google jsapi",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.addScript('//www.google.com/jsapi');
    }
};

// twitterwidgetsapi
GDPRtoolkit.services.twitterwidgetsapi = {
    "key": "twitterwidgetsapi",
    "type": "api",
    "name": "Twitter Widgets API",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['tacTwitterAPI'], '');
        GDPRtoolkit.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterwidgetsapi';
        GDPRtoolkit.fallback(['tacTwitterAPI'], GDPRtoolkit.engage(id));
    }
};

// recaptcha
GDPRtoolkit.services.recaptcha = {
    "key": "recaptcha",
    "type": "api",
    "name": "reCAPTCHA",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['nid'],
    "js": function () {
        "use strict";
        window.tacRecaptchaOnLoad = GDPRtoolkit.user.recaptchaOnLoad || function() {};
        GDPRtoolkit.fallback(['g-recaptcha'], '');
        GDPRtoolkit.addScript('https://www.google.com/recaptcha/api.js?onload=tacRecaptchaOnLoad');
    },
    "fallback": function () {
        "use strict";
        var id = 'recaptcha';
        GDPRtoolkit.fallback(['g-recaptcha'], GDPRtoolkit.engage(id));
    }
};

// linkedin
GDPRtoolkit.services.linkedin = {
    "key": "linkedin",
    "type": "social",
    "name": "Linkedin",
    "uri": "https://www.linkedin.com/legal/cookie_policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['tacLinkedin'], '');
        GDPRtoolkit.addScript('//platform.linkedin.com/in.js');
        if (GDPRtoolkit.isAjax === true) {
            if (typeof IN !== "undefined") {
                IN.parse();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'linkedin';
        GDPRtoolkit.fallback(['tacLinkedin'], GDPRtoolkit.engage(id));
    }
};

// mautic
GDPRtoolkit.services.mautic = {
    "key": "mautic",
    "type": "analytic",
    "name": "Mautic",
    "uri": "https://www.mautic.org/privacy-policy/",
    "needConsent": true,
    "cookies": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.mauticurl === undefined) {
            return;
        }

        window.MauticTrackingObject = 'mt';
        window.mt = window.mt || function () {
            window.mt.q = window.mt.q || [];
            window.mt.q.push(arguments);
        };

        GDPRtoolkit.addScript(GDPRtoolkit.user.mauticurl, '', function() {
            mt('send', 'pageview');
        });
    }
};

// microsoftcampaignanalytics
GDPRtoolkit.services.microsoftcampaignanalytics = {
    "key": "microsoftcampaignanalytics",
    "type": "analytic",
    "name": "Microsoft Campaign Analytics",
    "uri": "https://privacy.microsoft.com/privacystatement/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.microsoftcampaignanalyticsUUID === undefined) {
            return;
        }

        GDPRtoolkit.addScript('//flex.atdmt.com/mstag/site/' + GDPRtoolkit.user.microsoftcampaignanalyticsUUID + '/mstag.js', 'mstag_tops', function () {
            window.mstag = {loadTag : function () {}, time : (new Date()).getTime()};
            window.mstag.loadTag("analytics", {dedup: "1", domainId: GDPRtoolkit.user.microsoftcampaignanalyticsdomainId, type: "1", actionid: GDPRtoolkit.user.microsoftcampaignanalyticsactionId});
        });
    }
};

// pinterest
GDPRtoolkit.services.pinterest = {
    "key": "pinterest",
    "type": "social",
    "name": "Pinterest",
    "uri": "https://about.pinterest.com/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['tacPinterest'], '');
        GDPRtoolkit.addScript('//assets.pinterest.com/js/pinit.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'pinterest';
        GDPRtoolkit.fallback(['tacPinterest'], GDPRtoolkit.engage(id));
    }
};

// prelinker
GDPRtoolkit.services.prelinker = {
    "key": "prelinker",
    "type": "ads",
    "name": "Prelinker",
    "uri": "http://www.prelinker.com/index/index/cgu/",
    "needConsent": true,
    "cookies": ['_sp_id.32f5', '_sp_ses.32f5'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        GDPRtoolkit.fallback(['prelinker-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" siteId="' + x.getAttribute('siteId') + '" bannerId="' + x.getAttribute('bannerId') + '" defaultLanguage="' + x.getAttribute('defaultLanguage') + '" tracker="' + x.getAttribute('tracker') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'http://promo.easy-dating.org/banner/index?';
            uri += 'site_id=' + document.getElementById(uniqIds[i]).getAttribute('siteId') + '&';
            uri += 'banner_id=' + document.getElementById(uniqIds[i]).getAttribute('bannerId') + '&';
            uri += 'default_language=' + document.getElementById(uniqIds[i]).getAttribute('defaultLanguage') + '&';
            uri += 'tr4ck=' + document.getElementById(uniqIds[i]).getAttribute('trackrt');

            GDPRtoolkit.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'prelinker';
        GDPRtoolkit.fallback(['prelinker-canvas'], GDPRtoolkit.engage(id));
    }
};

// prezi
GDPRtoolkit.services.prezi = {
    "key": "prezi",
    "type": "video",
    "name": "Prezi",
    "uri": "https://prezi.com/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['prezi-canvas'], function (x) {
            var id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = 'https://prezi.com/embed/' + id + '/?bgcolor=ffffff&amp;lock_to_path=0&amp;autoplay=0&amp;autohide_ctrls=0';

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'prezi';
        GDPRtoolkit.fallback(['prezi-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// pubdirecte
GDPRtoolkit.services.pubdirecte = {
    "key": "pubdirecte",
    "type": "ads",
    "name": "Pubdirecte",
    "uri": "http://pubdirecte.com/contact.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        GDPRtoolkit.fallback(['pubdirecte-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" pid="' + x.getAttribute('pid') + '" ref="' + x.getAttribute('ref') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = '//www.pubdirecte.com/script/banniere.php?';
            uri += 'id=' + document.getElementById(uniqIds[i]).getAttribute('pid') + '&';
            uri += 'ref=' + document.getElementById(uniqIds[i]).getAttribute('ref');

            GDPRtoolkit.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'pubdirecte';
        GDPRtoolkit.fallback(['pubdirecte-canvas'], GDPRtoolkit.engage(id));
    }
};

// purechat
GDPRtoolkit.services.purechat = {
    "key": "purechat",
    "type": "support",
    "name": "PureChat",
    "uri": "https://www.purechat.com/privacy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.purechatId === undefined) {
            return;
        }

        GDPRtoolkit.addScript('//app.purechat.com/VisitorWidget/WidgetScript', '', function () {
            try {
                window.w = new PCWidget({ c: GDPRtoolkit.user.purechatId, f: true });
            } catch (e) {}
        });
    }
};

// shareaholic
GDPRtoolkit.services.shareaholic = {
    "key": "shareaholic",
    "type": "social",
    "name": "Shareaholic",
    "uri": "https://shareaholic.com/privacy/choices",
    "needConsent": true,
    "cookies": ['__utma', '__utmb', '__utmc', '__utmz', '__utmt_Shareaholic%20Pageviews'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.shareaholicSiteId === undefined) {
            return;
        }

        GDPRtoolkit.fallback(['shareaholic-canvas'], '');
        GDPRtoolkit.addScript('//dsms0mj1bbhn4.cloudfront.net/assets/pub/shareaholic.js', '', function () {
            try {
                Shareaholic.init(GDPRtoolkit.user.shareaholicSiteId);
            } catch (e) {}
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'shareaholic';
        GDPRtoolkit.fallback(['shareaholic-canvas'], GDPRtoolkit.engage(id));
    }
};

// shareasale
GDPRtoolkit.services.shareasale = {
    "key": "shareasale",
    "type": "ads",
    "name": "ShareASale",
    "uri": "https://www.shareasale.com/PrivacyPolicy.pdf",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri;

        GDPRtoolkit.fallback(['shareasale-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '" amount="' + x.getAttribute('amount') + '" tracking="' + x.getAttribute('tracking') + '" transtype="' + x.getAttribute('transtype') + '" persale="' + x.getAttribute('persale') + '" perlead="' + x.getAttribute('perlead') + '" perhit="' + x.getAttribute('perhit') + '" merchantID="' + x.getAttribute('merchantID') + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            uri = 'https://shareasale.com/sale.cfm?';
            uri += 'amount=' + document.getElementById(uniqIds[i]).getAttribute('amount') + '&';
            uri += 'tracking=' + document.getElementById(uniqIds[i]).getAttribute('tracking') + '&';
            uri += 'transtype=' + document.getElementById(uniqIds[i]).getAttribute('transtype') + '&';
            uri += 'persale=' + document.getElementById(uniqIds[i]).getAttribute('persale') + '&';
            uri += 'perlead=' + document.getElementById(uniqIds[i]).getAttribute('perlead') + '&';
            uri += 'perhit=' + document.getElementById(uniqIds[i]).getAttribute('perhit') + '&';
            uri += 'merchantID=' + document.getElementById(uniqIds[i]).getAttribute('merchantID');

            document.getElementById(uniqIds[i]).innerHTML = '<img src=\'' + uri + '\' width=\'1\' height=\'1\' />';
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'shareasale';
        GDPRtoolkit.fallback(['shareasale-canvas'], GDPRtoolkit.engage(id));
    }
};

// sharethis
GDPRtoolkit.services.sharethis = {
    "key": "sharethis",
    "type": "social",
    "name": "ShareThis",
    "uri": "http://www.sharethis.com/legal/privacy/",
    "needConsent": true,
    "cookies": ['__unam'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.sharethisPublisher === undefined) {
            return;
        }
        var switchTo5x = true,
            uri = ('https:' === document.location.protocol ? 'https://ws' : 'http://w') + '.sharethis.com/button/buttons.js';

        GDPRtoolkit.fallback(['tacSharethis'], '');
        GDPRtoolkit.addScript(uri, '', function () {
            stLight.options({publisher: GDPRtoolkit.user.sharethisPublisher, doNotHash: false, doNotCopy: false, hashAddressBar: false});
        });

        if (GDPRtoolkit.isAjax === true) {
            if (typeof stButtons !== "undefined") {
                stButtons.locateElements();
            }
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'sharethis';
        GDPRtoolkit.fallback(['tacSharethis'], GDPRtoolkit.engage(id));
    }
};

// slideshare
GDPRtoolkit.services.slideshare = {
    "key": "slideshare",
    "type": "video",
    "name": "SlideShare",
    "uri": "https://www.linkedin.com/legal/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['slideshare-canvas'], function (x) {
            var id = x.getAttribute("data-id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                url = '//www.slideshare.net/slideshow/embed_code/' + id;

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" scrolling="no" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'slideshare';
        GDPRtoolkit.fallback(['slideshare-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// statcounter
GDPRtoolkit.services.statcounter = {
    "key": "statcounter",
    "type": "analytic",
    "name": "StatCounter",
    "uri": "https://fr.statcounter.com/about/legal/#privacy",
    "needConsent": true,
    "cookies": ['sc_is_visitor_unique'],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            uri = '//statcounter.com/counter/counter.js';

        GDPRtoolkit.fallback(['statcounter-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            return '<div id="' + uniqId + '"></div>';
        });

        for (i = 0; i < uniqIds.length; i += 1) {
            GDPRtoolkit.makeAsync.init(uri, uniqIds[i]);
        }
    },
    "fallback": function () {
        "use strict";
        var id = 'statcounter';
        GDPRtoolkit.fallback(['statcounter-canvas'], GDPRtoolkit.engage(id));
    }
};

// timelinejs
GDPRtoolkit.services.timelinejs = {
    "key": "timelinejs",
    "type": "api",
    "name": "Timeline JS",
    "uri": "http://timeline.knightlab.com/#help",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['timelinejs-canvas'], function (x) {
            var spreadsheet_id = x.getAttribute("spreadsheet_id"),
                width = x.getAttribute("width"),
                height = x.getAttribute("height"),
                lang = x.getAttribute("lang_2_letter"),
                font = x.getAttribute("font"),
                map = x.getAttribute("map"),
                start_at_end = x.getAttribute("start_at_end"),
                hash_bookmark = x.getAttribute("hash_bookmark"),
                start_at_slide = x.getAttribute("start_at_slide"),
                start_zoom = x.getAttribute("start_zoom"),
                url = '//cdn.knightlab.com/libs/timeline/latest/embed/index.html?source=' + spreadsheet_id + '&font=' + font + '&maptype=' + map + '&lang=' + lang + '&start_at_end=' + start_at_end + '&hash_bookmark=' + hash_bookmark + '&start_at_slide=' + start_at_slide + '&start_zoom_adjust=' + start_zoom + '&height=' + height;

            return '<iframe src="' + url + '" width="' + width + '" height="' + height + '" frameborder="0" allowtransparency allowfullscreen></iframe>';
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'timelinejs';
        GDPRtoolkit.fallback(['timelinejs-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// tagcommander
GDPRtoolkit.services.tagcommander = {
    "key": "tagcommander",
    "type": "api",
    "name": "TagCommander",
    "uri": "https://www.commandersact.com/en/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.tagcommanderid === undefined) {
            return;
        }
        GDPRtoolkit.addScript('https://cdn.tagcommander.com/' + GDPRtoolkit.user.tagcommanderid + '.js');
    }
};

// typekit
GDPRtoolkit.services.typekit = {
    "key": "typekit",
    "type": "api",
    "name": "Typekit (adobe)",
    "uri": "https://www.adobe.com/privacy.html",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.typekitId === undefined) {
            return;
        }
        GDPRtoolkit.addScript('//use.typekit.net/' + GDPRtoolkit.user.typekitId + '.js', '', function () {
            try {
                Typekit.load();
            } catch (e) {}
        });
    }
};

// twenga
GDPRtoolkit.services.twenga = {
    "key": "twenga",
    "type": "ads",
    "name": "Twenga",
    "uri": "http://www.twenga.com/privacy.php",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (GDPRtoolkit.user.twengaId === undefined || GDPRtoolkit.user.twengaLocale === undefined) {
            return;
        }

        GDPRtoolkit.addScript('//tracker.twenga.' + GDPRtoolkit.user.twengaLocale + '/st/tracker_' + GDPRtoolkit.user.twengaId + '.js');
    }
};

// twitter
GDPRtoolkit.services.twitter = {
    "key": "twitter",
    "type": "social",
    "name": "Twitter",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['tacTwitter'], '');
        GDPRtoolkit.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twitter';
        GDPRtoolkit.fallback(['tacTwitter'], GDPRtoolkit.engage(id));
    }
};

// twitter embed
GDPRtoolkit.services.twitterembed = {
    "key": "twitterembed",
    "type": "social",
    "name": "Twitter (cards)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        var uniqIds = [],
            i,
            e,
            html;

        GDPRtoolkit.fallback(['twitterembed-canvas'], function (x) {
            var uniqId = '_' + Math.random().toString(36).substr(2, 9);
            uniqIds.push(uniqId);
            html = '<div id="' + uniqId + '" ';
            html += 'tweetid="' + x.getAttribute('tweetid') + '" ';
            html += 'theme="' + x.getAttribute('theme') + '" ';
            html += 'cards="' + x.getAttribute('cards') + '" ';
            html += 'conversation="' + x.getAttribute('conversation') + '" ';
            html += 'data-width="' + x.getAttribute('data-width') + '" ';
            html += 'data-align="' + x.getAttribute('data-align') + '" ';
            html += '></div>';
            return html;
        });

        GDPRtoolkit.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs', function () {
            for (i = 0; i < uniqIds.length; i += 1) {
                e = document.getElementById(uniqIds[i]);
                twttr.widgets.createTweet(
                    e.getAttribute('tweetid'),
                    e,
                    {
                        theme: e.getAttribute('theme'),
                        cards: e.getAttribute('cards'),
                        conversation: e.getAttribute('conversation'),
                        lang: GDPRtoolkit.getLanguage(),
                        dnt: true,
                        width: e.getAttribute('data-width'),
                        align: e.getAttribute('data-align')
                    }
                );
            }
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'twitterembed';
        GDPRtoolkit.fallback(['twitterembed-canvas'], function (elem) {
            elem.style.width = elem.getAttribute('data-width') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// twitter timeline
GDPRtoolkit.services.twittertimeline = {
    "key": "twittertimeline",
    "type": "social",
    "name": "Twitter (timelines)",
    "uri": "https://support.twitter.com/articles/20170514",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['tacTwitterTimelines'], '');
        GDPRtoolkit.addScript('//platform.twitter.com/widgets.js', 'twitter-wjs');
    },
    "fallback": function () {
        "use strict";
        var id = 'twittertimeline';
        GDPRtoolkit.fallback(['tacTwitterTimelines'], GDPRtoolkit.engage(id));
    }
};

// user voice
GDPRtoolkit.services.uservoice = {
    "key": "uservoice",
    "type": "support",
    "name": "UserVoice",
    "uri": "https://www.uservoice.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.userVoiceApi === undefined) {
            return;
        }
        GDPRtoolkit.addScript('//widget.uservoice.com/' + GDPRtoolkit.user.userVoiceApi + '.js');
    }
};

// vimeo
GDPRtoolkit.services.vimeo = {
    "key": "vimeo",
    "type": "video",
    "name": "Vimeo",
    "uri": "https://vimeo.com/privacy",
    "needConsent": true,
    "cookies": ['__utmt_player', '__utma', '__utmb', '__utmc', '__utmv', 'vuid', '__utmz', 'player'],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['vimeo_player'], function (x) {
            var video_width = x.getAttribute("data-width") || x.getAttribute("width"),
                frame_width = 'width=',
                video_height = x.getAttribute("data-height") || x.getAttribute("height"),
                frame_height = 'height=',

                video_id = x.getAttribute("data-videoID") || x.getAttribute("videoID"),
                video_autopause = x.getAttribute("data-autopause") || '',
                video_autoplay = x.getAttribute("data-autoplay") || x.getAttribute("autoplay") || '',
                video_background = x.getAttribute("data-background") || '',
                video_byline = x.getAttribute("data-byline") || x.getAttribute("byline") || '',
                video_color = x.getAttribute("data-color") || '',
                video_controls = x.getAttribute("data-controls") || '',
                video_loop = x.getAttribute("data-loop") || x.getAttribute("loop") || '',
                video_maxheight = x.getAttribute("data-maxheight") || '',
                video_maxwidth = x.getAttribute("data-maxwidth") || '',
                video_muted = x.getAttribute("data-muted") || '',
                video_playsinline = x.getAttribute("data-playsinline") || '',
                video_portrait = x.getAttribute("data-portrait") || x.getAttribute("portrait") || '',
                video_speed = x.getAttribute("data-speed") || '',
                video_title = x.getAttribute("data-title") || x.getAttribute("title") || '',
                video_transparent = x.getAttribute("data-transparent") || '',

                video_frame;

            var video_qs = '';

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height += '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }

            if (video_title.length > 0 || video_byline.length > 0 || video_portrait.length > 0) {

                video_qs = "?";

                if (video_title.length > 0) {
                    video_qs += "title=" + video_title;
                }

                if (video_byline.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "byline=" + video_byline;
                }

                if (video_portrait.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "portrait=" + video_portrait;
                }

                if (video_loop.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "loop=" + video_loop;
                }

                if (video_autoplay.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "autoplay=" + video_autoplay;
                }

                if (video_autopause.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "autopause=" + video_autopause;
                }

                if (video_background.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "background=" + video_background;
                }

                if (video_color.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "color=" + video_color;
                }

                if (video_controls.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "controls=" + video_controls;
                }

                if (video_maxheight.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "maxheight=" + video_maxheight;
                }

                if (video_maxwidth.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "maxwidth=" + video_maxwidth;
                }

                if (video_muted.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "muted=" + video_muted;
                }

                if (video_playsinline.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "playsinline=" + video_playsinline;
                }

                if (video_speed.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "speed=" + video_speed;
                }

                if (video_transparent.length > 0) {
                    if (video_qs.length > 1) {
                        video_qs += "&";
                    }
                    video_qs += "transparent=" + video_transparent;
                }


            }

            video_frame = '<iframe src="//player.vimeo.com/video/' + video_id + video_qs + '" ' + frame_width + frame_height + ' frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'vimeo';
        GDPRtoolkit.fallback(['vimeo_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// visualrevenue
GDPRtoolkit.services.visualrevenue = {
    "key": "visualrevenue",
    "type": "analytic",
    "name": "VisualRevenue",
    "uri": "http://www.outbrain.com/legal/privacy-713/",
    "needConsent": true,
    "cookies": ['__vrf', '__vrm', '__vrl', '__vry', '__vru', '__vrid', '__vrz'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.visualrevenueId === undefined) {
            return;
        }
        window._vrq = window._vrq || [];
        window._vrq.push(['id', GDPRtoolkit.user.visualrevenueId]);
        window._vrq.push(['automate', true]);
        window._vrq.push(['track', function () {}]);
        GDPRtoolkit.addScript('http://a.visualrevenue.com/vrs.js');
    }
};

// vshop
GDPRtoolkit.services.vshop = {
    "key": "vshop",
    "type": "ads",
    "name": "vShop",
    "uri": "http://vshop.fr/privacy-policy",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['vcashW'], '');
        GDPRtoolkit.addScript('//vshop.fr/js/w.js');
    },
    "fallback": function () {
        "use strict";
        var id = 'vshop';
        GDPRtoolkit.fallback(['vcashW'], GDPRtoolkit.engage(id));
    }
};

// wysistat
GDPRtoolkit.services.wysistat = {
    "key": "wysistat",
    "type": "analytic",
    "name": "Wysistat",
    "uri": "http://wysistat.net/contact/",
    "needConsent": true,
    "cookies": ['Wysistat'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.wysistat === undefined) {
            return;
        }
        GDPRtoolkit.addScript('//www.wysistat.com/statistique.js', '', function () {
            window.stat(GDPRtoolkit.user.wysistat.cli, GDPRtoolkit.user.wysistat.frm, GDPRtoolkit.user.wysistat.prm, GDPRtoolkit.user.wysistat.ce, GDPRtoolkit.user.wysistat.page, GDPRtoolkit.user.wysistat.roi, GDPRtoolkit.user.wysistat.prof, GDPRtoolkit.user.wysistat.cpt);
        });
    }
};

// xiti
GDPRtoolkit.services.xiti = {
    "key": "xiti",
    "type": "analytic",
    "name": "Xiti",
    "uri": "https://www.atinternet.com/societe/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.xitiId === undefined) {
            return;
        }
        var Xt_param = 's=' + GDPRtoolkit.user.xitiId + '&p=',
            Xt_r,
            Xt_h,
            Xt_i,
            Xt_s,
            div = document.createElement('div');
        try {
            Xt_r = top.document.referrer;
        } catch (e) {
            Xt_r = document.referrer;
        }
        Xt_h = new Date();
        Xt_i = '<img style="display:none" border="0" alt="" ';
        Xt_i += 'src="http://logv3.xiti.com/hit.xiti?' + Xt_param;
        Xt_i += '&hl=' + Xt_h.getHours() + 'x' + Xt_h.getMinutes() + 'x' + Xt_h.getSeconds();
        if (parseFloat(navigator.appVersion) >= 4) {
            Xt_s = screen;
            Xt_i += '&r=' + Xt_s.width + 'x' + Xt_s.height + 'x' + Xt_s.pixelDepth + 'x' + Xt_s.colorDepth;
        }

        div.innerHTML = Xt_i + '&ref=' + Xt_r.replace(/[<>"]/g, '').replace(/&/g, '$') + '" title="Internet Audience">';
        document.getElementsByTagName('body')[0].appendChild(div.firstChild);

        if (typeof GDPRtoolkit.user.xitiMore === 'function') {
            GDPRtoolkit.user.xitiMore();
        }
    }
};

// AT Internet
GDPRtoolkit.services.atinternet = {
    "key": "atinternet",
    "type": "analytic",
    "name": "AT Internet",
    "uri": "https://www.atinternet.com/societe/rgpd-et-vie-privee/",
    "needConsent": true,
    "cookies": ['atidvisitor', 'atreman', 'atredir', 'atsession', 'atuserid'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.atLibUrl === undefined) {
            return;
        }

        GDPRtoolkit.addScript(GDPRtoolkit.user.atLibUrl, '', function() {

            var tag = new ATInternet.Tracker.Tag();

            if (typeof GDPRtoolkit.user.atMore === 'function') {
                GDPRtoolkit.user.atMore();
            }
        })
    }
};

// youtube
GDPRtoolkit.services.youtube = {
    "key": "youtube",
    "type": "video",
    "name": "YouTube",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['youtube_player'], function (x) {
            var video_id = x.getAttribute("videoID"),
                video_width = x.getAttribute("width"),
                frame_width = 'width=',
                video_height = x.getAttribute("height"),
                frame_height = 'height=',
                video_frame,
                params = 'theme=' + x.getAttribute("theme") + '&rel=' + x.getAttribute("rel") + '&controls=' + x.getAttribute("controls") + '&showinfo=' + x.getAttribute("showinfo") + '&autoplay=' + x.getAttribute("autoplay");

            if (video_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height +=  '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/' + video_id + '?' + params + '" frameborder="0" allowfullscreen></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtube';
        GDPRtoolkit.fallback(['youtube_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// youtube playlist
GDPRtoolkit.services.youtubeplaylist = {
    "key": "youtubeplaylist",
    "type": "video",
    "name": "YouTube (playlist)",
    "uri": "https://policies.google.com/privacy",
    "needConsent": true,
    "cookies": ['VISITOR_INFO1_LIVE', 'YSC', 'PREF', 'GEUP'],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['youtube_playlist_player'], function (x) {
            var playlist_id = x.getAttribute("playlistID"),
                video_width = x.getAttribute("width"),
                frame_width = 'width=',
                video_height = x.getAttribute("height"),
                frame_height = 'height=',
                video_frame,
                params = 'theme=' + x.getAttribute("theme") + '&rel=' + x.getAttribute("rel") + '&controls=' + x.getAttribute("controls") + '&showinfo=' + x.getAttribute("showinfo") + '&autoplay=' + x.getAttribute("autoplay");

            if (playlist_id === undefined) {
                return "";
            }
            if (video_width !== undefined) {
                frame_width += '"' + video_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (video_height !== undefined) {
                frame_height +=  '"' + video_height + '" ';
            } else {
                frame_height += '"" ';
            }
            video_frame = '<iframe type="text/html" ' + frame_width + frame_height + ' src="//www.youtube-nocookie.com/embed/videoseries?list=' + playlist_id + '&' + params + '" frameborder="0" allowfullscreen></iframe>';
            return video_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'youtubeplaylist';
        GDPRtoolkit.fallback(['youtube_playlist_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// zopim
GDPRtoolkit.services.zopim = {
    "key": "zopim",
    "type": "support",
    "name": "Zopim",
    "uri": "https://www.zopim.com/privacy",
    "needConsent": true,
    "cookies": ['__zlcid', '__zprivacy'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.zopimID === undefined) {
            return;
        }
        GDPRtoolkit.addScript('//v2.zopim.com/?' + GDPRtoolkit.user.zopimID);
    }
};

// xiti smartTag
GDPRtoolkit.services.xiti_smarttag = {
    "key": "xiti_smarttag",
    "type": "analytic",
    "name": "Xiti (SmartTag)",
    "uri": "https://www.atinternet.com/societe/protection-des-donnees/",
    "needConsent": true,
    "cookies": ["atidvisitor", "atreman", "atredir", "atsession", "atuserid", "attvtreman", "attvtsession"],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.xiti_smarttagLocalPath !== undefined) {
            GDPRtoolkit.addScript(GDPRtoolkit.user.xiti_smarttagLocalPath, 'smarttag', null, null, "onload", "addTracker();");
        } else {
            var xitiSmarttagId = GDPRtoolkit.user.xiti_smarttagSiteId;
            if (xitiSmarttagId === undefined) {
                return;
            }

            GDPRtoolkit.addScript('//tag.aticdn.net/' + xitiSmarttagId + '/smarttag.js', 'smarttag', null, null, "onload", "addTracker();");
        }
    }
};

// facebook pixel
GDPRtoolkit.services.facebookpixel = {
    "key": "facebookpixel",
    "type": "ads",
    "name": "Facebook Pixel",
    "uri": "https://fr-fr.facebook.com/business/help/www/651294705016616",
    "needConsent": true,
    "cookies": ['datr', 'fr', 'reg_ext_ref', 'reg_fb_gate', 'reg_fb_ref', 'sb', 'wd', 'x-src'],
    "js": function () {
        "use strict";
        var n;
        if(window.fbq)return;
        n=window.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)} ;
        if(!window._fbq)window._fbq=n;
        n.push=n;
        n.loaded=!0;
        n.version='2.0';
        n.queue=[];
        GDPRtoolkit.addScript('https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', GDPRtoolkit.user.facebookpixelId);
        fbq('track', 'PageView');

        if (typeof GDPRtoolkit.user.facebookpixelMore === 'function') {
            GDPRtoolkit.user.facebookpixelMore();
        }
    }
};

//Issuu
GDPRtoolkit.services.issuu = {
    "key": "issuu",
    "type": "other",
    "name": "Issuu",
    "uri": "https://issuu.com/legal/privacy",
    "needConsent": true,
    "cookies": ['__qca', 'iutk', 'mc'],
    "js": function () {
        "use strict";
        GDPRtoolkit.fallback(['issuu_player'], function (x) {
            var issuu_id = x.getAttribute("issuuID"),
                issuu_width = x.getAttribute("width"),
                frame_width = 'width=',
                issuu_height = x.getAttribute("height"),
                frame_height = 'height=',
                issuu_frame;

            if (issuu_id === undefined) {
                return "";
            }
            if (issuu_width !== undefined) {
                frame_width += '"' + issuu_width + '" ';
            } else {
                frame_width += '"" ';
            }
            if (issuu_height !== undefined) {
                frame_height +=  '"' + issuu_height + '" ';
            } else {
                frame_height += '"" ';
            }
            issuu_frame = '<iframe type="text/html" ' + frame_width + frame_height + ' src="//e.issuu.com/embed.html#' + issuu_id + '" frameborder="0"></iframe>';
            return issuu_frame;
        });
    },
    "fallback": function () {
        "use strict";
        var id = 'issuu';
        GDPRtoolkit.fallback(['issuu_player'], function (elem) {
            elem.style.width = elem.getAttribute('width') + 'px';
            elem.style.height = elem.getAttribute('height') + 'px';
            return GDPRtoolkit.engage(id);
        });
    }
};

// webmecanik
GDPRtoolkit.services.webmecanik = {
    "key": "webmecanik",
    "type": "analytic",
    "name": "Webmecanik",
    "uri": "https://webmecanik.com/tos",
    "needConsent": true,
    "cookies": ['mtc_id', 'mtc_sid'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.webmecanikurl === undefined) {
            return;
        }

        window.WebmecanikTrackingObject = 'mt';
        window.mt = window.mt || function () {
            window.mt.q = window.mt.q || [];
            window.mt.q.push(arguments);
        };

        GDPRtoolkit.addScript(GDPRtoolkit.user.webmecanikurl, '', function() {
            mt('send', 'pageview');
        });
    }
};

// google analytics multiple
GDPRtoolkit.services.multiplegtag = {
    "key": "multiplegtag",
    "type": "analytic",
    "name": "Google Analytics (gtag.js)",
    "uri": "https://support.google.com/analytics/answer/6004245",
    "needConsent": true,
    "cookies": (function () {

        var cookies = ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'];

        if (GDPRtoolkit.user.multiplegtagUa !== undefined) {
            GDPRtoolkit.user.multiplegtagUa.forEach(function(ua) {
                cookies.push('_gat_gtag_' + ua.replace(/-/g, '_'));
            });
        }

        return cookies;
    })(),
    "js": function () {
        "use strict";
        window.dataLayer = window.dataLayer || [];

        GDPRtoolkit.user.multiplegtagUa.forEach(function(ua) {

            GDPRtoolkit.addScript('https://www.googletagmanager.com/gtag/js?id=' + ua, '', function () {
                window.gtag = function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ua);
            });
        });
    }
};

// Koban
GDPRtoolkit.services.koban = {
    "key": "koban",
    "type": "analytic",
    "name": "Koban",
    "uri": "https://koban.cloud/tos",
    "needConsent": true,
    "cookies": ['kbntrk'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.kobanurl === undefined) {
            return;
        }
        if (GDPRtoolkit.user.kobanapi === undefined) {
            return;
        }
        window.KobanObject = 'kb';
        window.kb = window.kb || function() {
            window.kb.q = window.kb.q || [];
            window.kb.q.push(arguments);
        };
        window.kb.l = new Date();
        kb('reg', GDPRtoolkit.user.kobanapi);
        GDPRtoolkit.addScript(GDPRtoolkit.user.kobanurl, '', function() {
        });
    }
};

// matomo

/*
    1. Set the following variable before the initialization :

    GDPRtoolkit.user.matomoId = YOUR_SITE_ID_FROM_MATOMO;
    GDPRtoolkit.user.matomoHost = "YOUR_MATOMO_URL"; //eg: https://stat.mydomain.com/

    2. Push the service :

    (GDPRtoolkit.job = GDPRtoolkit.job || []).push('matomo');

    3. HTML
    You don't need to add any html code, if the service is autorized, the javascript is added. otherwise no.
 */
GDPRtoolkit.services.matomo = {
    "key": "matomo",
    "type": "analytic",
    "name": "Matomo (formerly known as Piwik)",
    "uri": "https://matomo.org/faq/general/faq_146/",
    "needConsent": false,
    "cookies": ['_pk_ref', '_pk_cvar', '_pk_id', '_pk_ses', '_pk_hsr', 'piwik_ignore', '_pk_uid'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.matomoId === undefined) {
            return;
        }

        window._paq = window._paq || [];
        window._paq.push(["setSiteId", GDPRtoolkit.user.matomoId]);
        window._paq.push(["setTrackerUrl", GDPRtoolkit.user.matomoHost + "piwik.php"]);
        window._paq.push(["setDoNotTrack", 1]);
        window._paq.push(["trackPageView"]);
        window._paq.push(["setIgnoreClasses", ["no-tracking", "colorbox"]]);
        window._paq.push(["enableLinkTracking"]);
        window._paq.push([function() {
            var self = this;
            function getOriginalVisitorCookieTimeout() {
                var now = new Date(),
                nowTs = Math.round(now.getTime() / 1000),
                visitorInfo = self.getVisitorInfo();
                var createTs = parseInt(visitorInfo[2]);
                var cookieTimeout = 33696000; // 13 mois en secondes
                var originalTimeout = createTs + cookieTimeout - nowTs;
                return originalTimeout;
            }
            this.setVisitorCookieTimeout( getOriginalVisitorCookieTimeout() );
        }]);

        GDPRtoolkit.addScript(GDPRtoolkit.user.matomoHost + 'piwik.js', '', '', true, 'defer', true);

        // waiting for piwik to be ready to check first party cookies
        var interval = setInterval(function() {
            if (typeof Piwik === 'undefined') return

            clearInterval(interval)

            // make piwik/matomo cookie accessible by getting tracker
            Piwik.getTracker();

            // looping throught cookies
            var theCookies = document.cookie.split(';');
            for (var i = 1 ; i <= theCookies.length; i++) {
                var cookie = theCookies[i-1].split('=');
                var cookieName = cookie[0].trim();

                // if cookie starts like a piwik one, register it
                if (cookieName.indexOf('_pk_') === 0) {
                    GDPRtoolkit.services.matomo.cookies.push(cookieName);
                }
            }
        }, 100)
    }
};

// Hotjar
 /*
    1. Set the following variable before the initialization :
     GDPRtoolkit.user.hotjarId = YOUR_WEBSITE_ID;
    GDPRtoolkit.user.HotjarSv = XXXX; // Can be found in your website tracking code as "hjvs=XXXX"
     2. Push the service :
     (GDPRtoolkit.job = GDPRtoolkit.job || []).push('hotjar');
     3. HTML
    You don't need to add any html code, if the service is autorized, the javascript is added. otherwise no.
  */
GDPRtoolkit.services.hotjar = {
    "key": "hotjar",
    "type": "analytic",
    "name": "Hotjar",
    "uri": "https://help.hotjar.com/hc/en-us/categories/115001323967-About-Hotjar",
    "needConsent": true,
    "cookies": ["hjClosedSurveyInvites", "_hjDonePolls", "_hjMinimizedPolls", "_hjDoneTestersWidgets", "_hjMinimizedTestersWidgets", "_hjDoneSurveys", "_hjIncludedInSample", "_hjShownFeedbackMessage"],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.hotjarId === undefined || GDPRtoolkit.user.HotjarSv === undefined) {
            return;
        }
         window.hj = window.hj || function() {
            (window.hj.q = window.hj.q || []).push(arguments)
        };
        window._hjSettings = {
            hjid: GDPRtoolkit.user.hotjarId,
            hjsv: GDPRtoolkit.user.HotjarSv
        };
         var uri = 'https://static.hotjar.com/c/hotjar-';
        var extension = '.js?sv=';
        GDPRtoolkit.addScript(uri + window._hjSettings.hjid + extension + window._hjSettings.hjsv);
    }
};

// bing ads universal event tracking
GDPRtoolkit.services.bingads = {
    'key': 'bingads',
    'type': 'ads',
    'name': 'Bing Ads Universal Event Tracking',
    'uri': 'https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads',
    'needConsent': true,
    'cookies': ['_uetmsclkid'],
    'js': function () {
        'use strict';
        var u = GDPRtoolkit.user.bingadsTag || 'uetq';
        window[u] = window[u] || [];

        GDPRtoolkit.addScript('https://bat.bing.com/bat.js', '', function () {
            var bingadsCreate = {ti: GDPRtoolkit.user.bingadsID};

            if ('bingadsStoreCookies' in GDPRtoolkit.user) {
                bingadsCreate['storeConvTrackCookies'] = GDPRtoolkit.user.bingadsStoreCookies;
            }

            bingadsCreate.q = window[u];
            window[u] = new UET(bingadsCreate);
            window[u].push('pageLoad');
        });
    }
};

//Matterport
/*
SERVICE INIT
    (GDPRtoolkit.job = GDPRtoolkit.job || []).push('matterport');

HTML TAG
    <div class="matterport" matterportid="N2Q67sZUNUd" width="100%" height="550" parameters="&play=1"></div>

DELETE IFRAME
    <iframe type="text/html" width="100%" height="550" src="https://my.matterport.com/show/?m=N2Q67sZUNUd&utm_source=hit-content&play=1" frameborder="0" allowfullscreen="allowfullscreen"></iframe>'
 */
GDPRtoolkit.services.matterport = {
  "key": "matterport",
  "type": "other",
  "name": "Matterport",
  "uri": "https://matterport.com/es/legal/privacy-policy/",
  "needConsent": true,
  "cookies": ['__cfduid', 'ajs_anonymous_id', 'ajs_group_id', 'ajs_user_id'],
  "js": function () {
    "use strict";
    GDPRtoolkit.fallback(['matterport'], function (x) {
      var matterport_id = x.getAttribute("matterportID"),
        matterport_width = x.getAttribute("width"),
        frame_width = 'width=',
        matterport_height = x.getAttribute("height"),
        frame_height = 'height=',
        matterport_parameters = x.getAttribute("parameters"),
        matterport_frame;

      if (matterport_id === undefined) {
        return "";
      }
      if (matterport_width !== undefined) {
        frame_width += '"' + matterport_width + '" ';
      } else {
        frame_width += '"" ';
      }
      if (matterport_height !== undefined) {
        frame_height += '"' + matterport_height + '" ';
      } else {
        frame_height += '"" ';
      }
      if (matterport_parameters === undefined) {
        return "";
      }

      matterport_frame = '<iframe type="text/html" ' + frame_width + frame_height + ' src="https://my.matterport.com/show/?m=' + matterport_id + '&utm_source=hit-content' + matterport_parameters + '" frameborder="0" allowfullscreen="allowfullscreen"></iframe>';
      return matterport_frame;
    });
  },
  "fallback": function () {
    "use strict";
    var id = 'matterport';
    GDPRtoolkit.fallback(['matterport'], function (elem) {
      elem.style.width = elem.getAttribute('width') + 'px';
      elem.style.height = elem.getAttribute('height') + 'px';
      return GDPRtoolkit.engage(id);
    });
  }
};

// Adform
GDPRtoolkit.services.adform = {
    "key": "adform",
    "type": "ads",
    "name": "Adform",
    "uri": "https://site.adform.com/privacy-center/overview/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";

        if (GDPRtoolkit.user.adformpm === undefined || GDPRtoolkit.user.adformpagename === undefined) {
            return;
        }

        window._adftrack = {
            pm: GDPRtoolkit.user.adformpm,
            divider: encodeURIComponent('|'),
            pagename: encodeURIComponent(GDPRtoolkit.user.adformpagename)
        };

        GDPRtoolkit.addScript("https://track.adform.net/serving/scripts/trackpoint/async/");
    }
};

// Active Campaign
GDPRtoolkit.services.activecampaign = {
    "key": "activecampaign",
    "type": "ads",
    "name": "Active Campaign",
    "uri": "https://www.activecampaign.com/privacy-policy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.actid === undefined) {
            return;
        }

        window.trackcmp_email = '';

        GDPRtoolkit.addScript('https://trackcmp.net/visit?actid='+GDPRtoolkit.user.actid+'&e='+encodeURIComponent(trackcmp_email)+'&r='+encodeURIComponent(document.referrer)+'&u='+encodeURIComponent(window.location.href));
    }
};

// tawk.to
GDPRtoolkit.services.tawkto = {
    "key": "tawkto",
    "type": "support",
    "name": "Tawk.to chat",
    "uri": "https://www.tawk.to/data-protection/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.tawktoId === undefined) {
            return;
        }

        window.Tawk_API=window.Tawk_API||{};
        window.Tawk_LoadStart=new Date();

        GDPRtoolkit.addScript('https://embed.tawk.to/' + GDPRtoolkit.user.tawktoId + '/default');
    }

};

// getquanty
GDPRtoolkit.services.getquanty = {
    "key": "getquanty",
    "type": "analytic",
    "name": "GetQuanty",
    "uri": "https://www.getquanty.com/mentions-legales/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.getguanty === undefined) {
            return;
        }

        window.webleads_site_ids = window.webleads_site_ids || [];
        window.webleads_site_ids.push(GDPRtoolkit.user.getguanty);

        GDPRtoolkit.addScript('https://stats.webleads-tracker.com/js');
        GDPRtoolkit.addScript('https://get.smart-data-systems.com/track?site_id=' + GDPRtoolkit.user.getguanty);
    }
};

// emolytics
GDPRtoolkit.services.emolytics = {
    "key": "emolytics",
    "type": "analytic",
    "name": "Emolytics",
    "uri": "https://www.emolytics.com/main/privacy-policy.php",
    "needConsent": true,
    "cookies": ['__hssc', '__hssrc', '__hstc', '_ga', '_gid', 'hubspotutk', 'lang', 'incap_ses_', 'nlbi_', 'visid_incap_'],
    "js": function () {
        "use strict";
        if (GDPRtoolkit.user.emolyticsID === undefined) {
            return;
        }
        var scriptEmolytics = document.createElement('script');
        scriptEmolytics.text = 'var getsmily_id="'+GDPRtoolkit.user.emolyticsID+'";';
        document.getElementsByTagName('body')[0].appendChild(scriptEmolytics);
        GDPRtoolkit.addScript('https://cdn.emolytics.com/script/emolytics-widget.js')
    }
};

// youtubeapi
GDPRtoolkit.services.youtubeapi = {
    "key": "youtubeapi",
    "type": "video",
    "name": "Youtube (Js API)",
    "uri": "https://policies.google.com/privacy/",
    "needConsent": true,
    "cookies": [],
    "js": function () {
        "use strict";
        GDPRtoolkit.addScript('https://www.youtube.com/player_api');
    }
};
