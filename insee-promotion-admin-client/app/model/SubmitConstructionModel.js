import APIUtils from '../utils/APIUtils'


export default class SubmitConstructionModel {
    static list(constructionId) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/submit-construction/list?constructionId=${constructionId}`, resolve, reject);
        });
    }

    static updateStatus(id, status, note) {
        var body = { id: id, status: status, note: note }
        return new Promise((resolve, reject) => {
            APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/submit-construction/update-status`, JSON.stringify(body), resolve, reject);
        });
    }
}