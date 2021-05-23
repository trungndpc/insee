export class  TypeGift {
    constructor(type) {
        this.type = type
    }

    static findById(id) {
        switch(id) {
            case 1 : return CARD_PHONE;
            case 2 : return LUCKY_DRAW_ROTATION;
            case 3 : return VOUCHER;
        }
    }

    getType() {
        return this.type;
    }


    getName() {
        switch(this.type) {
            case 1 : return "Thẻ cào"
            case 2 : return "Vòng quay may mắn"
            case 3 : return "Voucher"
        }
    }

    static getList() {
        return [CARD_PHONE, LUCKY_DRAW_ROTATION, VOUCHER]
    }
    
}

export const CARD_PHONE = new TypeGift(1);
export const LUCKY_DRAW_ROTATION = new TypeGift(2);
export const VOUCHER = new TypeGift(3);