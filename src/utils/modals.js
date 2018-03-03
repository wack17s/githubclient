class WebView {
    setRef(ref) {
        this.webview = ref;
    }

    open(params, callback) {
        if (!this.webview) return;

        this.webview.open(params, callback);
    }
}

export const webview = new WebView();
