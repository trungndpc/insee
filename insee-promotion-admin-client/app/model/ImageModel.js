import APIUtils from '../utils/APIUtils'

export default class ImageModel {
    static updateStatus(body) {
        return new Promise((resolve, reject) => {
            APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/images/update-status`, JSON.stringify(body), resolve, reject);
        });
    }

}


