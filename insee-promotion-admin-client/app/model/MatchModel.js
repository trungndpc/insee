import APIUtils from '../utils/APIUtils'

export default class MatchModel {

    static find(status, season, page, pageSize) {
        let url = process.env.DOMAIN + `/api/admin/match/find?&page=${page}&pageSize=${pageSize}`;
        status != -1 && (url += `&status=${status}`)
        season != -1 && (url += `&season=${season}`)
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(url, resolve, reject);
        });
    }

    static get(id) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/admin/match?id=${id}`, resolve, reject);
        });
    }

    static updateResult(id, teamOneScore, teamTwoScore) {
        let body = {
            "team-one" : teamOneScore,
            "team-two" : teamTwoScore
        }
        return new Promise((resolve, reject) => {
            APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/match/update-result?id=${id}`, JSON.stringify(body), resolve, reject);
        });
    }
}