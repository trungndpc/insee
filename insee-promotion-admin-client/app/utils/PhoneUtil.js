export default class PhoneUtil {
    static format(value) {
        if (value) {
            value = value.replace(/\D/g, '');
            let rs = "";
            for (var i = 0; i < value.length; i++) {
                if (i == 4 || i == 7) {
                    rs = rs + "." + value.charAt(i)
                } else {
                    rs = rs + value.charAt(i)
                }
            }
            return rs;
        }
    }

    static standardized(phone) {
        if (phone) {
            phone = phone.replace(/[^0-9]/g, '');
            let firstChar = phone.charAt(0);
            if (firstChar == 0) {
                return "+84" + phone.substring(1, phone.length);
            }
        }
        return phone;
    }
}