

const LOCATION_DATA = {
    1: 'Hồ Chí Minh',
    2: 'Long An',
    3: 'Đồng Nai',
    4: 'Vũng Tàu',
    5: 'Bình Thuận',
    6: 'Lâm Đồng',
    7: 'Bình Dương',
    8: 'Tây Ninh',
    9: 'Dak Nong',
    10: 'Dak Lak',
    11: 'Bình Phước',
    12: 'Trà Vinh',
    13: 'An Giang',
    14: 'Cần Thơ',
    15: 'Hậu Giang',
    16: 'Kiên Giang',
    17: 'Cà Mau',
    18: 'Sóc Trăng',
    19: 'Bạc Liêu',
    20: 'Đồng Tháp',
    21: 'Bến Tre',
}

export default class Location {

    static getName(id) {
        for (const key in LOCATION_DATA) {
            if (id == key) {
                return LOCATION_DATA[key];
            }
        }
        return null;
    }

    static getList() {
        let rs = []
        for (const key in LOCATION_DATA) {
            let r = {key: key, value: LOCATION_DATA[key]}
            rs.push(r);
        }
        return rs;
    }
}