import APIUtils from '../utils/APIUtils'

export default class LoyaltyModel {

    static me() {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/loyalty/me`, resolve, reject);
        });
    }
    
   
}