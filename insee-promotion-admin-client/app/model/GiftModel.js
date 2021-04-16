import APIUtils from '../utils/APIUtils'

export default class GiftModel {
    static randomGift() {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/gift/random-gift`, resolve, reject);
        });
    }
}