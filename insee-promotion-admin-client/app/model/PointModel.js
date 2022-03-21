import APIUtils from '../utils/APIUtils'

export default class PointModel {

    static getList(typeGift, status, page, pageSize) {
        let url = process.env.DOMAIN + `/api/admin/point/list?&page=${page}&pageSize=${pageSize}&type=2`;
        status != -1 && (url += `&status=${status}`)
        typeGift != -1 && (url += `&typeGift=${typeGift}`)
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(url, resolve, reject);
        });
    }

    static get(id) {
        let url = process.env.DOMAIN + `/api/admin/point/get?id=${id}`
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(url, resolve, reject);
        });
    }

    static updateStatus(id, status) {
        var body = {
            status: status
        }
        return new Promise((resolve, reject) => {
            APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/point/update-status?id=${id}`, JSON.stringify(body), resolve, reject);
        });
    }
}