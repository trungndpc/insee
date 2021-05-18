import APIUtils from '../utils/APIUtils'
const API_KEY = 'AIzaSyDQVY6ueVSre4oFjjMVKAGbxfZOhcqtItY';


export default class GeoModel {

    static getLocation(lat, lon) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithoutCredentials(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}&sensor=false`, resolve, reject);
        });
    }

    static detectId(cityName, districtName) {
        return new Promise((resolve, reject) => {
            APIUtils.getJSONWithCredentials(process.env.DOMAIN + `/api/utility/get-id-district-and-city?districtName=${encodeURI(districtName)}&cityName=${encodeURI(cityName)}`, resolve, reject);
        });
    }
}