import APIUtils from '../utils/APIUtils'

export default class StatisticalModel {
    static getDashboard() {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/statistical/dashboard`, resolve, reject);
        });
    }
}