import APIUtils from '../utils/APIUtils'

export default class PredictModel {

    static leaderboard(promotionId) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/predict/leaderboard?promotionId=${promotionId}`, resolve, reject);
        });
    }
    
   
}