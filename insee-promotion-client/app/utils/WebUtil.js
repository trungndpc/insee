export default class WebUtil {
    static getCurrentDomain() {
        return "https://" + window.location.hostname;
    }
}