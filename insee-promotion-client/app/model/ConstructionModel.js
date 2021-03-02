import APIUtils from '../utils/APIUtils'

export default class ConstructionModel {

    static addOrUpdate(data) {
        return new Promise((resolve, reject) => {
            APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/construction/create`, JSON.stringify(data), resolve, reject);
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/construction?id=${id}`, resolve, reject);
        });
    }

}