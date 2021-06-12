import APIUtils from '../utils/APIUtils'


export default class PredictModel {
    static find(matchId, page, pageSize) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/predict/find?matchId=${matchId}&page=${page}&pageSize=${pageSize}`, resolve, reject);
        });
    }
}