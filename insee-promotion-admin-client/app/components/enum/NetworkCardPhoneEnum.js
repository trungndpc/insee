export default class NetworkCardPhoneEnum {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static findById(id) {
        switch(id) {
            case 1 : return VIETEL_CARD;
            case 2 : return VINAPHONE_CARD;
            case 3 : return MOBILE_PHONE;
        }
    }
    
}
const VIETEL_CARD = new NetworkCardPhoneEnum(1, "Vietel")
const VINAPHONE_CARD = new NetworkCardPhoneEnum(2, "Vinaphone")
const MOBILE_PHONE = new NetworkCardPhoneEnum(3, "Mobile Phone")