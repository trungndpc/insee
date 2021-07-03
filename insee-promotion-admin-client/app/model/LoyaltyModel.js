import APIUtils from '../utils/APIUtils'

export default class LoyaltyModel {

    static getList(page, pageSize) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/loyalty/list?&page=${page}&pageSize=${pageSize}`, resolve, reject);
        });
    }

    static get(customerId) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/loyalty/get?id=${customerId}`, resolve, reject);
        });
    }

}