import APIUtils from '../utils/APIUtils'

export default class MatchModel {

    static find(season) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/match/find?season=${season}`, resolve, reject);
        });
    }
}