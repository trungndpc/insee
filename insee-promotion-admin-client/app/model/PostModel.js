import APIUtils from '../utils/APIUtils'


export default class PostModel {

    static getList(status, page, pageSize) {
        let url = process.env.DOMAIN + `/api/admin/post/list?&page=${page}&pageSize=${pageSize}`;
        status != -1 && (url += `&status=${status}`)
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(url, resolve, reject);
        });
    }

}