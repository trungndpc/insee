export default class WebUtil {
    static getCurrentDomain() {
        return "https://" + window.location.hostname;
    }

    static getParam(name) {
        var url = new URL(window.location.href);
        return url.searchParams.get(name);
    }

    static isOSDevice() {
        return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }
}