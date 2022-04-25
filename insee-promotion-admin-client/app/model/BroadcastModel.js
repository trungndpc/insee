import APIUtils from '../utils/APIUtils'

export default class BroadcastModel {

    static create(data) {
        return new Promise((resolve, reject) => {
            APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/broadcast/create`, JSON.stringify(data), resolve, reject);
        });
    }

    static getList(page, pageSize) {
        let url = process.env.DOMAIN + `/api/admin/broadcast/list?&page=${page}&pageSize=${pageSize}`;
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(url, resolve, reject);
        });
    }

    static updateStatus(id, status) {
        let url = process.env.DOMAIN + `/api/admin/broadcast/update-status?&id=${id}&status=${status}`;
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(url, resolve, reject);
        });
    }


}