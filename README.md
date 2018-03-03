### Problems:
##### WebView on Android <=4.4 uses old webkit (not chromium based) which can't open websites with TLS 1.1 & 1.2
For example: `https://github.com/`
- https://stackoverflow.com/questions/29849516/webviewclient-returning-couldnt-establish-a-secure-connection-upon-recreatin
- https://blog.github.com/2014-01-07-improving-our-ssl-setup/
Solution: use [crosswalk](https://crosswalk-project.org/documentation/android.html) WebView for android.
Lib: `https://github.com/wack17s/react-native-webview-crosswalk`
