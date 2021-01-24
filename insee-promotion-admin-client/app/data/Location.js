import data from './data_location.json'

var listCity = [];
for (const key in data) {
    let r = { key: key, value: data[key].name }
    listCity.push(r);
}

var listDistrict = [];
for (const key in data) {
    let city = data[key];
    let districts = city["districts"];
    for (const disKey in districts) {
        let oDistrict = { key: disKey, value: { name: districts[disKey].name, cityId: key } }
        listDistrict.push(oDistrict);
    }
}

export class City {

    static getName(id) {
        for (const key in data) {
            if (id == key) {
                return data[key].name;
            }
        }
        return null;
    }

    static getList() {
        return listCity;
    }
}

export class District {
    static getName(districtId) {
        for (const key in listDistrict) {
            if (key == districtId) {
                return listDistrict[key].name
            }
        }
    }

    static getList(cityId) {
        if (cityId == 0) {
            return []
        }
        let city = data[cityId];
        let districts = city.districts;
        let rs = []
        for(const district of districts) {
            let o = {key: district.id, value: district.name}
            rs.push(o);
        }
        return rs;
    }
}