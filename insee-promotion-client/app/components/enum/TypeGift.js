export class TypeGift  {
    constructor(id) {
        this.type = id;
    }

    getName() {
        switch(this.type) {
            case 1 : return "Thẻ điện thoại"
            case 2 : return "Vòng Quay May Mắn"
        }
    }

    static findByType(type) {
        switch(type) {
            case 1 : return CARD_PHONE_TYPE_GIFT;
            case 2 : return LUCKY_ROTATION_TYPE_GIFT;
        }
    }
    
}

export const CARD_PHONE_TYPE_GIFT = new TypeGift(1)
export const LUCKY_ROTATION_TYPE_GIFT = new TypeGift(2)