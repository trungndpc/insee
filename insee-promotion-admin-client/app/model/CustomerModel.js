import APIUtils from '../utils/APIUtils'

export default class CustomerModel {

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/customer?id=${id}`, resolve, reject);
        }); 
    }

    static findOrderByPoint(location, roleId, page, pageSize) {
        let url = process.env.DOMAIN + `/api/admin/customer/find-order-by-point?&page=${page}&pageSize=${pageSize}`;
        location != -1 && (url += `&location=${location}`)
        roleId != -1 && (url += `&roleId=${roleId}`)
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(url, resolve, reject);
        });
    }

    static getLeaderBoard(location, page, pageSize) {
        let url = process.env.DOMAIN + `/api/admin/statistical/leader-board?&page=${page}&pageSize=${pageSize}`;
        location != -1 && (url += `&location=${location}`)
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(url, resolve, reject);
        });
    }
}