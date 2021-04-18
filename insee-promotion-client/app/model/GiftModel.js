import APIUtils from '../utils/APIUtils'

export default class GiftModel {

    static getGiftById(id) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/gift/get?id=${id}`, resolve, reject);
        });
    }

    static recievedGiftById(id) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/gift/received?id=${id}`, resolve, reject);
        });
    }

    static rolledGiftById(id, rs) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/gift/roll?id=${id}&rs=${rs}`, resolve, reject);
        });
    }



    static getListHistoryGift() {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/gift/me`, resolve, reject);
        });
    }


}