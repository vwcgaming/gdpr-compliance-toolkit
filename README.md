[![](https://data.jsdelivr.com/v1/package/gh/AmauriC/tarteaucitron.js/badge)](https://www.jsdelivr.com/package/gh/AmauriC/tarteaucitron.js) 
[![npm](https://img.shields.io/npm/v/tarteaucitronjs.svg)](https://www.npmjs.com/package/tarteaucitronjs) [![GitHub contributors](https://img.shields.io/github/contributors/AmauriC/tarteaucitron.js.svg)](https://github.com/AmauriC/tarteaucitron.js/graphs/contributors)

GDPRtoolkit
================
Comply to the european cookie law.

# What is this script?
The european cookie law regulates the management of cookies and you should ask your visitors their consent before exposing them to third party services.

This script will:
- Disable all services by default,
- Display a banner on the first page view and a small one on other pages,
- Display a panel to allow or deny each services one by one,
- Activate services on the second page view if not denied,
- Store the consent in a cookie for 365 days.

Bonus:
- Load service when user click on Allow (without reload of the page),
- Incorporate a fallback system (display a link instead of social button and a static banner instead of advertising).




# How to use

```html
<script type="text/javascript" src="/GDPRtoolkit/GDPRtoolkit.js"></script>

<script type="text/javascript">
GDPRtoolkit.init({
    "privacyUrl": "", /* Privacy policy url */

    "hashtag": "#GDPRtoolkit", /* Open the panel with this hashtag */
    "cookieName": "GDPRtoolkit", /* Cookie name */
    
    "orientation": "middle", /* Banner position (top - bottom) */
    "showAlertSmall": true, /* Show the small banner on bottom right */
    "cookieslist": true, /* Show the cookie list */

    "adblocker": false, /* Show a Warning if an adblocker is detected */
    "AcceptAllCta" : true, /* Show the accept all button when highPrivacy on */
    "highPrivacy": true, /* Disable auto consent */
    "handleBrowserDNTRequest": false, /* If Do Not Track == 1, disallow all */

    "removeCredit": false, /* Remove credit link */
    "moreInfoLink": true, /* Show more info link */
    "useExternalCss": false, /* If false, the GDPRtoolkit.css file will be loaded */

    //"cookieDomain": ".my-multisite-domaine.fr", /* Shared cookie for subdomain website */
                          
    "readmoreLink": "/cookiespolicy" /* Change the default readmore link pointing to opt-out.ferank.eu */
});
</script>
```

# Create custom service
```js
tarteaucitron.services.mycustomservice = {
  "key": "mycustomservice",
  "type": "social|analytic|ads|video|support",
  "name": "MyCustomService",
  "needConsent": true,
  "cookies": ['cookie', 'cookie2'],
  "readmoreLink": "/custom_read_more", // If you want to change readmore link
  "js": function () {
    "use strict";
    // When user allow cookie
  },
  "fallback": function () {
    "use strict";
    // when use deny cookie
  }
};
```
