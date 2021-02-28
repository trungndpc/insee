import APIUtils from '../utils/APIUtils'


export default class RegisterModel {
    static checkPhone(phone) {
        var body = {
            phone: phone
        }
        return new Promise((resolve, reject) => {
            APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/authen/check-phone`, JSON.stringify(body), resolve, reject);
        });
    }

    static updateCustomer(data) {
        var body = {
            phone: data.phone,
            mainAreaId: data.location,
            pass: data.password,
            fullName: data.name,
        }
        return new Promise((resolve, reject) => {
            APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/api/customer/update`, JSON.stringify(body), resolve, reject);
        });
    }

    static login(data) {
        var body = {
            phone: data.phone,
            idToken: data.token
        }
        return new Promise((resolve, reject) => {
            APIUtils.postJSONWithCredentials(process.env.DOMAIN + `/authen/login`, JSON.stringify(body), resolve, reject);
        });
    }
}