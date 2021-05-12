import APIUtils from '../utils/APIUtils'

export default class RetailerModel {
    
    static find(city, district, page, pageSize) {
        let path = "/api/retailer/list?page=" + page + "&pageSize=" + pageSize;
        (city && city != 0) && (path = path + "&city=" + city);
        (district && district != 0) && (path = path + "&district=" + district)
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + path, resolve, reject);
        });
    }
}