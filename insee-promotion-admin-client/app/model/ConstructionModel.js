import APIUtils from '../utils/APIUtils'

export default class ConstructionModel {
  static update(body) {
    return new Promise((resolve, reject) => {
      APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/construction/update`, JSON.stringify(body), resolve, reject);
    });
  }

  static updateStatus(id, status, note) {
    var body = { id: id, status: status, note: note }
    return new Promise((resolve, reject) => {
      APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/admin/construction/update-status`, JSON.stringify(body), resolve, reject);
    });
  }

}