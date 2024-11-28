class SettingCookie {

    setGdprCookies() {
        //Adding a cookie to make sure the GDPR prompt is not received again and again
        const COOKIE_NAME = "CookieConsent";
        const COOKIE_VALUE = true

        Cypress.on("window:before:load", window => {
            window.document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}`;
        });
    }
}

export default SettingCookie;