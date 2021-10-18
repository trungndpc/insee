import APIUtils from '../utils/APIUtils'

export default class PromotionModel {
    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/promotion?id=` + id, resolve, reject);
        });
    }

    static startZaloBot(promotionId) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/promotion/start-zalo-bot?promotionId=` + promotionId, resolve, reject);
        });
    }
}