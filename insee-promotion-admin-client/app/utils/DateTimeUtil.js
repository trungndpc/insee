export default class DateTimeUtil {
    static getArrayMonth() {
        return [
            { name: 'Tháng 1', id: 1 },
            { name: 'Tháng 2', id: 2 },
            { name: 'Tháng 3', id: 3 },
            { name: 'Tháng 4', id: 4 },
            { name: 'Tháng 5', id: 5 },
            { name: 'Tháng 6', id: 6 },
            { name: 'Tháng 7', id: 7 },
            { name: 'Tháng 8', id: 8 },
            { name: 'Tháng 9', id: 9 },
            { name: 'Tháng 10', id: 10 },
            { name: 'Tháng 11', id: 11 },
            { name: 'Tháng 12', id: 12 }
        ]
    }

    static getArrayYear() {
        let array = [];
        for (var i = 1920; i <= 2020; i++) {
            array.push(i);
        }
        return array;
    }

    static getArrayDay(month, year) {
        let maxDay = new Date(year, month, 0).getDate();
        let array = [];
        for (var i = 1; i <= maxDay; i++) {
            array.push(i);
        }
        return array;
    }

    static toString(date) {
        if (!date) return '';
        let mon =  date.getMonth() + 1;
        if (mon < 10) {
            mon = '0' + mon;
        }
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return [date.getFullYear(), mon, day].join('-');
    }
}