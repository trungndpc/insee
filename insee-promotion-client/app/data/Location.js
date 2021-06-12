// import data from './data_location.json'
// import data from './data_province_2.json'
import data from './data_province_3.json'


function compare(a, b) {
    if (a.value < b.value) {
        return -1;
    }
    if (a.value > b.value) {
        return 1;
    }
    return 0;
}

var listCity = [];
for (const key in data) {
    let r = { key: key, value: data[key].name }
    if (data[key].status != 0) {
        listCity.push(r);
    }
}
listCity.sort(function (a, b) {
    return a.value - b.value;
})
listCity = listCity.sort(compare)

var listDistrict = [];
for (const key in data) {
    let city = data[key];
    let districts = city["districts"];
    for (const disKey in districts) {
        let oDistrict = { key: districts[disKey].id, value: { name: districts[disKey].name, cityId: key } }
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
        return listCity
    }
}
export class District {
    static getName(districtId) {
        for (const key in listDistrict) {
            if (listDistrict[key].key == districtId) {
                return listDistrict[key].value.name
            }
        }
    }

    static getList(cityId) {
        if (!cityId || cityId == 0) {
            return []
        }
        let city = data[cityId];
        let districts = city.districts;
        let rs = []
        for (const district of districts) {
            let o = { key: district.id, value: district.name }
            rs.push(o);
        }
        rs = rs.sort(compare);
        return rs;
    }
}