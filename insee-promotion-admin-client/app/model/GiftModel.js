import APIUtils from '../utils/APIUtils'

export default class GiftModel {
    static randomGift() {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/gift/random-gift`, resolve, reject);
        });
    }

    static getList(type, status, page, pageSize) {
        let url = process.env.DOMAIN + `/api/admin/gift/list?&page=${page}&pageSize=${pageSize}`;
        status != -1 && (url += `&status=${status}`)
        type != -1 && (url += `&type=${type}`)
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(url, resolve, reject);
        });
    }

}