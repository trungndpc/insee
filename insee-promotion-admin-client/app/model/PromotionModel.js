import APIUtils from '../utils/APIUtils'


export default class PromotionModel {

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/post?id=` + id, resolve, reject);
        });
    }

}