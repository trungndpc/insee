import APIUtils from '../utils/APIUtils'

export default class CustomerModel {

    static leaderBoard(location) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/customer/leader-board?location=${location}`, resolve, reject);
        });
    }
    
   
}